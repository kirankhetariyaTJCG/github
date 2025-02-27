const APIConstants = {
  // Restaurant
  GET_RESTAURANT_DETAILS: 'restaurants/getRestaurantById',
  EDIT_RESTAURANT_DETAILS: 'restaurants/update-restaurant',

  // User / Authentication
  SEND_VERIFICATION_EMAIL: 'sendVerificationEmail',
  VERIFY_EMAIL: 'verifyEmail',
  FORGOT_PASSWORD: 'forgotPassword',
  RESET_PASSWORD: 'resetPassword',
  CHANGE_PASSWORD: 'change-password',
  RESET_EMAIL: 'changeEmail',
  CHNAGE_EMAIL_REQUEST: 'requestEmailChange',
  LOGIN: 'login',
  REGISTER: 'register',
  LOGOUT: 'logout',
  UPDATE_PROFILE: 'updateProfile',
  REFRESH_TOKEN: 'refresh-token',

  // Menu Selection
  GET_ALL_MENU: 'restaurants/cuisines',
  GET_DEFAULT_MENU: 'restaurants/default-cuisines',
  EDIT_MENU: 'restaurants/edit-cuisine',
  ADD_MENU: 'restaurants/cuisine',
  DELETE_MENU: 'restaurants/delete-cuisine',

  // Delivery Zones
  GET_DELIVERYZONES: 'restaurants/delivery-zones',
  ADD_DELIVERYZONE: 'restaurants/delivery-zone',
  EDIT_DELIVERYZONE: 'restaurants/edit-delivery-zone',
  DELETE_DELIVERYZONE: 'restaurants/delete-delivery-zones',
  REMOVE_PROFILE_IMAGE: 'removeFile',

  // Choices & Addons
  GET_ALL_ADDONS: 'menu/addons',
  DELETE_ADDON: 'menu/delete-addon',
  ADD_ADDON: 'menu/addon',
  EDIT_ADDON: 'menu/edit-addon',
  CHANGE_ADDON_POSITION: 'menu/addon-position',
  ADD_CHOICE: 'menu/choice',
  EDIT_CHOICE: 'menu/edit-choice',
  DELETE_CHOICE: 'menu/delete-choice',
  CHANGE_CHOICE_POSITION: 'menu/choice-position',

  // Menu Details
  GET_MENU_DETAILS: 'menu/menu-details',

  // Categories && Items
  ADD_CATEGORY: 'menu/category',
  EDIT_CATEGORY: 'menu/edit-category',
  DELETE_CATEGORY: "menu/delete-category",
  CHANGE_CATEGORY_POSITION: "menu/category-position",
  Add_ITEM: 'menu/addItem',
  EDIT_ITEM: 'menu/editItem',
  MANAGE_ITEM: 'menu/item',
  DELETE_ITEM: 'menu/delete-item',
  CHANGE_ITEM_POSITION: 'menu/item-position',

  // Tax Rates
  GET_TAX_CATEOGORIES: 'restaurants/tax-rates',
  ADD_TAX_CATEGORY: 'restaurants/tax-rate',
  EDIT_TAX_CATEGORY: "restaurants/edit-tax-rate",
  DELETE_TAX_CATEGORY: 'restaurants/delete-tax-rate',
  DUPLICATE_ENTITY: 'menu/duplicate',

  MANAGE_VISIBILITY: 'menu/manageVisibility',

  // Opening Hours
  MANAGE_RESTAURANT_SERVICE_SCHEDULES: 'restaurants/service-schedule',
  GET_RESTAURANT_SERVICE_SCHEDULES: 'restaurants/service-schedule-get',
  GET_RESTAURANT_All_SERVICE_SCHEDULES: 'restaurants/service-schedules',
  MANAGE_PAUSE_SERVICES: 'restaurants/pause-services',
  GET_PAUSE_SERVICES: 'restaurants/pause-services-data',
  DELETE_PAUSE_SERVICES: 'restaurants/delete-pause-services',

  // Size
  ADD_SIZE: 'menu/size',
  EDIT_SIZE: 'menu/edit-size',
  DELETE_SIZE: 'menu/delete-size',

  // Tags
  GET_TAGS: "tags",

  // Item Settings
  ITEM_EXTRA_DETAIL: 'menu/items-extra-detail',
  ITEM_EXTRA_DETAILS: 'menu/items-extra-details',
  DELETE_ITEM_EXTRA_DETAIL: 'menu/delete-items-extra-detail',
  GET_ALL_NUTRITIONALS: 'menu/getNutritionalValueData',

  // Self-Made Promos
  GET_SELF_MADE_PROMO: "/promotion",
  MANAGE_SELF_MADE_PROMO: '/manage-promotion',
  GET_PROMOTIONS: "/promotion-dropdown",

  // Website Sections
  GENERATE_WEBSITE: 'website/generate-website',
  WEBSITE_SECTIONS: 'website/sections',
  GET_WEBSITE: 'website/fetch-website',
  UPLOAD_FILE: 'uploadImage',
  REMOVE_FILE: 'removeFile',

  // Reports
  GET_ORDERS: 'order/history',
  GET_ORDER_BY_ID: 'order/find-by-id',
  GET_CLIENTS: 'orders/customer-summary',
  GET_CATEGORIES: 'sales/category-item',

  // Payment  Details
  PAYMENT_KEY: 'restaurants/web-key',

  // Order Taking App
  GET_LOGIN_HISTORY: 'web/login-history',
  SEND_APP_LINK: 'web/send-app-link',

  // QR & Flyer
  GET_FLYERS: 'flyer/flyers',
  DELETE_FLYER: 'flyer/delete',
  GENERATE_QR: 'flyer/QR-code',
  MANAGE_FLYER: 'flyer/flyer',
  MANAGE_FLYER_PAGE: 'flyer/flyer-page',

  // Service Fees
  GET_SERVICE_FEES: 'service-fees/fetch',
  MANAGE_SERVICE_FEES: 'service-fees/manage',
}

export default APIConstants
