import { constants } from "./constant";

export const newOrderMail = async (data: any): Promise<string> => {
    return `
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order Confirmation</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f8f9fa;
                color: #333;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                background: #ffffff;
                padding: 20px;
                border: 1px solid #ddd;
                border-radius: 8px;
            }
            .header {
                text-align: center;
                background: #ff4500;
                color: white;
                padding: 10px 0;
                border-radius: 8px 8px 0 0;
            }
            .header h1 {
                margin: 0;
                font-size: 24px;
            }
            .content {
                padding: 20px;
            }
            .content h2 {
                color: #ff4500;
            }
            .footer {
                text-align: center;
                font-size: 12px;
                color: #666;
                margin-top: 20px;
            }
            .button {
                display: inline-block;
                padding: 10px 15px;
                color: white;
                background: #ff4500;
                text-decoration: none;
                border-radius: 4px;
                margin-top: 10px;
            }
            .button:hover {
                background: #e03e00;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>${data?.restaurantName}</h1>
            </div>
            <div class="content">
                <h2>So far, so good!</h2>
                <p>Hello <strong>${data?.customerName || 'Customer'}</strong>,</p>
                <p>Your order (#<strong>${data?.orderNumber || 'N/A'}</strong>) was placed, but it hasn’t been accepted yet. Don’t worry, we’ll notify you as soon as our team opens and begins preparing your delicious pizza!</p>
                <h3>Order Details:</h3>
                <ul>
                    <li><strong>Order Number:</strong> ${data?.orderNumber || 'N/A'}</li>
                    <li><strong>Check your email on </strong> ${data?.orderDate || 'N/A'}</li>
                </ul>
            </div>
            <div class="footer">
                <p>If you have any questions, feel free to contact us:</p>
                <p><strong>Email:</strong> <a href="mailto:${data?.supportEmail || 'support@example.com'}">${data?.supportEmail || 'support@example.com'}</a></p>
                <p><strong>Phone:</strong> 
                ${Array.isArray(data?.supportPhone) && data.supportPhone.length > 0
            ? data.supportPhone.map((phone: string) => `<span>${phone}</span>`).join(', ')
            : '+000-000-0000'}
                </p>
                <p><a href="${data?.websiteLink || '#'}" target="_blank">Visit our website</a></p>
            </div>
        </div>
    </body>
    </html>
    `;
};

// export const orderConfirmationEmail = async (data: any) => {
//     return await `

//     <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Order Confirmation</title>
// </head>
// <body>
//     <h1>${data?.restaurantName}</h1>
//     <h2>Order confirmed for</h2>
//     <p><strong>${data?.orderDate || 'Sunday, Dec 01, 2024, 10:00 AM'}</strong></p>

//     <p>Dear ${data?.customerName || 'Customer'},</p>
//     <p>${data?.restaurantName} sent you this message regarding your order (#${data?.orderNumber || 'N/A'}):</p>

//     <h3>Thank you for your order!</h3>

//     <!-- Order Type Logic -->
//     ${data?.orderType === 1 ? `
//         <h3>Your pickup order has been confirmed!</h3>
//         <p>We are glad to confirm your online order for pickup.</p>
//         <h3>Restaurant address for pickup:</h3>
//         <p>${data?.restaurantAddress}</p>
//     ` : ''}

//     ${data?.orderType === 2 ? `
//         <h3>Your delivery order has been confirmed!</h3>
//         <p>We are preparing your order and will deliver it shortly to your address.</p>
//         <h3>Delivery address:</h3>
//         <p>${data?.deliveryAddress || 'Customer Address'}</p>

//         <h3>Delivery Charges:</h3>
//             <ul>
//                 <li>Delivery Fee: $${data?.deliveryFee || '0.00'}</li>
//                 <li>Delivery Taxes: $${data?.deliveryTaxes || '0.00'}</li>
//             </ul>
//     ` : ''}

//     ${data?.orderType === 3 ? `
//         <h3>Your table reservation has been confirmed!</h3>
//         <p>Your table has been successfully reserved. We look forward to seeing you at our restaurant!</p>
//         <h3>Reservation Details:</h3>
//         <p>Table for ${data?.reservationPeople || '2'} people, at ${data?.reservationTime || '6:00 PM'} on ${data?.reservationDate || 'Sunday, Dec 01, 2024'}</p>
//     ` : ''}

