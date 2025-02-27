/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * security:
 *   - bearerAuth: []  # Apply bearer authentication to all endpoints
 */

/**
 * @swagger
 * /api/v1/intro:
 *   get:
 *     summary: Introduction API
 *     tags: [Introduction]
 *     responses:
 *       200:
 *         description: Introduction information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Welcome to the API
 */

/**
 * @swagger
 * /api/v1/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               restaurantName:
 *                 type: string
 *                 example: Delicious Eats
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 example: securepassword123
 *               accountType:
 *                 type: string
 *                 example : RestaurantOwner
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User registered successfully
 */

/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 example: securepassword123
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 */

/**
 * @swagger
 * /api/v1/logout:
 *   get:
 *     summary: Log out a user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User logged out successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User logged out successfully
 */

/**
 * @swagger
 * /api/v1/refresh-token:
 *   post:
 *     summary: Refresh the access token
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: your-refresh-token-here
 *     responses:
 *       200:
 *         description: Access token refreshed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 accessToken:
 *                   type: string
 *                   example: new-access-token-here
 */

/**
 * @swagger
 * /api/v1/password/forgot:
 *   post:
 *     summary: Request a password forgot
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *     responses:
 *       200:
 *         description: Password reset email sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Password reset email sent
 */

/**
 * @swagger
 * /api/v1/password/reset/{token}:
 *   put:
 *     summary: Reset password
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 example: newpassword123
 *               confirmPassword:
 *                 type: string
 *                 example: newpassword123
 *     responses:
 *       200:
 *         description: Password reset successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Password reset successful
 */

/**
 * @swagger
 * /api/v1/email/change:
 *   post:
 *     summary: Request email change by sending a token to the user's current email address.
 *     description: This API generates an email change token and sends it to the user's current email. The token is used to verify the user's request to change their email address.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID of the user requesting the email change.
 *                 example: 612c1f8b931f2f6c4b6b57d7
 *     responses:
 *       200:
 *         description: Email sent successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                   example: 200
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 errorCode:
 *                   type: string
 *                   example: null
 *                 message:
 *                   type: string
 *                   example: Email sent to user@example.com successfully
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                   example: 404
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 errorCode:
 *                   type: string
 *                   example: NotFound
 *                 message:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: Error occurred during email sending.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                   example: 500
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 errorCode:
 *                   type: string
 *                   example: InternalServerError
 *                 message:
 *                   type: string
 *                   example: Email could not be sent. Please try again later.
 */

/**
 * @swagger
 * /api/v1/email/reset/{token}:
 *   put:
 *     summary: Change the user's email address.
 *     description: This API allows the user to change their email address by providing a valid email change token. It also sends a verification link to the new email address.
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: The token used to authorize the email change request.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newEmail:
 *                 type: string
 *                 description: The new email address to update.
 *                 example: newemail@example.com
 *     responses:
 *       200:
 *         description: Email updated successfully. Verification sent to the new email.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                   example: 200
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 errorCode:
 *                   type: string
 *                   example: null
 *                 message:
 *                   type: string
 *                   example: Email updated successfully. Please verify your new email address
 *       400:
 *         description: Email is already in use or invalid request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                   example: 400
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 errorCode:
 *                   type: string
 *                   example: BadRequest
 *                 message:
 *                   type: string
 *                   example: Email already in use
 *       404:
 *         description: User not found or token invalid/expired.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                   example: 404
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 errorCode:
 *                   type: string
 *                   example: NotFound
 *                 message:
 *                   type: string
 *                   example: User not found or token expired
 *       500:
 *         description: Error occurred during the email sending process.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                   example: 500
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 errorCode:
 *                   type: string
 *                   example: InternalServerError
 *                 message:
 *                   type: string
 *                   example: Email could not be sent. Please try again later.
 */

/**
 * @swagger
 * /api/v1/send-verification-email:
 *  post:
 *    summary: Send a verification email to the user
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                example: "user@example.com"
 *    responses:
 *      200:
 *        description: Verification email sent
 *      404:
 *        description: User not found
 *      500:
 *        description: Email could not be sent
 */

/**
 * @swagger
 * /api/v1/verify-email:
 *  get:
 *    summary: Verify the user's email with the verification code
 *    tags: [Auth]
 *    parameters:
 *      - in: query
 *        name: code
 *        schema:
 *          type: string
 *        required: true
 *        description: The verification code sent to the user's email
 *      - in: query
 *        name: email
 *        schema:
 *          type: string
 *        required: true
 *        description: The user's email address
 *    responses:
 *      200:
 *        description: Email verified successfully
 *      400:
 *        description: Invalid verification code or email
 */

/**
 * @swagger
 * /api/v1/update-profile:
 *   post:
 *     summary: Update the user's profile
 *     description: Updates the user's profile with new information such as first name, last name, and profile image. The profile image is uploaded and the URL is stored in the profile.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: The user's first name
 *               lastName:
 *                 type: string
 *                 description: The user's last name
 *               userId:
 *                 type: string
 *                 description: The user's unique ID
 *               profileImage:
 *                 type: string
 *                 format: binary
 *                 description: The profile image to upload
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Profile updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     first_name:
 *                       type: string
 *                       example: John
 *                     last_name:
 *                       type: string
 *                       example: Doe
 *                     profile_url:
 *                       type: string
 *                       example: /uploads/profile_image-123456789.jpg
 *       400:
 *         description: Bad request, invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: No file uploaded
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: User not found
 */

