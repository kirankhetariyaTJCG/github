

import PaymentWebhookLogs from '@Models/paymentWebhookLogs'
import Order from '@Models/orderSchema'
import express from 'express';

const router = express.Router();

// Define a webhook endpoint
router.all('/stripe', express.json({ type: 'application/json' }), async (request, response) => {
    const event = request.body;

    if (event?.data) {
        if (event?.data) {
           await PaymentWebhookLogs.create({
                id: event?.id || "",
                token: event?.data?.object || "",
                event: event.type,
                response: event?.data
            })

            switch (event.type) {
                case 'payment_intent.succeeded':
                    const paymentIntent = event.data.object;
                    console.log('PaymentIntent succeeded:', paymentIntent.id);

                    const order = await Order.findOne({ payment_intent_id: paymentIntent.id });
                    if (order) {
                        order.payment_status = 1 // 'paid';
                        await order.save();
                    }
                    break;

                case 'payment_intent.payment_failed':
                    const failedPaymentIntent = event.data.object;
                    console.log('PaymentIntent failed:', failedPaymentIntent.id);

                    const failedOrder = await Order.findOne({ payment_intent_id: failedPaymentIntent.id });
                    if (failedOrder) {
                        failedOrder.payment_status = 2 // 'failed';
                        await failedOrder.save();
                    }
                    break;

                default:
                    console.log(`Unhandled event type: ${event.type}`);
            }
        }
    }

    response.json({ received: true });
});

export default router;