//     ${data?.orderType === 4 ? `
//         <h3>Your pre-order has been confirmed!</h3>
//         <p>Thank you for placing a pre-order with us. We will prepare your items for future pickup or delivery as requested.</p>
//         <h3>Pre-order details:</h3>
//         <p>Items will be ready on ${data?.preOrderDate || 'Sunday, Dec 01, 2024, 10:00 AM'}</p>
//     ` : ''}

//     <!-- Order Details -->
//         <h3>Your order details:</h3>
//         <ul>
//             ${data?.orderItems?.map((item: { quantity: any; name: any; price: any; size: any; choices: any; }) => `
//                 <li>${item.quantity} x ${item.name} (${item.size}) - $${item.price}
//                     <br>Choices: ${item.choices || 'None'}
//                 </li>
//             `).join('')}
//         </ul>

//     <h3>Discount:</h3>
//     <ul>
//         ${data?.discountAmount ? `
//             <li>${data?.discountDescription || 'Discount'}: -$${data?.discountAmount}</li>
//         ` : ''}
//     </ul>

//     <h3>Total:</h3>
//     <ul>
//         <li>Sub-Total: $${data?.subTotal || '0.00'}</li>
//         <li>GST (${data?.taxRate || '0'}%): $${data?.taxAmount || '0.00'}</li>
//         <li>Total: $${data?.totalAmount || '0.00'}</li>
//     </ul>

//     <h3>Payment method:</h3>
//     <p>${data?.paymentMethod || 'Card at pickup counter'}</p>

//     <p>If you need help with anything else, do not hesitate to contact us at ${data?.supportPhone || '+975 17 55 54 11'}.</p>

//     <p>Enjoy, ${data?.customerName || 'Customer'}!</p>

//     <footer>
//         <p>Kind regards,</p>
//         <p>${data?.restaurantName}</p>
//         <p><a href="${data?.websiteLink || '#'}">Visit our website</a></p>
//     </footer>
// </body>
// </html>

//     `
// }

// export const orderConfirmationEmail = async (data: any) => {
//     return await `
//     <html lang="en">
//     <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>Order Confirmation</title>
//         <style>
//             body {
//                 font-family: Arial, sans-serif;
//                 margin: 0;
//                 padding: 0;
//                 background-color: #f8f9fa;
//                 color: #333;
//             }
//             .container {
//                 width: 80%;
//                 max-width: 700px;
//                 margin: 0 auto;
//                 background: #ffffff;
//                 padding: 10px;
//                 border-radius: 8px;
//                 box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//             }
//             .header {
//                 text-align: center;
//                 background-color: #ff4500;
//                 color: white;
//                 padding: 10px;
//                 border-radius: 8px 8px 0 0;
//             }
//             .header h1 {
//                 margin: 0;
//                 font-size: 30px;
//             }
//             .section-title {
//                 color: #ff4500;
//                 font-size: 22px;
//                 margin-top: 20px;
//             }
//             .order-details ul {
//                 list-style-type: none;
//                 padding: 0;
//             }
//             .order-details li {
//                 margin: 5px 0;
//             }
//             .order-details strong {
//                 color: #555;
//             }
//             .order-summary {
//                 background-color: #f8f9fa;
//                 padding: 10px;
//                 margin-top: 20px;
//                 border-radius: 8px;
//             }
//             .order-summary h3 {
//                 color: #ff4500;
//             }
//             .footer {
//                 text-align: center;
//                 font-size: 12px;
//                 color: #666;
//                 margin-top: 40px;
//                 border-top: 1px solid #ddd;
//                 padding-top: 10px;
//             }
//             .footer a {
//                 color: #ff4500;
//                 text-decoration: none;
//             }
//             .button {
//                 display: inline-block;
//                 padding: 10px 15px;
//                 color: white;
//                 background-color: #ff4500;
//                 text-decoration: none;
//                 border-radius: 4px;
//                 margin-top: 15px;
//             }
//             .button:hover {
//                 background-color: #e03e00;
//             }
//         </style>
//     </head>
//     <body>
//         <div class="container">
//             <div class="header">
//                 <h1>${data?.restaurantName}</h1>
//                 <p>Order confirmed for <strong>${data?.orderDate || 'Sunday, Dec 01, 2024, 10:00 AM'}</strong></p>
//             </div>