/**
 * @swagger
 * /api/v1/restaurants/{restaurantId}/cuisines/add:
 *   post:
 *     summary: Add a new cuisine for a specific restaurant
 *     tags:
 *       - Cuisine
 *     parameters:
 *       - in: path
 *         name: restaurantId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the restaurant
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               cuisineName:
 *                 type: string
 *                 description: Name of the cuisine
 *               isPopular:
 *                 type: boolean
 *                 description: Is the cuisine popular
 *               isDefault:
 *                 type: boolean
 *                 description: Is this the default cuisine
 *               cuisineImage:
 *                 type: string
 *                 format: binary
 *                 description: Cuisine image file (optional)
 *     responses:
 *       201:
 *         description: Cuisine added successfully
 *         content:
 *           application/json:
 *             schema:
 *       400:
 *         description: Bad request, missing required fields or invalid data
 *         content:
 *           application/json:
 *             schema:
 */


/**
 * @swagger
 * /api/v1/restaurants/{restaurantId}/cuisines/{id}/delete:
 *   patch:
 *     summary: Soft delete a cuisine by ID
 *     tags: [Cuisine]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the cuisine to be soft deleted
 *         schema:
 *           type: string
 *           example: "60b8d295f1d3f1e7d7a1a7e1"
 *     responses:
 *       200:
 *         description: Cuisine soft-deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Cuisine soft-deleted successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60b8d295f1d3f1e7d7a1a7e1"
 *                     isDeleted:
 *                       type: boolean
 *                       example: true
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-09-17T14:30:00.000Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-09-17T14:30:00.000Z"
 */

/**
 * @swagger
 * /api/v1/restaurants/{restaurantId}/cuisines/{id}/edit:
 *   put:
 *     summary: Edit a cuisine for a specific restaurant
 *     tags: [Cuisine]
 *     security:
 *       - bearerAuth: []  # Apply bearer authentication
 *     parameters:
 *       - in: path
 *         name: restaurantId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the restaurant
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the cuisine
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               cuisineName:
 *                 type: string
 *                 description: Name of the cuisine
 *               isPopular:
 *                 type: boolean
 *                 description: Is the cuisine popular
 *               isDefault:
 *                 type: boolean
 *                 description: Is this the default cuisine
 *               cuisineImage:
 *                 type: string
 *                 format: binary
 *                 description: Cuisine image file (optional)
 */


/**
 * @swagger
 * /api/v1/restaurants/{restaurantId}/cuisines:
 *   get:
 *     summary: Get all cuisines for a restaurant
 *     tags: [Cuisine]
 *     parameters:
 *       - in: path
 *         name: restaurantId
 *         required: true
 *         description: ID of the restaurant to get cuisines for
 *         schema:
 *           type: string
 *           example: "60b8d295f1d3f1e7d7a1a7e1"
 *     responses:
 *       200:
 *         description: Cuisines fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Cuisines fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "60b8d295f1d3f1e7d7a1a7e1"
 *                       restaurantId:
 *                         type: string
 *                         format: uuid
 *                         example: "60b8d295f1d3f1e7d7a1a7e1"
 *                       cuisineName:
 *                         type: string
 *                         example: "Italian"
 *                       cuisineImage:
 *                         type: string
 *                         example: "/uploads/italian.jpg"
 *                       isPopular:
 *                         type: boolean
 *                         example: true
 *                       isDefault:
 *                         type: boolean
 *                         example: false
 *                       isDeleted:
 *                         type: boolean
 *                         example: false
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-09-17T14:30:00.000Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-09-17T14:30:00.000Z"
 */

