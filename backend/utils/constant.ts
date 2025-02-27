import path from 'path';

let environmentMode = process.env.MODE
let frontendUrl = null
let backendUrl = null
let dbURl = null

if (environmentMode == "production") {
    dbURl = process.env.PRODUCTION_DB_URL
    frontendUrl = process.env.PRODUCTION_FRONTEND_URL
    backendUrl = process.env.PRODUCTION_BACKEND_URL
} else if (environmentMode == "development") {
    dbURl = process.env.DEVELOPMENT_DB_URL
    frontendUrl = process.env.DEVELOPMENT_FRONTEND_URL
    backendUrl = process.env.DEVELOPMENT_BACKEND_URL
} else if (environmentMode == "local") {
    dbURl = process.env.LOCAL_DB_URL
    frontendUrl = process.env.LOCAL_FRONTEND_URL
    backendUrl = process.env.LOCAL_BACKEND_URL
}

export const SERVICE = {
    OPENING_HOURS: 1,
    PICKUP_SERVICE: 2,
    DELIVERY_SERVICE: 3,
    TABLE_RESERVATION: 4,
    ON_PREMISE: 5,
    SCHEDULE_ORDER: 6,
} as const;

export const DAYS = {
    SUNDAY: 0,
    MONDAY: 1,
    TUESDAY: 2,
    WEDNESDAY: 3,
    THURSDAY: 4,
    FRIDAY: 5,
    SATURDAY: 6,
} as const;

export const USER_TYPE = {
    MANAGER: 1,
    RESELLER: 2,
    OWNER: 3,
    SUPER_ADMIN: 4,
    CUSTOMER: 5
}

export const constants = {
    // Database URLs
    DB_URL: dbURl,
    FRONTEND_URL: frontendUrl,
    BACKEND_URL: backendUrl,
    PORT: process.env.PORT || 4000,
    COOKIE_EXPIRE: process.env.COOKIE_EXPIRE || 5000,

    // SMTP Configuration
    MAIL_SMTP_HOST: process.env.MAIL_SMTP_HOST || 'smtp.gmail.com',
    MAIL_SMTP_PORT: process.env.MAIL_SMTP_PORT || 587,
    MAIL_SMTP_USER: process.env.MAIL_SMTP_USER,
    MAIL_SMTP_PASSWORD: process.env.MAIL_SMTP_PASSWORD,
    MAIL_SMTP_FROM: process.env.MAIL_SMTP_FROM,
    MAIL_SMTP_TLS_PROTOCOL: process.env.MAIL_SMTP_TLS_PROTOCOL,

    EMAIL_API_KEY: process.env.EMAIL_API_KEY,
    EMAIL_SENDER_ADDRESS: process.env.EMAIL_SENDER_ADDRESS,
    EMAIL_SENDER_NAME: process.env.EMAIL_SENDER_NAME,

    // SMS Config
    SMS_API_URL: process.env.SMS_API_URL,
    SMS_API_KEY: process.env.SMS_API_KEY,
    SMS_FROM_PHONE: process.env.SMS_FROM_PHONE,

    // JWT Configuration
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1500m',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || '70d',

    // JWT Configuration
    JWT_CUS_SECRET: process.env.JWT_CUS_SECRET,
    JWT_CUS_EXPIRES_IN: process.env.JWT_CUS_EXPIRES_IN || '1500m',
    JWT_CUS_REFRESH_SECRET: process.env.JWT_CUS_REFRESH_SECRET,
    JWT_CUS_REFRESH_EXPIRES_IN: process.env.JWT_CUS_REFRESH_EXPIRES_IN || '70d',


    REDIS_URL: process.env.REDIS_URL || 'redis://:9;X)DAd)uv08@127.0.0.1:6379',
    REDIS_PASSWORD: process.env.REDIS_PASSWORD || '123456789',

    MODE: environmentMode || 'development', // (development, production, or local)
    SENTRY_DSN: process.env.SENTRY_DSN,

    CHAR_SET: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    FILE_EXTS: [
        ".png", ".jpg", ".jpeg", ".gif", ".mp3", ".mp4", ".pdf", ".txt",
        ".doc", ".avi", ".mov", ".mkv", ".webm", ".docx", ".ttf",
        ".webp", ".csv", ".svg"
    ],
    ALLOWED_MIME_TYPES: [
        "image/",
        "video/",
        "application/",
        "text/csv",
        "image/svg+xml"
    ],
    UPLOAD_DIR: path.join(__dirname, '../../uploads'), // Base upload directory
    COMPANY_NAME: "1ROOS",
    APP_DOWNLOAD_LINK: "https://play.google.com"
}