//             <p>Dear <strong>${data?.customerName || 'Customer'}</strong>,</p>
//             <p>${data?.restaurantName} has received your order (#${data?.orderNumber || 'N/A'}).</p>

//             <!-- Order Type Sections -->
//             ${data?.orderType === 1 ? `
//                 <h3 class="section-title">Your Pickup Order</h3>
//                 <p>Your order for pickup has been confirmed.</p>
//                 <p><strong>Pickup Address:</strong> ${data?.restaurantAddress}</p>
//             ` : ''}

//             ${data?.orderType === 2 ? `
//                 <h3 class="section-title">Your Delivery Order</h3>
//                 <p>Your order is being prepared for delivery.</p>
//                 <p><strong>Delivery Address:</strong> ${data?.deliveryAddress || 'Customer Address'}</p>
//                 <p><strong>Delivery Fee:</strong> $${data?.deliveryFee || '0.00'} | <strong>Taxes:</strong> $${data?.deliveryTaxes || '0.00'}</p>
//             ` : ''}

//             ${data?.orderType === 3 ? `
//                 <h3 class="section-title">Your Table Reservation</h3>
//                 <p>Your table has been successfully reserved. We look forward to hosting you!</p>
//                 <p><strong>Reservation for:</strong> ${data?.reservationPeople || '2'} people at ${data?.reservationTime || '6:00 PM'} on ${data?.reservationDate || 'Sunday, Dec 01, 2024'}</p>
//             ` : ''}

//             ${data?.orderType === 4 ? `
//                 <h3 class="section-title">Your Pre-order</h3>
//                 <p>Your pre-order has been confirmed. It will be ready for pickup or delivery as scheduled.</p>
//                 <p><strong>Pre-order date:</strong> ${data?.preOrderDate || 'Sunday, Dec 01, 2024, 10:00 AM'}</p>
//             ` : ''}

//             <!-- Order Items -->
//             <div class="order-details">
//                 <h3 class="section-title">Order Details:</h3>
//                 <ul>
//                     ${data?.orderItems?.map((item: { quantity: any; name: any; price: any; size: any; choices: any; }) => `
//                         <li><strong>${item.quantity} x ${item.name} (${item.size})</strong> - $${item.price} <br>Choices: ${item.choices || 'None'}</li>
//                     `).join('')}
//                 </ul>
//             </div>

//             <!-- Discount -->
//             <div class="order-summary">
//                 <h3>Discount:</h3>
//                 <ul>
//                     ${data?.discountAmount ? `<li><strong>${data?.discountDescription || 'Discount'}:</strong> -$${data?.discountAmount}</li>` : ''}
//                 </ul>

//                 <h3>Total:</h3>
//                 <ul>
//                     <li><strong>Sub-total:</strong> $${data?.subTotal || '0.00'}</li>
//                     <li><strong>GST (${data?.taxRate || '0'}%):</strong> $${data?.taxAmount || '0.00'}</li>
//                     <li><strong>Total:</strong> $${data?.totalAmount || '0.00'}</li>
//                 </ul>
//             </div>

//             <!-- Payment Method -->
//             <p><strong>Payment Method:</strong> ${data?.paymentMethod || 'Card at pickup counter'}</p>

//             <!-- Contact Support -->
//             <p>If you need assistance, please contact us at <strong>${data?.supportPhone || '+975 17 55 54 11'}</strong>.</p>

//             <footer class="footer">
//                 <p>Kind regards,</p>
//                 <p><strong>${data?.restaurantName}</strong></p>
//                 <p><a href="${data?.websiteLink || '#'}">Visit our website</a></p>
//             </footer>
//         </div>
//     </body>
//     </html>
//     `;
// };