/**
 * @swagger
 * /api/v1/restaurant/{id}:
 *   get:
 *     summary: Get restaurant details by ID
 *     tags: [Restaurant]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the restaurant to retrieve details for
 *     responses:
 *       200:
 *         description: Restaurant details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     restaurantId:
 *                       type: string
 *                       example: "612e3a1a7e1c0a1a3c1f6d9b"
 *                     restaurant_name:
 *                       type: string
 *                       example: "Pizza Palace"
 *                     phone:
 *                       type: string
 *                       example: "+1234567890"
 *                     address:
 *                       type: string
 *                       example: "123 Pizza Street, Food City"
 *       404:
 *         description: Restaurant not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Restaurant not found"
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/restaurants/{id}:
 *   put:
 *     summary: Update a restaurant's details
 *     tags:
 *       - Restaurant
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The restaurant ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "My Awesome Restaurant"
 *               phone:
 *                 type: string
 *                 example: "+1234567890"
 *               additionalPhones:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["+1234567891", "+1234567892"]
 *               country:
 *                 type: string
 *                 example: "USA"
 *               state:
 *                 type: string
 *                 example: "California"
 *               city:
 *                 type: string
 *                 example: "Los Angeles"
 *               postalCode:
 *                 type: string
 *                 example: "90001"
 *               address:
 *                 type: string
 *                 example: "123 Main St"
 *               latitude:
 *                 type: number
 *                 example: 34.0522
 *               longitude:
 *                 type: number
 *                 example: -118.2437
 *               website:
 *                 type: string
 *                 example: "https://example.com"
 *               isWebsiteVerified:
 *                 type: boolean
 *                 example: false
 *               accountType:
 *                 type: string
 *                 enum: ["Partner", "RestaurantOwner"]
 *                 example: "RestaurantOwner"
 *               salesTaxType:
 *                 type: string
 *                 example: "Percentage"
 *               salesTaxLabel:
 *                 type: string
 *                 example: "Sales Tax"
 *               salesTaxDelivery:
 *                 type: number
 *                 example: 5.00
 *               hasPickup:
 *                 type: boolean
 *                 example: true
 *               hasDelivery:
 *                 type: boolean
 *                 example: true
 *               isDeliveryOutsideDisabled:
 *                 type: boolean
 *                 example: false
 *               hasOnPremise:
 *                 type: boolean
 *                 example: true
 *               hasTableReservation:
 *                 type: boolean
 *                 example: true
 *               reservationTableMinGuests:
 *                 type: number
 *                 example: 2
 *               reservationTableMaxGuests:
 *                 type: number
 *                 example: 10
 *               reservationTableMinTime:
 *                 type: number
 *                 example: 30
 *               reservationTableMaxTime:
 *                 type: number
 *                 example: 120
 *               reservationTableHoldTimeIfLate:
 *                 type: number
 *                 example: 15
 *               allowsGuestPreOrder:
 *                 type: boolean
 *                 example: true
 *               hasScheduleOrder:
 *                 type: boolean
 *                 example: true
 *               pickupOrderAdvanceMinTime:
 *                 type: number
 *                 example: 10
 *               pickupOrderAdvanceMaxTime:
 *                 type: number
 *                 example: 60
 *               deliveryOrderAdvanceMinTime:
 *                 type: number
 *                 example: 15
 *               deliveryOrderAdvanceMaxTime:
 *                 type: number
 *                 example: 90
 *               deliveryTimeSlot:
 *                 type: number
 *                 example: 30
 *               allowsImmediateOrder:
 *                 type: boolean
 *                 example: true
 *               pickupPaymentMethods:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Cash", "Credit Card"]
 *               deliveryPaymentMethods:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Cash", "Credit Card"]
 *               dineInPaymentMethods:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Cash", "Credit Card"]
 *     responses:
 *       200:
 *         description: Restaurant updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Restaurant updated successfully
 *                 restaurant:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60c72b2f9f1b2567f8e4b85d"
 *                     userId:
 *                       type: string
 *                       example: "60c72b2f9f1b2567f8e4b85c"
 *                     name:
 *                       type: string
 *                       example: "My Awesome Restaurant"
 *                     phone:
 *                       type: string
 *                       example: "+1234567890"
 *                     additionalPhones:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["+1234567891", "+1234567892"]
 *                     country:
 *                       type: string
 *                       example: "USA"
 *                     state:
 *                       type: string
 *                       example: "California"
 *                     city:
 *                       type: string
 *                       example: "Los Angeles"
 *                     postalCode:
 *                       type: string
 *                       example: "90001"
 *                     address:
 *                       type: string
 *                       example: "123 Main St"
 *                     latitude:
 *                       type: number
 *                       example: 34.0522
 *                     longitude:
 *                       type: number
 *                       example: -118.2437
 *                     website:
 *                       type: string
 *                       example: "https://example.com"
 *                     isWebsiteVerified:
 *                       type: boolean
 *                       example: false
 *                     accountType:
 *                       type: string
 *                       example: "RestaurantOwner"
 *                     salesTaxType:
 *                       type: string
 *                       example: "Percentage"
 *                     salesTaxLabel:
 *                       type: string
 *                       example: "Sales Tax"
 *                     salesTaxDelivery:
 *                       type: number
 *                       example: 5.00
 *                     hasPickup:
 *                       type: boolean
 *                       example: true
 *                     hasDelivery:
 *                       type: boolean
 *                       example: true
 *                     isDeliveryOutsideDisabled:
 *                       type: boolean
 *                       example: false
 *                     hasOnPremise:
 *                       type: boolean
 *                       example: true
 *                     hasTableReservation:
 *                       type: boolean
 *                       example: true
 *                     reservationTableMinGuests:
 *                       type: number
 *                       example: 2
 *                     reservationTableMaxGuests:
 *                       type: number
 *                       example: 10
 *                     reservationTableMinTime:
 *                       type: number
 *                       example: 30
 *                     reservationTableMaxTime:
 *                       type: number
 *                       example: 120
 *                     reservationTableHoldTimeIfLate:
 *                       type: number
 *                       example: 15
 *                     allowsGuestPreOrder:
 *                       type: boolean
 *                       example: true
 *                     hasScheduleOrder:
 *                       type: boolean
 *                       example: true
 *                     pickupOrderAdvanceMinTime:
 *                       type: number
 *                       example: 10
 *                     pickupOrderAdvanceMaxTime:
 *                       type: number
 *                       example: 60
 *                     deliveryOrderAdvanceMinTime:
 *                       type: number
 *                       example: 15
 *                     deliveryOrderAdvanceMaxTime:
 *                       type: number
 *                       example: 90
 *                     deliveryTimeSlot:
 *                       type: number
 *                       example: 30
 *                     allowsImmediateOrder:
 *                       type: boolean
 *                       example: true
 *                     pickupPaymentMethods:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["Cash", "Credit Card"]
 *                     deliveryPaymentMethods:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["Cash", "Credit Card"]
 *                     dineInPaymentMethods:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["Cash", "Credit Card"]
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */


