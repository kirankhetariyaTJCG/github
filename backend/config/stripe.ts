// Third-Party Libraries
import Stripe from 'stripe';

// Models
import Restaurant from '@Models/restaurantSchema';

// Utils and Helpers
import { MESSAGES } from '@Utils/constant';
import { stripeInstance } from '@Utils/function';

const createPrice = async (restaurantId: string, amount: number, currency: string, description: string) => {
    const stripe = await stripeInstance(restaurantId);

    const price = await stripe.prices.create({
        unit_amount: amount,
        currency,
        product_data: {
            name: description,
        },
    });

    return price.id;
};

export const createStripePaymentLink = async (restaurantId: string, amount: number, currency: string, description: string, orderId?: any) => {
    const priceId = await createPrice(restaurantId, amount, currency, description);

    const metadata = {
        orderId: orderId || null,
    };

    const stripe = await stripeInstance(restaurantId);

    return stripe.paymentLinks.create({
        line_items: [
            {
                price: priceId,
                quantity: 1,
            },
        ],
        metadata,
    });
};

export const createPaymentIntent = async (restaurantId: string, amount: number, currency: string, metadata: any, customerId?: string) => {
    const stripe = await stripeInstance(restaurantId);
    const restaurant = await Restaurant.findById(restaurantId).select('+stripe_accountId');

    if (!restaurant) {
        throw new Error(MESSAGES.INTERNAL_SERVER_ERROR);
    }

    try {
        // const amountInCents = Math.round(amount * 100);
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency,
            metadata,
            customer: customerId,
            automatic_payment_methods: { enabled: true },
        }, {
            stripeAccount: restaurant.stripe_accountId,
        });

        return paymentIntent;
    } catch (error) {
        console.log(":createPaymentIntent error:::::::::::::", error)
        return null;
    }
};

export const createCustomer = async (restaurantId: string, email: string, name: string) => {
    const stripe = await stripeInstance(restaurantId);

    try {
        const customer = await stripe.customers.create({
            email,
            name,
        });
        return customer;
    } catch (error) {
        console.log("createCustomer:error:::::::::::::", error)
        return null;
    }
};

export const retrieveChargeInfo = async (restaurantId: string, chargeId: string) => {
    if (!restaurantId || !chargeId) return null

    const stripe = await stripeInstance(restaurantId);

    try {
        const paymentIntent = await stripe.paymentIntents.retrieve(chargeId) as Stripe.PaymentIntent;

        if (paymentIntent.status === 'succeeded' && paymentIntent.latest_charge) {
            const latestCharge = await stripe.charges.retrieve(paymentIntent.latest_charge as string);
            const last4Digits = latestCharge.payment_method_details?.card?.last4;

            return {
                chargeId: latestCharge.id,
                last4Digits: last4Digits || null,
                balanceTransaction: latestCharge?.balance_transaction
            };
        }

        return null;
    } catch (error) {
        // console.log("retrieveChargeInfo:error:::::::::::::", error)
        return null;
    }
};

export const addCardToCustomer = async (restaurantId: string, customerId: string, token: string) => {

    const stripe = await stripeInstance(restaurantId);
    try {

        const card = await stripe.customers.createSource(customerId, { source: token });
        return card;
    } catch (error) {
        console.error('addCardToCustomer:::::::', error);
        return null;
    }
};

export const refundAmount = async (restaurantId: any, chargeId: string, amountToRefund: any) => {

    const stripe = await stripeInstance(restaurantId);
    try {
        const paymentIntent = await stripe.paymentIntents.retrieve(chargeId) as Stripe.PaymentIntent;

        if (paymentIntent.status === 'succeeded' && paymentIntent?.latest_charge) {
            const latestCharge: any = paymentIntent.latest_charge;

            const amountInCents = Math.round(amountToRefund * 100);
            const refund = await stripe.refunds.create({
                charge: latestCharge,
                amount: amountInCents
            });

            return refund;
        }

        return false
    } catch (error) {
        console.error('refundAmount:::::::', error);
        return null;
    }
};