export const orderConfirmationEmail = async (data: any) => {
    const taxesHtml = data?.taxes && data?.taxes.length > 0
        ? data?.taxes.map((tax: { name: string; rate: number; amount: number }) => `
            <li><strong>${tax.name} (${tax.rate}%):</strong> $${tax.amount.toFixed(2)}</li>
        `).join('')
        : ''; // If no taxes, don't render anything

    const gstHtml = data?.taxRate && data?.taxRate > 0
        ? `<li><strong>GST (${data?.taxRate}%):</strong> $${data?.taxAmount.toFixed(2)}</li>`
        : ''; // If taxRate is 0 or not provided, skip rendering the GST line

    return await `
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order Confirmation</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f8f9fa;
                color: #333;
            }
            .container {
                width: 80%;
                max-width: 700px;
                margin: 0 auto;
                background: #ffffff;
                padding: 10px;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                background-color: #ff4500;
                color: white;
                padding: 10px;
                border-radius: 8px 8px 0 0;
            }
            .header h1 {
                margin: 0;
                font-size: 30px;
            }
            .section-title {
                color: #ff4500;
                font-size: 22px;
                margin-top: 20px;
            }
            .order-details ul {
                list-style-type: none;
                padding: 0;
            }
            .order-details li {
                margin: 5px 0;
            }
            .order-details strong {
                color: #555;
            }
            .order-summary {
                background-color: #f8f9fa;
                padding: 10px;
                margin-top: 20px;
                border-radius: 8px;
            }
            .order-summary h3 {
                color: #ff4500;
            }
            .footer {
                text-align: center;
                font-size: 12px;
                color: #666;
                margin-top: 40px;
                border-top: 1px solid #ddd;
                padding-top: 10px;
            }
            .footer a {
                color: #ff4500;
                text-decoration: none;
            }
            .button {
                display: inline-block;
                padding: 10px 15px;
                color: white;
                background-color: #ff4500;
                text-decoration: none;
                border-radius: 4px;
                margin-top: 15px;
            }
            .button:hover {
                background-color: #e03e00;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>${data?.restaurantName}</h1>
                <p>Order confirmed for <strong>${data?.orderDate || 'Sunday, Dec 01, 2024, 10:00 AM'}</strong></p>
            </div>
            
            <p>Dear <strong>${data?.customerName || 'Customer'}</strong>,</p>
            <p>${data?.restaurantName} has received your order (#${data?.orderNumber || 'N/A'}).</p>
  
            <!-- Order Type Sections -->
            ${data?.orderType === 1 ? `
                <h3 class="section-title">Your Pickup Order</h3>
                <p>Your order for pickup has been confirmed.</p>
                <p><strong>Pickup Address:</strong> ${data?.restaurantAddress}</p>
            ` : ''}

            ${data?.orderType === 2 ? `
                <h3 class="section-title">Your Delivery Order</h3>
                <p>Your order is being prepared for delivery.</p>
                <p><strong>Delivery Address:</strong> ${data?.deliveryAddress || 'Customer Address'}</p>
                <p><strong>Delivery Fee:</strong> $${data?.deliveryFee || '0.00'} | <strong>Taxes:</strong> $${data?.deliveryTaxes || '0.00'}</p>
            ` : ''}

            ${data?.orderType === 3 ? `
                <h3 class="section-title">Your Table Reservation</h3>
                <p>Your table has been successfully reserved. We look forward to hosting you!</p>
                <p><strong>Reservation for:</strong> ${data?.reservationPeople || '2'} people at ${data?.reservationTime || '6:00 PM'} on ${data?.reservationDate || 'Sunday, Dec 01, 2024'}</p>
            ` : ''}

            ${data?.orderType === 4 ? `
                <h3 class="section-title">Your Pre-order</h3>
                <p>Your pre-order has been confirmed. It will be ready for pickup or delivery as scheduled.</p>
                <p><strong>Pre-order date:</strong> ${data?.preOrderDate || 'Sunday, Dec 01, 2024, 10:00 AM'}</p>
            ` : ''}

            <!-- Order Items -->
            <div class="order-details">
                <h3 class="section-title">Order Details:</h3>
                <ul>
                    ${data?.orderItems?.map((item: { quantity: any; name: any; price: any; size: any; choices: any; }) => `
                        <li><strong>${item.quantity} x ${item.name} (${item.size})</strong> - $${item.price} <br>Choices: ${item.choices || 'None'}</li>
                    `).join('')}
                </ul>
            </div>
  
            <!-- Discount -->
            <div class="order-summary">
                <h3>Discount:</h3>
                <ul>
                    ${data?.discountAmount ? `<li><strong>${data?.discountDescription || 'Discount'}:</strong> -$${data?.discountAmount}</li>` : ''}
                </ul>
  
                <h3>Total:</h3>
                <ul>
                    <li><strong>Sub-total:</strong> $${data?.subTotal || '0.00'}</li>
                    ${gstHtml}  <!-- Dynamic GST rendering -->
                    ${taxesHtml} <!-- Dynamic tax rendering -->
                    <li><strong>Total:</strong> $${data?.totalAmount || '0.00'}</li>
                </ul>
            </div>

            <!-- Payment Method -->
            <p><strong>Payment Method: </strong> ${data?.paymentMethod || 'Card at pickup counter'}</p>

            <!-- Contact Support -->
            <p>If you need assistance, please contact us at <strong>${data?.supportPhone || '+975 17 55 54 11'}</strong>.</p>

            <footer class="footer">
                <p>Kind regards, </p>
                <p><strong>${data?.restaurantName}</strong></p>
                <p><a href="${data?.websiteLink || '#'}">Visit our website</a></p>
            </footer>
        </div>
    </body>
    </html>
    `;
};