/** 
 * @swagger 
 * /api/v1/restaurants/{restaurantId}/verify-domain:
 *   post:
 *     summary: Verify if a domain exists
 *     tags: [Restaurant]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               domain:
 *                 type: string
 *                 example: "example.com"
 *             required:
 *               - domain
 *     responses:
 *       200:
 *         description: Domain exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Domain exists
 *       400:
 *         description: Domain name is required or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Domain name is required
 *       404:
 *         description: Domain does not exist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Domain does not exist
 *       500:
 *         description: An error occurred during domain lookup
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: An error occurred during domain lookup
 */

/**
 * @swagger
 * /api/v1/restaurants/{restaurantId}/open:
 *   post:
 *     summary: Add or update opening hours for a restaurant
 *     tags: [Opening Hours]
 *     parameters:
 *       - in: path
 *         name: restaurant_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the restaurant
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 description: Type of the schedule
 *                 example: "1"
 *               0:
 *                 type: object
 *                 properties:
 *                   s:
 *                     type: number
 *                     example: 100
 *                   e:
 *                     type: number
 *                     example: 200
 *                   is_selected:
 *                     type: boolean
 *                     example: true
 *               1:
 *                 type: object
 *                 properties:
 *                   s:
 *                     type: number
 *                     example: 100
 *                   e:
 *                     type: number
 *                     example: 200
 *                   is_selected:
 *                     type: boolean
 *                     example: true
 *               2:
 *                 type: object
 *                 properties:
 *                   s:
 *                     type: number
 *                     example: 100
 *                   e:
 *                     type: number
 *                     example: 200
 *                   is_selected:
 *                     type: boolean
 *                     example: true
 *               3:
 *                 type: object
 *                 properties:
 *                   s:
 *                     type: number
 *                     example: 100
 *                   e:
 *                     type: number
 *                     example: 200
 *                   is_selected:
 *                     type: boolean
 *                     example: true
 *               4:
 *                 type: object
 *                 properties:
 *                   s:
 *                     type: number
 *                     example: 100
 *                   e:
 *                     type: number
 *                     example: 200
 *                   is_selected:
 *                     type: boolean
 *                     example: true
 *               5:
 *                 type: object
 *                 properties:
 *                   s:
 *                     type: number
 *                     example: 100
 *                   e:
 *                     type: number
 *                     example: 200
 *                   is_selected:
 *                     type: boolean
 *                     example: true
 *               6:
 *                 type: object
 *                 properties:
 *                   s:
 *                     type: number
 *                     example: 100
 *                   e:
 *                     type: number
 *                     example: 200
 *                   is_selected:
 *                     type: boolean
 *                     example: true
 *     responses:
 *       200:
 *         description: Opening hours added or updated successfully
 *       400:
 *         description: Bad request - Invalid input data
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/tax:
 *   post:
 *     summary: Create or update a tax rate
 *     tags: [tax]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the tax
 *                 example: "Standard Tax"
 *               tax_rate:
 *                 type: object
 *                 properties:
 *                   rate_pickup:
 *                     type: number
 *                     description: Tax rate for pickup
 *                     example: 5.0
 *                   rate_delivery:
 *                     type: number
 *                     description: Tax rate for delivery
 *                     example: 7.5
 *                   rate_preserve:
 *                     type: number
 *                     description: Tax rate for preservation
 *                     example: 10.0
 *     responses:
 *       200:
 *         description: Tax rate created or updated successfully
 *       400:
 *         description: Bad request - Invalid input data
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/tax:
 *   get:
 *     summary: Get all tax rates
 *     tags: [tax]
 *     responses:
 *       200:
 *         description: A list of tax rates
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/tax/{id}:
 *   put:
 *     summary: Update a tax rate
 *     tags: [tax]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Tax rate ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Tax"
 *               tax_rate:
 *                 type: object
 *                 properties:
 *                   rate_pickup:
 *                     type: number
 *                     example: 10.0
 *                   rate_delivery:
 *                     type: number
 *                     example: 15.0
 *                   rate_preserve:
 *                     type: number
 *                     example: 20.0
 *     responses:
 *       200:
 *         description: Tax rate updated successfully
 *       404:
 *         description: Tax rate not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/tax/{id}:
 *   delete:
 *     summary: Delete a tax rate
 *     tags: [tax]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Tax rate ID
 *     responses:
 *       200:
 *         description: Tax rate deleted successfully
 *       404:
 *         description: Tax rate not found
 *       500:
 *         description: Internal server error
 */



/**
 * @swagger
 * /api/v1/delivery-zones:
 *   get:
 *     summary: Get all delivery zones
 *     tags: [Delivery Zones]
 *     responses:
 *       200:
 *         description: List of all delivery zones
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/DeliveryZone'
 *                 message:
 *                   type: string
 *                   example: Delivery Zones retrieved successfully
 */

/**
 * @swagger
 * /api/v1/delivery-zones/{id}:
 *   get:
 *     summary: Get a single delivery zone by ID
 *     tags: [Delivery Zones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The delivery zone ID
 *     responses:
 *       200:
 *         description: Delivery Zone details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/DeliveryZone'
 *                 message:
 *                   type: string
 *                   example: Delivery Zone retrieved successfully
 *       404:
 *         description: Delivery Zone not found
 */

/**
 * @swagger
 * /api/v1/delivery-zones:
 *   post:
 *     summary: Add a new delivery zone
 *     tags: [Delivery Zones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeliveryZone'
 *     responses:
 *       201:
 *         description: Delivery Zone added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/DeliveryZone'
 *                 message:
 *                   type: string
 *                   example: Delivery Zone added successfully
 */