export const STATUS_CODES = {
    // Successful Responses
    SUCCESS: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,

    // Redirection Messages
    MOVED_PERMANENTLY: 301,
    FOUND: 302,
    SEE_OTHER: 303,
    NOT_MODIFIED: 304,
    TEMPORARY_REDIRECT: 307,
    PERMANENT_REDIRECT: 308,

    // Client Error Responses
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    NOT_ACCEPTABLE: 406,
    PROXY_AUTHENTICATION_REQUIRED: 407,
    REQUEST_TIMEOUT: 408,
    CONFLICT: 409,
    GONE: 410,
    LENGTH_REQUIRED: 411,
    PRECONDITION_FAILED: 412,
    PAYLOAD_TOO_LARGE: 413,
    URI_TOO_LONG: 414,
    UNSUPPORTED_MEDIA_TYPE: 415,
    RANGE_NOT_SATISFIABLE: 416,
    EXPECTATION_FAILED: 417,
    MISDIRECTED_REQUEST: 421,
    UNPROCESSABLE_ENTITY: 422,
    LOCKED: 423,
    FAILED_DEPENDENCY: 424,
    TOO_MANY_REQUESTS: 429,

    // Server Error Responses
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504,
};

export const MESSAGES = {

    CREATE: '{data} has been created successfully.',
    UPDATE: '{data} has been updated successfully.',
    DELETE: '{data} has been deleted successfully.',
    ALREADY_EXISTS: '{data} already exists. Please choose a different one.',
    DOMAIN_VERIFIED: "Domain has been successfully verified.",
    ROLE_NOT_AUTHORIZED: "Role: {role} is not allowed to access this resource.",
    ASSOCIATE_RECORD_NOT_DELETED: "Deletion failed. The record is associated with other data.",
    PERMISSIONS_ASSIGNED: 'Permissions assigned successfully',

    USER_NOT_FOUND: "User not found.",
    NOT_FOUND: "We couldn't find the requested information.",
    DATA_RETRIEVED_SUCCESSFULLY: "Data retrieved successfully.",
    GENERAL_ERROR: "Oops! Something went wrong. Please try again later.",
    POSITION_CHANGE_SUCCESS: "Position has been changed successfully.",
    POSITION_CHANGE_FAILURE: "Failed to change position.",
    FILE_UPLOAD_SUCCESS: "File uploaded successfully.",
    FILE_UPLOAD_ERROR: "Failed to upload the file.",
    DATA_SAVED_SUCCESSFULLY: "Data saved successfully.",
    STATUS_CHANGE_FAILURE: "Failed to change status.",
    STATUS_CHANGE_SUCCESS: "Status has been changed successfully.",
    FILE_DELETE_SUCCESS: "File deleted successfully.",
    FILE_DELETE_ERROR: "Failed to delete the file.",
    LOGIN_SUCCESS: "You have logged in successfully.",
    LOGOUT_SUCCESS: "You have been logged out successfully.",
    EMAIL_SENT_SUCCESS: "Email sent successfully.",
    EMAIL_SEND_FAILURE: "Email could not be sent. Please try again later.",
    PASSWORD_RESET_TOKEN_GENERATED: "Your password reset token has been generated.",

    // Credentials messages
    EMAIL_EXISTS: "An account with this email address already exists.",
    USERNAME_EXISTS: "This username is taken. Please choose a different one.",
    MOBILE_NUMBER_EXISTS: "An account with this mobile number already exists.",
    INVALID_CREDENTIALS: "The username or password you entered is incorrect. Please try again.",

    // Client Error Responses
    BAD_REQUEST: "Your request is invalid. Please check your input",
    UNAUTHORIZED: "Unauthorized access. Please log in.",
    FORBIDDEN: "Access forbidden. You do not have permission.",
    METHOD_NOT_ALLOWED: "Method not allowed for the requested resource.",
    NOT_ACCEPTABLE: "Requested resource is not acceptable.",
    PROXY_AUTHENTICATION_REQUIRED: "Proxy authentication required.",
    REQUEST_TIMEOUT: "Request timed out. Please try again.",
    CONFLICT: "Conflict occurred. Please check the resource state.",
    GONE: "Resource is no longer available.",
    LENGTH_REQUIRED: "Content-Length required.",
    PRECONDITION_FAILED: "Precondition failed. Please check your request.",
    PAYLOAD_TOO_LARGE: "Payload too large. Please reduce the size.",
    URI_TOO_LONG: "Request URI is too long.",
    UNSUPPORTED_MEDIA_TYPE: "Unsupported media type.",
    RANGE_NOT_SATISFIABLE: "Requested range not satisfiable.",
    EXPECTATION_FAILED: "Expectation failed.",
    MISDIRECTED_REQUEST: "Request was directed to an invalid server.",
    UNPROCESSABLE_ENTITY: "Unprocessable entity. Please check your data.",
    LOCKED: "Resource is locked. Unable to modify.",
    FAILED_DEPENDENCY: "Failed dependency. Previous requests failed.",
    TOO_MANY_REQUESTS: "Too many requests. Please slow down.",

    // Server Error Responses
    INTERNAL_SERVER_ERROR: "Internal server error. Please try again later.",
    NOT_IMPLEMENTED: "Not implemented. Functionality is not available.",
    BAD_GATEWAY: "Bad gateway. Received an invalid response.",
    SERVICE_UNAVAILABLE: "Service unavailable. Please try again later.",
    GATEWAY_TIMEOUT: "Gateway timeout. No response received.",

    // cart message
    ITEM_ADDED_SUCCESS: 'Item added to cart successfully.',
    ITEM_REMOVED_SUCCESS: 'Item removed from cart successfully.',
    ALL_CARTS_REMOVED_SUCCESS: "All cart items have been removed successfully.",
    CART_NOT_FOUND: 'Cart not found.',
    DUPLICATE_ITEM: 'Item with the same size already exists in the cart.',
    ITEM_NOT_FOUND: 'Item not found in the cart.',
    INVALID_REQUEST: 'Invalid request data.',
    CART_UPDATED: 'Cart updated successfully.',
    ITEM_NOT_EXIST_IN_CART: 'Item does not exist in the cart.',

    PAYMENT_NOT_CONFIGURED: "The restaurant's payment settings are not yet configured. Please contact the restaurant directly to complete your order or resolve the issue.",

    COUPON_EXPIRED: "The coupon has expired or is not yet active.",
    COUPON_NOT_ACTIVE: "The coupon is not active at the moment.",
    INVALID_CLIENT_TYPE: "The client type does not match the promotion requirements.",
    INVALID_ORDER_TYPE: "The order type does not match the promotion requirements.",
    PROMOTION_LIMIT_REACHED: "The promotion usage limit has been reached.",
    COUPON_USED_ALREADY: "This coupon has already been used by this client.",
    INVALID_PAYMENT_METHOD: "The selected payment method is not eligible for this promotion.",
    INVALID_PROMOTION_TYPE: 'Invalid promotion type.',
    MINIMUM_ORDER_VALUE_NOT_MET: 'The minimum order value has not been met.',
    NO_ELIGIBLE_ITEMS: 'Your cart does not contain eligible items for this promotion.',
    INVALID_DELIVERY_ZONE: 'This promotion is not available in the selected delivery zone.',
    NOT_ELIGIBLE_FOR_BOGO: 'You are not eligible for the Buy One, Get One Free promotion.',
    DISCOUNT_EXCEEDS_CART_VALUE: 'The discount amount exceeds the cart value.',
    INVALID_PAYMENT_METHOD_FOR_REWARD: 'The payment method used is not eligible for this reward.',
    COUPON_APPLIED_SUCCESSFULLY: 'The coupon has been applied successfully.',
    INVALID_COUPON_CODE: 'Invalid coupon code provided.',
    COUPON_NOT_FOUND: 'No promotion found with the provided coupon code.',
    NO_ITEMS_IN_CART: "There are no items in the cart.",
    ITEM_OR_SIZE_NOT_SELECTED: "Please select an item and size in your cart.",

    ITEM_NOT_IN_PROMOTION: "This item is not part of the promotion.",
    ITEM_SIZE_NOT_SELECTED: "This item does not have a valid size selected.",

}