export const orderEmail = async (data: any) => {
    return await `
    <html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmation</title>
</head>
<body>
    <h1>${data?.restaurantName}</h1>
    <h2>You can pick-up your order</h2>
    
    <p>Dear ${data?.customerName},</p>
    <p>You can now pick-up your order, we hope you enjoy it.</p>

    <!-- Pickup Details -->
    ${data?.orderType === 1 ? `
        <h3>Pick-up address:</h3>
        <p>${data?.restaurantAddress}</p>
    ` : ''}

    <!-- Payment Details -->
    <h3>Payment method:</h3>
    <p>${data?.paymentMethod || 'Card at pickup counter'}</p>

    <!-- Support Information -->
    <p>If you need help with anything else, do not hesitate to contact us at ${data?.supportPhone || '+975 17 55 54 11'}.</p>
    
    <p>Enjoy, ${data?.customerName}!</p>
    
    <footer>
        <p>Kind regards,</p>
        <p>${data?.restaurantName}</p>
        <p><a href="${data?.websiteLink}">Visit our website</a></p>
    </footer>
</body>
</html>
    `
}

export const orderShippedEmail = (data: any) => {
    return `
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
            .container { width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); }
            h1 { color: #2c3e50; font-size: 24px; }
            p { font-size: 16px; line-height: 1.5; color: #333; }
            .button { background-color: #3498db; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-weight: bold; }
            .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #7f8c8d; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>${data.restaurantName} Order Shipped</h1>
            <p>Dear ${data.customerName},</p>
            <p>Your order has been shipped. You can now pick it up or it is on the way to be delivered.</p>
            <p><strong>Order Number:</strong> ${data.orderNumber}</p>
            <p><strong>Expected Pickup Time:</strong> ${data.orderType === 1 ? data.reservationTime : 'N/A'}</p>
            <p><strong>Expected Delivery Time:</strong> ${data.orderType === 2 ? data.reservationTime : 'N/A'}</p>
            <p><strong>Payment Method:</strong> ${data.paymentMethod}</p>
            <p><strong>Amount:</strong> $${data.totalAmount}</p>
            <a href="#" class="button">Track Your Order</a>
            <div class="footer">
            <p>${data.restaurantName} </p>
            <p>If you have any questions, please contact us at <strong>${data.supportPhone}</strong>.</p>
            </div>
        </div>
    </body>
    </html>`;
};