/**
 * @swagger
 * /api/v1/delivery-zones/{id}:
 *   put:
 *     summary: Update an existing delivery zone
 *     tags: [Delivery Zones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The delivery zone ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeliveryZone'
 *     responses:
 *       200:
 *         description: Delivery Zone updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/DeliveryZone'
 *                 message:
 *                   type: string
 *                   example: Delivery Zone updated successfully
 *       404:
 *         description: Delivery Zone not found
 */

/**
 * @swagger
 * /api/v1/delivery-zones/{id}:
 *   delete:
 *     summary: Delete a delivery zone
 *     tags: [Delivery Zones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The delivery zone ID
 *     responses:
 *       200:
 *         description: Delivery Zone deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Delivery Zone deleted successfully
 *       404:
 *         description: Delivery Zone not found
 */



/**
 * @swagger
 * /api/v1/countries:
 *   get:
 *     summary: Get all country details
 *     tags: [Country/State/City]
 *     responses:
 *       200:
 *         description: List of all countries with full details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "66e02b5573be2589fee79cd4"
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: Afghanistan
 *                       iso3:
 *                         type: string
 *                         example: AFG
 *                       iso2:
 *                         type: string
 *                         example: AF
 *                       numeric_code:
 *                         type: integer
 *                         example: 4
 *                       phone_code:
 *                         type: integer
 *                         example: 93
 *                       capital:
 *                         type: string
 *                         example: Kabul
 *                       currency:
 *                         type: string
 *                         example: AFN
 *                       currency_name:
 *                         type: string
 *                         example: Afghan afghani
 *                       currency_symbol:
 *                         type: string
 *                         example: "؋"
 *                       tld:
 *                         type: string
 *                         example: .af
 *                       native:
 *                         type: string
 *                         example: "افغانستان"
 *                       region:
 *                         type: string
 *                         example: Asia
 *                       region_id:
 *                         type: integer
 *                         example: 3
 *                       subregion:
 *                         type: string
 *                         example: Southern Asia
 *                       subregion_id:
 *                         type: integer
 *                         example: 14
 *                       nationality:
 *                         type: string
 *                         example: Afghan
 *                       timezones:
 *                         type: string
 *                         example: "[{zoneName:'Asia\\/Kabul',gmtOffset:16200,gmtOffsetName:'UTC+04:30',abbreviation:'AFT',tzName:'Afghanistan Time'}]"
 *                       latitude:
 *                         type: number
 *                         example: 33
 *                       longitude:
 *                         type: number
 *                         example: 65
 *                       emoji:
 *                         type: string
 *                         example: "🇦🇫"
 *                       emojiU:
 *                         type: string
 *                         example: "U+1F1E6 U+1F1EB"
 */


/**
 * @swagger
 * /api/v1/states/{country_id}:
 *   get:
 *     summary: Get all states by country_id
 *     tags: [Country/State/City]
 *     parameters:
 *       - in: path
 *         name: country_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the country to get states for
 *     responses:
 *       200:
 *         description: List of states for a specific country
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "66e02bab73be2589fee79dcf"
 *                       id:
 *                         type: integer
 *                         example: 3901
 *                       name:
 *                         type: string
 *                         example: Badakhshan
 *                       country_id:
 *                         type: integer
 *                         example: 1
 *                       country_code:
 *                         type: string
 *                         example: AF
 *                       country_name:
 *                         type: string
 *                         example: Afghanistan
 *                       state_code:
 *                         type: string
 *                         example: BDS
 *                       latitude:
 *                         type: number
 *                         example: 36.7347725
 *                       longitude:
 *                         type: number
 *                         example: 70.8119953
 */
/**
 * @swagger
 * /api/v1/restaurants/{restaurantId}/addon/add:
 *   post:
 *     summary: Add a new addon
 *     tags: [Addon]
 *     parameters:
 *       - name: restaurantId
 *         in: path
 *         required: true
 *         description: The ID of the restaurant
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Extra Cheese"
 *               isOptional:
 *                 type: boolean
 *                 example: true
 *               allowQuantity:
 *                 type: boolean
 *                 example: true
 *               forceMin:
 *                 type: number
 *                 example: 1
 *               forceMax:
 *                 type: number
 *                 example: 5
 *     responses:
 *       201:
 *         description: Addon created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Addon created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "64f6f629f76b0b19d1c9e204"
 *                     name:
 *                       type: string
 *                       example: "Extra Cheese"
 *                     isOptional:
 *                       type: boolean
 *                       example: true
 *                     allowQuantity:
 *                       type: boolean
 *                       example: true
 *                     forceMin:
 *                       type: number
 *                       example: 1
 *                     forceMax:
 *                       type: number
 *                       example: 5
 */

/**
 * @swagger
 * /api/v1/restaurants/{restaurantId}/addon/{id}/edit:
 *   put:
 *     summary: Edit an existing addon by ID
 *     tags: [Addon]
 *     parameters:
 *       - name: restaurantId
 *         in: path
 *         required: true
 *         description: The ID of the restaurant
 *         schema:
 *           type: string
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the addon
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Extra Cheese"
 *               isOptional:
 *                 type: boolean
 *                 example: true
 *               allowQuantity:
 *                 type: boolean
 *                 example: true
 *               forceMin:
 *                 type: number
 *                 example: 1
 *               forceMax:
 *                 type: number
 *                 example: 5
 *     responses:
 *       200:
 *         description: Addon updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Addon updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "64f6f629f76b0b19d1c9e204"
 *                     name:
 *                       type: string
 *                       example: "Extra Cheese"
 *                     isOptional:
 *                       type: boolean
 *                       example: true
 *                     allowQuantity:
 *                       type: boolean
 *                       example: true
 *                     forceMin:
 *                       type: number
 *                       example: 1
 *                     forceMax:
 *                       type: number
 *                       example: 5
 */