export const PERMISSION: any[] = [
    { module: "Setup", title: "Restaurant Basics", slug: "restaurant_basics", position: 1, is_default: true },
    { module: "Setup", title: "Payment, taxes & legal", slug: "payment_taxes_legal", position: 2, is_default: true },
    { module: "Setup", title: "Menu Setup", slug: "menu_setup", position: 3, is_default: true },
    { module: "Setup", title: "Publishing", slug: "publishing", position: 4, is_default: true },
    { module: "Setup", title: "Payments", slug: "payments", position: 5, is_default: true },
    { module: "Setup", title: "Taking Orders", slug: "taking_orders", position: 6, is_default: true },

    { module: "Marketing Tools", title: "Kickstarter", slug: "kickstarter", position: 7, is_default: true },
    { module: "Marketing Tools", title: "Autopilot", slug: "autopilot", position: 8, is_default: true },
    { module: "Marketing Tools", title: "Website Scanner", slug: "website_scanner", position: 9, is_default: true },
    { module: "Marketing Tools", title: "Google Business", slug: "google_business", position: 10, is_default: true },
    { module: "Marketing Tools", title: "Promotions", slug: "promotions", position: 11, is_default: true },
    { module: "Marketing Tools", title: "QR Codes & Flyers", slug: "qr_codes_flyers", position: 12, is_default: true },

    { module: "Reports", title: "Dashboard", slug: "dashboard", position: 13, is_default: true },
    { module: "Reports", title: "Sales", slug: "sales", position: 14, is_default: true },
    { module: "Reports", title: "Menu Insights", slug: "menu_insights", position: 15, is_default: true },
    { module: "Reports", title: "Online Ordering", slug: "online_ordering", position: 16, is_default: true },
    { module: "Reports", title: "List View", slug: "list_view", position: 17, is_default: true },

    { module: "Online Ordering", title: "Ordering widget", slug: "ordering_widget", position: 18, is_default: true },
    { module: "Online Ordering", title: "Integrations", slug: "integrations", position: 19, is_default: true }
];


