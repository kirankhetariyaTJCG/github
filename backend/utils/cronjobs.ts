// Core and Third-Party Libraries
import moment from 'moment';

// Models
import Campaign from '@Models/campaignSchema';
import Customer from '@Models/customerSchema';
import Item from '@Models/menuItemSchema';
import Choice from '@Models/choiceSchema';
import Category from '@Models/categorySchema';
import Order from '@Models/orderSchema';

// Utils and Helpers
import { createLogs, sendNotification } from './function';

// Stripe Configuration and Functions
import { refundAmount } from '@Config/stripe';

export const sendCampaignInvites = async () => {
    console.log(`[${moment().format('YYYY-MM-DD hh:mm:ss A')}] - Running campaign invites processing...`);

    const currentTime = moment().unix();

    const campaigns = await Campaign.find({
        scheduled: { $lte: currentTime },
        active: true,
        sending_status: 1,
    });

    if (!campaigns.length) return;

    for (const campaign of campaigns) {
        const customers = await Customer.find({ campaign_id: campaign._id }).select('email phone');

        if (customers.length > 0) {
            let notifySuccess = true;

            for (const customer of customers) {
                const recipient = (campaign.invite_type === 1) ? customer?.email : customer?.phone;
                const notifyUser = await sendNotification(
                    campaign.invite_type,
                    recipient as string,
                    campaign.subject,
                    campaign.body
                );

                customer.is_send_invitations = notifyUser ? true : false;
                await customer.save();

                if (!notifyUser) {
                    notifySuccess = false;
                    break;
                }
            }

            campaign.sending_status = notifySuccess ? 3 : 2;
            campaign.schedule_at = currentTime;
            await campaign.save();
        }
    }
};

export const updateAvailabilityStatus = async () => {
    try {
        console.log(`[${moment().format('YYYY-MM-DD hh:mm:ss A')}] - Starting availability update process...`);

        const currentTime = moment().unix();

        const [items, choices] = await Promise.all([
            Item.find({
                is_deleted: false,
                $or: [
                    { out_of_stock_next_day: { $ne: null } },
                    { out_of_stock_until: { $ne: null } }
                ]
            }),
            Choice.find({
                is_deleted: false,
                $or: [
                    { out_of_stock_next_day: { $ne: null } },
                    { out_of_stock_until: { $ne: null } }
                ]
            })
        ]);

        const updateRecords = async (records: any[], type: string) => {
            if (!records || records.length === 0) {
                // console.log(`No ${type}(s) require updates.`);
                return;
            }

            // console.log(`Updating ${records.length} ${type}(s)...`);

            await Promise.all(
                records.map(async (record) => {
                    let updated = false;

                    if (record.out_of_stock_until && currentTime >= record.out_of_stock_until) {
                        record.out_of_stock = false;
                        record.out_of_stock_until = null;
                        updated = true;
                    }

                    if (record.out_of_stock_next_day && currentTime >= record.out_of_stock_next_day) {
                        record.out_of_stock = false;
                        record.out_of_stock_next_day = null;
                        updated = true;
                    }

                    if (updated) await record.save();
                })
            );

            // console.log(`${type}(s) update completed.`);
        };

        await Promise.all([
            updateRecords(items, "Item"),
            updateRecords(choices, "Choice")
        ]);
    } catch (error) {
        console.error("Error during availability update process:");
    }
};

export const updateVisibility = async () => {
    console.log(`[${moment().format('YYYY-MM-DD hh:mm:ss A')}] - Starting visibility update process for Categories and Items...`);

    const now = moment().unix();
    const dayOfWeek = moment().day();

    const updateVisibilityStatus = async (Model: any) => {
        const documents = await Model.find({ is_deleted: false });
        for (const doc of documents) {

            let isVisible = true;
            let updateHiddenUntil = false

            if (doc?.hidden_until && (doc.hidden_until < now)) {
                isVisible = false;
                updateHiddenUntil = true;
            } else if (doc.active_begin && doc.active_end) {
                isVisible = now >= doc.active_begin && now <= doc.active_end;
            } else if (doc.active_exact_from && doc.active_exact_until) {
                isVisible = now >= doc.active_exact_from && now <= doc.active_exact_until;
            } else if (doc.active_days && doc.active_days.includes(dayOfWeek)) {
                isVisible = true;
            }

            if (doc.is_visible !== isVisible) {
                if (updateHiddenUntil) {
                    doc.hidden_until = null;
                    doc.is_active = null;
                    await doc.save();
                    return;
                }
                doc.is_visible = isVisible;
                await doc.save();
            }
        }
    };

    await updateVisibilityStatus(Category);
    await updateVisibilityStatus(Item);
};

export const markMissedOrders = async () => {
    try {
        const currentTime = moment().unix();

        const cancelOrders = await Order.find({
            order_status: 1,
            available_date: { $lte: currentTime },
        });

        if (!cancelOrders?.length) return;

        await Order.updateMany(
            { order_status: 1, available_date: { $lte: currentTime } },
            { $set: { order_status: 6 } }
        );

        await Promise.all(
            cancelOrders.map(async (order) => {
                try {
                    const refundRes = await refundAmount(
                        order.restaurant_id,
                        order.payment_intent_id,
                        order.total_price
                    );

                    order.refund_response = { ...refundRes, refund_date: moment().valueOf() };
                    order.refund_status = refundRes ? 2 : 1; // 2: Success, 1: Failed
                    await order.save();

                    await createLogs({
                        message: 'Refund successful in cron job',
                        request: { order },
                        response: refundRes,
                        status: "success",
                        url: 'markMissedOrders',
                    });
                } catch (error) {
                    order.refund_status = 1;
                    await order.save();

                    await createLogs({
                        message: 'Refund failed in cron job',
                        request: { order },
                        response: error,
                        status: "error",
                        url: 'markMissedOrders',
                    });
                }
            })
        );
    } catch (error) {
        await createLogs({
            message: 'Unexpected error in cron job',
            url: 'markMissedOrders',
            response: error,
            status: "error",
        });
    }
};