/**
 * @swagger
 * /api/v1/restaurants/{restaurantId}/addon/{id}/delete:
 *   delete:
 *     summary: Soft delete an existing addon by ID
 *     tags: [Addon]
 *     parameters:
 *       - name: restaurantId
 *         in: path
 *         required: true
 *         description: The ID of the restaurant
 *         schema:
 *           type: string
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the addon
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Addon soft-deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Addon soft-deleted successfully
 */

/**
 * @swagger
 * /api/v1/restaurants/{restaurantId}/addons:
 *   get:
 *     summary: Get all addons for a specific restaurant
 *     tags: [Addon]
 *     parameters:
 *       - name: restaurantId
 *         in: path
 *         required: true
 *         description: The ID of the restaurant
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of all addons for the restaurant
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: All addons fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "64f6f629f76b0b19d1c9e204"
 *                       name:
 *                         type: string
 *                         example: "Extra Cheese"
 *                       is_optional:
 *                         type: boolean
 *                         example: true
 *                       allow_quantity:
 *                         type: boolean
 *                         example: true
 *                       force_min:
 *                         type: number
 *                         example: 1
 *                       force_max:
 *                         type: number
 *                         example: 5
 *                       choices:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: string
 *                               example: "64f6f629f76b0b19d1c9e205"
 *                             name:
 *                               type: string
 *                               example: "Cheddar"
 *                             price:
 *                               type: number
 *                               example: 0.99
 */


/**
 * @swagger
 * /api/v1/choice:
 *   post:
 *     summary: Add a new choice
 *     tags: [Choice]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               choiceName:
 *                 type: string
 *                 example: "Small"
 *               price:
 *                 type: number
 *                 example: 0.99
 *               isSelected:
 *                 type: boolean
 *                 example: false
 *               addonId:
 *                 type: string
 *                 example: "64f6f629f76b0b19d1c9e204"
 *     responses:
 *       201:
 *         description: Choice added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Choice added successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "64f6f629f76b0b19d1c9e207"
 *                     choiceName:
 *                       type: string
 *                       example: "Small"
 *                     price:
 *                       type: number
 *                       example: 0.99
 *                     isSelected:
 *                       type: boolean
 *                       example: false
 *                     addonId:
 *                       type: string
 *                       example: "64f6f629f76b0b19d1c9e204"
 */


/**
 * @swagger
 * /api/v1/choice/{id}:
 *   put:
 *     summary: Edit an existing choice by ID
 *     tags: [Choice]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the choice to edit
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               choiceName:
 *                 type: string
 *                 example: "Large"
 *               price:
 *                 type: number
 *                 example: 1.99
 *               isSelected:
 *                 type: boolean
 *                 example: true
 *               addonId:
 *                 type: string
 *                 example: "64f6f629f76b0b19d1c9e204"
 *     responses:
 *       200:
 *         description: Choice updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Choice updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "64f6f629f76b0b19d1c9e207"
 *                     choiceName:
 *                       type: string
 *                       example: "Large"
 *                     price:
 *                       type: number
 *                       example: 1.99
 *                     isSelected:
 *                       type: boolean
 *                       example: true
 *                     addonId:
 *                       type: string
 *                       example: "64f6f629f76b0b19d1c9e204"
 */


/**
 * @swagger
 * /api/v1/choices:
 *   get:
 *     summary: Get all choices
 *     tags: [Choice]
 *     responses:
 *       200:
 *         description: List of all choices
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: All choices fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "64f6f629f76b0b19d1c9e207"
 *                       choiceName:
 *                         type: string
 *                         example: "Small"
 *                       price:
 *                         type: number
 *                         example: 0.99
 *                       isSelected:
 *                         type: boolean
 *                         example: false
 *                       addonId:
 *                         type: string
 *                         example: "64f6f629f76b0b19d1c9e204"
 */

/**
 * @swagger
 * /api/v1/choice/{id}:
 *   delete:
 *     summary: Delete an existing choice by ID
 *     tags: [Choice]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the choice to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Choice deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Choice deleted successfully
 */

/**
 * @swagger
 * /api/v1/choices/{addonId}:
 *   get:
 *     summary: Get all choices for a specific addon by Addon ID
 *     tags: [Choice]
 *     parameters:
 *       - name: addonId
 *         in: path
 *         required: true
 *         description: The ID of the addon to fetch choices for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of choices for the specified addon
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Choices fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "64f6f629f76b0b19d1c9e207"
 *                       choiceName:
 *                         type: string
 *                         example: "Small"
 *                       price:
 *                         type: number
 *                         example: 0.99
 *                       isSelected:
 *                         type: boolean
 *                         example: false
 *                       addonId:
 *                         type: string
 *                         example: "64f6f629f76b0b19d1c9e204"
 */