export const orderDeliveredEmail = (data: any) => {
    return `
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
            .container { width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); }
            h1 { color: #2c3e50; font-size: 24px; }
            p { font-size: 16px; line-height: 1.5; color: #333; }
            .button { background-color: #3498db; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-weight: bold; }
            .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #7f8c8d; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>${data.restaurantName} Order Delivered</h1>
            <p>Dear ${data.customerName},</p>
            <p>Your order has been successfully delivered. We hope you enjoy your meal!</p>
            <p><strong>Order Number:</strong> ${data.orderNumber}</p>
            <p><strong>Delivery Address:</strong> ${data.deliveryAddress}</p>
            <p><strong>Payment Method:</strong> ${data.paymentMethod}</p>
            <p><strong>Amount:</strong> $${data.totalAmount}</p>
            <a href="#" class="button">Give Us Feedback</a>
            <div class="footer">
                <p>If you have any questions, please contact us at <strong>${data.supportPhone}</strong>.</p>
            </div>
        </div>
    </body>
    </html>`;
};

export const orderCancelledEmail = (data: any) => {
    return `
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
            .container { width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); }
            h1 { color: #e74c3c; font-size: 24px; }
            p { font-size: 16px; line-height: 1.5; color: #333; }
            .button { background-color: #e74c3c; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-weight: bold; }
            .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #7f8c8d; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>${data.restaurantName} Order Cancelled</h1>
            <p>Dear ${data.customerName},</p>
            <p>We're sorry, but your order has been cancelled. If you have any questions, please don't hesitate to reach out.</p>
            <p><strong>Order Number:</strong> ${data.orderNumber}</p>
            <p><strong>Payment Method:</strong> ${data.paymentMethod}</p>
            <p><strong>Amount:</strong> $${data.totalAmount}</p>
            <a href="mailto:${data.supportEmail}" class="button">Contact Support</a>
            <div class="footer">
                <p>If you need assistance, please contact us at <strong>${data.supportPhone}</strong>.</p>
            </div>
        </div>
    </body>
    </html>`;
};

// export const appDownloadEmail = (data: any) => {

//     return `
//     <!DOCTYPE html>
// <html>

// <head>
//     <title>${data.companyName} Email</title>
// </head>

// <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f9f9f9;">
//     <div
//         style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
//         <div style="background-color: #626C7F; color: #ffffff; padding: 20px; text-align: center;">
//             <h1>${data.companyName} Order Taking App Download</h1>
//         </div>
//         <div style="padding: 20px; text-align: center; color: #333333;">
//             <h1 style="font-size: 20px; margin-bottom: 20px;">Hello Johncd,</h1>
//             <p style="margin: 0 0 20px;">Download &amp; Install the restaurant app and start taking orders.</p>
//             <div style="margin: 20px 0;">
//                 <a href="#"
//                     style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #ffffff; background-color: #FF5733; text-decoration: none; border-radius: 5px;">Download
//                     &amp; Install</a>
//             </div>
//             <p style="margin: 0;">Simply reply to this email if you'd like to ask a question.</p>
//         </div>
//     </div>
// </body>

// </html>
//     `
// };



export const appDownloadEmail = (data: any) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Download Our Application</title>
    <style>
        .button:hover {
            background-color: rgb(229, 78, 45) !important;
        }
    </style>
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; color: #333;">
    <div style="max-width: 600px; margin: 20px auto; background: #ffffff; border: 1px solid #dddddd; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
        <div style="background-color: #FF5733; color: #fff; padding: 20px; text-align: center;">
            <h1 style="margin: 0;">${data.companyName}</h1>
            <h1 style="margin: 0;">Download Our Application</h1>
        </div>
        <div style="padding: 20px; line-height: 1.6;">
            <p>Dear User,</p>
            <p>Thank you for choosing <strong>${data.companyName}</strong>. We are excited to provide you with our easy-to-use order tracking app.</p>
            <p>Click the button below to download the app and start managing your orders effortlessly:</p>
            <div style="text-align:center;">
                <a class="button" href=${constants.APP_DOWNLOAD_LINK} style="display: inline-block; padding: 12px 24px; margin: 20px 0; color: #ffffff !important; background-color: #FF5733; text-decoration: none; border-radius: 8px; font-weight: 500; text-align: center;">Download & Install App</a>
            </div>
            <p>If you have any questions, feel free to reply to this email.</p>
            <p>Best regards,<br>The <strong>${data.companyName}</strong> Team</p>
        </div>
        <div style="text-align: center; padding: 10px; font-size: 12px; color: #888; background-color: #f4f4f4;">
            &copy; 2025 ${data.companyName}. All rights reserved.
        </div>
    </div>
</body>
</html>
    `
};