export const SUB_PERMISSION: any[] = [
    {
        "slug": "restaurant_basics",
        "sub_permission": [
            "/setup/restaurant/details",
            "/setup/restaurant/menu-selection",
            "/setup/restaurant/serve-master",
            "/setup/restaurant/delivery-location",
            "/setup/restaurant/opening-hours"
        ]
    },
    {
        "slug": "payment_taxes_legal",
        "sub_permission": [
            "/setup/taxes/taxation",
            "/setup/taxes/payment-methods",
            "/setup/taxes/official-details"
        ]
    },
    {
        "slug": "menu_setup",
        "sub_permission": [
            "/setup/menu/choices-addons",
            "/setup/menu/categories"
        ]
    },
    {
        "slug": "publishing",
        "sub_permission": [
            "/setup/publish/facebook",
            "/setup/publish/sales-optimized-website",
            "/setup/publish/legacy-website"
        ]
    },
    {
        "slug": "payments",
        "sub_permission": [
            "/setup/payments/online-payment"
        ]
    },
    {
        "slug": "taking_orders",
        "sub_permission": [
            "/setup/take-orders/app",
            "/setup/take-orders/call"
        ]
    },
    {
        "slug": "kickstarter",
        "sub_permission": [
            "/marketing-tools/kick-starter/overview",
            "/marketing-tools/kick-starter/first-promo",
            "/marketing-tools/kick-starter/invite-prospects"
        ]
    },
    {
        "slug": "autopilot",
        "sub_permission": [
            "/marketing-tools/autopilot/overview",
            "/marketing-tools/autopilot/campaigns"
        ]
    },
    {
        "slug": "website_scanner",
        "sub_permission": [
            "/marketing-tools/website-scanner/website-checker",
            "/marketing-tools/website-scanner/status"
        ]
    },
    {
        "slug": "google_business",
        "sub_permission": [
            "/marketing-tools/google-business/overview",
            "/marketing-tools/google-business/status"
        ]
    },
    {
        "slug": "promotions",
        "sub_permission": [
            "/marketing-tools/promotions/overview",
            "/marketing-tools/promotions/self-made",
            "/marketing-tools/promotions/pre-made"
        ]
    },
    {
        "slug": "qr_codes_flyers",
        "sub_permission": [
            "/marketing-tools/qr-code/qr-flyers"
        ]
    },
    {
        "slug": "dashboard",
        "sub_permission": [
            "/reports/dashboard"
        ]
    },
    {
        "slug": "sales",
        "sub_permission": [
            "/reports/sales/trend",
            "/reports/sales/summary"
        ]
    },
    {
        "slug": "menu_insights",
        "sub_permission": [
            "/reports/menuinsights/categories",
            "/reports/menuinsights/items"
        ]
    },
    {
        "slug": "online_ordering",
        "sub_permission": [
            "/reports/orders/web-funnel",
            "/reports/orders/clients",
            "/reports/orders/table-reservation",
            "/reports/orders/google-ranking",
            "/reports/orders/website-visits",
            "/reports/orders/connectivity-health",
            "/reports/orders/promotions-stats"
        ]
    },
    {
        "slug": "list_view",
        "sub_permission": [
            "/reports/list/orders",
            "/reports/list/clients"
        ]
    },
    {
        "slug": "ordering_widget",
        "sub_permission": [
            "/online-ordering/order-widget/scheduled-orders",
            "/online-ordering/order-widget/auto-accept-orders",
            "/online-ordering/order-widget/service-fees",
            "/online-ordering/order-widget/fulfillment-options",
            "/online-ordering/order-widget/re-captcha",
            "/online-ordering/order-widget/billing-details",
        ]
    },
    {
        "slug": "integrations",
        "sub_permission": [
            "/online-ordering/integrations/catalog",
            "/online-ordering/integrations/your-integrations"
        ]
    }
]