/**
 * @swagger
 * /api/v1/restaurants/{restaurantId}/category/add:
 *   post:
 *     summary: Add a new category
 *     tags: [Category]
 *     parameters:
 *       - name: restaurantId
 *         in: path
 *         required: true
 *         description: The ID of the restaurant
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Appetizers"
 *               description:
 *                 type: string
 *                 example: "Delicious appetizers to start your meal"
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The category image file to upload
 *               addonIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["64f6f629f76b0b19d1c9e204", "64f6f629f76b0b19d1c9e206"]
 *     responses:
 *       201:
 *         description: Category added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Category added successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "64f6f629f76b0b19d1c9e208"
 *                     name:
 *                       type: string
 *                       example: "Appetizers"
 *                     description:
 *                       type: string
 *                       example: "Delicious appetizers to start your meal"
 *                     image:
 *                       type: string
 *                       example: "https://example.com/image.jpg"
 *                     addonIds:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["64f6f629f76b0b19d1c9e204", "64f6f629f76b0b19d1c9e206"]
 */


/**
 * @swagger
 * /api/v1/restaurants/{restaurantId}/category/{id}/edit:
 *   put:
 *     summary: Edit an existing category by ID
 *     tags: [Category]
 *     parameters:
 *       - name: restaurantId
 *         in: path
 *         required: true
 *         description: The ID of the restaurant
 *         schema:
 *           type: string
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the category to edit
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Appetizers"
 *               description:
 *                 type: string
 *                 example: "Updated description for appetizers"
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The category image file to upload
 *               addonIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["64f6f629f76b0b19d1c9e204", "64f6f629f76b0b19d1c9e206"]
 *     responses:
 *       200:
 *         description: Category updated successfully
 */


/**
 * @swagger
 * /api/v1/restaurants/{restaurantId}/category/{id}/delete:
 *   delete:
 *     summary: Soft delete a category by ID
 *     tags: [Category]
 *     parameters:
 *       - name: restaurantId
 *         in: path
 *         required: true
 *         description: The ID of the restaurant
 *         schema:
 *           type: string
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the category to soft delete
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isDelete:
 *                 type: boolean
 *                 default: true
 *                 description: Set to true to mark the category as deleted
 *     responses:
 *       200:
 *         description: Category soft deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Category soft deleted successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "64f6f629f76b0b19d1c9e208"
 *                     isDelete:
 *                       type: boolean
 *                       example: true
 */


/**
 * @swagger
 * /api/v1/restaurants/{restaurantId}/categories:
 *   get:
 *     summary: Get all categories for a specific restaurant
 *     tags: [Category]
 *     parameters:
 *       - name: restaurantId
 *         in: path
 *         required: true
 *         description: The ID of the restaurant to fetch categories for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: All categories, items, addons, and sizes fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "All categories, items, addons, and sizes fetched successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "64f6f629f76b0b19d1c9e208"
 *                       name:
 *                         type: string
 *                         example: "Appetizers"
 *                       description:
 *                         type: string
 *                         example: "Delicious appetizers"
 *                       image:
 *                         type: string
 *                         example: "https://example.com/image.jpg"
 *                       addonIds:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["64f6f629f76b0b19d1c9e204"]
 *                       items:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: string
 *                               example: "64f6f629f76b0b19d1c9e209"
 *                             name:
 *                               type: string
 *                               example: "Spring Rolls"
 *                             addonIds:
 *                               type: array
 *                               items:
 *                                 type: object
 *                                 properties:
 *                                   id:
 *                                     type: string
 *                                     example: "64f6f629f76b0b19d1c9e205"
 *                                   name:
 *                                     type: string
 *                                     example: "Sweet Sauce"
 *                             sizes:
 *                               type: array
 *                               items:
 *                                 type: object
 *                                 properties:
 *                                   id:
 *                                     type: string
 *                                     example: "64f6f629f76b0b19d1c9e206"
 *                                   name:
 *                                     type: string
 *                                     example: "Small"
 *                                   addonIds:
 *                                     type: array
 *                                     items:
 *                                       type: object
 *                                       properties:
 *                                         id:
 *                                           type: string
 *                                           example: "64f6f629f76b0b19d1c9e207"
 *                                         name:
 *                                           type: string
 *                                           example: "Extra Sauce"
 */

/**
 * @swagger
 * /api/v1/cities/{state_id}/{country_id}:
 *   get:
 *     summary: Get all cities by state_id and country_id
 *     tags: [Country/State/City]
 *     parameters:
 *       - in: path
 *         name: state_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the state to get cities for
 *       - in: path
 *         name: country_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the country to get cities for
 *     responses:
 *       200:
 *         description: List of cities for a specific state and country
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "66e02d2973be2589fee7b16f"
 *                       id:
 *                         type: integer
 *                         example: 52
 *                       name:
 *                         type: string
 *                         example: Ashkāsham
 *                       state_id:
 *                         type: integer
 *                         example: 3901
 *                       state_code:
 *                         type: string
 *                         example: BDS
 *                       state_name:
 *                         type: string
 *                         example: Badakhshan
 *                       country_id:
 *                         type: integer
 *                         example: 1
 *                       country_code:
 *                         type: string
 *                         example: AF
 *                       country_name:
 *                         type: string
 *                         example: Afghanistan
 *                       latitude:
 *                         type: number
 *                         example: 36.68333
 *                       longitude:
 *                         type: number
 *                         example: 71.53333
 *                       wikiDataId:
 *                         type: string
 *                         example: Q4805192
 */


/**
 * @swagger
 * /api/v1/item/add:
 *   post:
 *     summary: Add a new item
 *     tags: [Item]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:   # Specify multipart/form-data for file upload
 *           schema:
 *             type: object
 *             properties:
 *               category_id:           # Added category_id to the request body
 *                 type: string
 *                 example: "64f6f629f76b0b19d1c9e204"
 *               image:
 *                 type: string
 *                 format: binary        # Indicates file upload
 *               name:
 *                 type: string
 *                 example: "Pizza"
 *               description:
 *                 type: string
 *                 example: "Delicious cheese pizza"
 *               price:
 *                 type: number
 *                 example: 9.99
 *               isVariant:
 *                 type: boolean
 *                 example: false
 *               addonIds:              # Optional field for addon IDs
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: ["64f6f629f76b0b19d1c9e205", "64f6f629f76b0b19d1c9e206"]
 *     responses:
 *       201:
 *         description: Item added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Item added successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "64f6f629f76b0b19d1c9e207"
 *                     image:
 *                       type: string
 *                       example: "https://example.com/item-image.jpg"
 *                     name:
 *                       type: string
 *                       example: "Pizza"
 *                     description:
 *                       type: string
 *                       example: "Delicious cheese pizza"
 *                     price:
 *                       type: number
 *                       example: 9.99
 *                     isVariant:
 *                       type: boolean
 *                       example: false
 *                     addonIds:              # Optional field in response
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: ["64f6f629f76b0b19d1c9e205"]
 */


/**
 * @swagger
 * /api/v1/item/{id}:
 *   put:
 *     summary: Edit an existing item by ID
 *     tags: [Item]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the item to edit
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:   # Specify multipart/form-data for file upload
 *           schema:
 *             type: object
 *             properties:
 *               category_id:           # Optional category_id
 *                 type: string
 *                 example: "64f6f629f76b0b19d1c9e204"
 *               image:
 *                 type: string
 *                 format: binary        # Indicates file upload
 *               name:
 *                 type: string
 *                 example: "Pizza"
 *               description:
 *                 type: string
 *                 example: "Updated description for delicious cheese pizza"
 *               price:
 *                 type: number
 *                 example: 10.99
 *               isVariant:
 *                 type: boolean
 *                 example: true
 *               addonIds:              # Optional field for addon IDs
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: ["64f6f629f76b0b19d1c9e205", "64f6f629f76b0b19d1c9e206"]
 *     responses:
 *       200:
 *         description: Item updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Item updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "64f6f629f76b0b19d1c9e207"
 *                     image:
 *                       type: string
 *                       example: "https://example.com/item-image.jpg"
 *                     name:
 *                       type: string
 *                       example: "Pizza"
 *                     description:
 *                       type: string
 *                       example: "Updated description for delicious cheese pizza"
 *                     price:
 *                       type: number
 *                       example: 10.99
 *                     isVariant:
 *                       type: boolean
 *                       example: true
 *                     addonIds:              # Optional field in response
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: ["64f6f629f76b0b19d1c9e205"]
 */


/**
 * @swagger
 * /api/v1/item/{id}/delete:
 *   delete:
 *     summary: Soft delete an item by ID
 *     tags: [Item]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the item to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Item deleted successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "64f6f629f76b0b19d1c9e207"
 *                     isDelete:
 *                       type: boolean
 *                       example: true  # Indicates the item has been soft deleted
 */

/**
 * @swagger
 * /api/v1/size:
 *   post:
 *     summary: Add a new size
 *     tags: [Size]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               itemId:
 *                 type: string
 *                 example: "64f6f629f76b0b19d1c9e204"
 *               name:
 *                 type: string
 *                 example: "Medium"
 *               price:
 *                 type: number
 *                 example: 10.99
 *               isPreSelect:
 *                 type: boolean
 *                 example: false
 *               addonIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["64f6f629f76b0b19d1c9e204", "64f6f629f76b0b19d1c9e205"]
 *     responses:
 *       201:
 *         description: Size added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Size added successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "64f6f629f76b0b19d1c9e207"
 *                     name:
 *                       type: string
 *                       example: "Medium"
 *                     price:
 *                       type: number
 *                       example: 10.99
 *                     isPreSelect:
 *                       type: boolean
 *                       example: false
 *                     addonIds:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["64f6f629f76b0b19d1c9e204", "64f6f629f76b0b19d1c9e205"]
 */

/**
 * @swagger
 * /api/v1/size/{id}:
 *   put:
 *     summary: Edit an existing size by ID
 *     tags: [Size]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the size to edit
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Large"
 *               price:
 *                 type: number
 *                 example: 12.99
 *               isPreSelect:
 *                 type: boolean
 *                 example: true
 *               addonIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["64f6f629f76b0b19d1c9e204", "64f6f629f76b0b19d1c9e205"]
 *     responses:
 *       200:
 *         description: Size updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Size updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "64f6f629f76b0b19d1c9e207"
 *                     name:
 *                       type: string
 *                       example: "Large"
 *                     price:
 *                       type: number
 *                       example: 12.99
 *                     isPreSelect:
 *                       type: boolean
 *                       example: true
 *                     addonIds:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["64f6f629f76b0b19d1c9e204", "64f6f629f76b0b19d1c9e205"]
 */

/**
 * @swagger
 * /api/v1/size/{id}:
 *   delete:
 *     summary: Soft delete an existing size by ID
 *     tags: [Size]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the size to soft delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Size soft deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Size soft deleted successfully
 */