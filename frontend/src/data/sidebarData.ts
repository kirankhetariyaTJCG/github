export interface SubMenu {
  name: string
  href: string
}

export interface MenuTypes {
  name: string
  slug?: string // Added slug key
  subMenu?: SubMenu[]
  href?: string
  icon?: any
}

export interface SidebarItem {
  name: string
  slug?: string // Added slug key
  icon: string
  menu: MenuTypes[]
  href: string
}

export const sidebar: SidebarItem[] = [
  {
    name: 'Setup',
    slug: 'setup',
    href: 'setup',
    icon: 'tabler:settings-cog',
    menu: [
      {
        name: 'Restaurant Basics',
        slug: 'restaurant_basics',
        icon: 'ion:restaurant-outline',
        subMenu: [
          { name: 'Restaurant Details', href: '/restaurant/details' },
          { name: 'Menu Selection', href: '/restaurant/menu-selection' },
          { name: 'Serve Master', href: '/restaurant/serve-master' },
          { name: 'Delivery Location', href: '/restaurant/delivery-location' },
          { name: 'Opening Hours', href: '/restaurant/opening-hours' }
        ]
      },
      {
        name: 'Payment, taxes & legal',
        slug: 'payment_taxes_legal',
        icon: 'fluent:payment-32-regular',
        subMenu: [
          { name: 'Taxation', href: '/taxes/taxation' },
          { name: 'Payment Methods', href: '/taxes/payment-methods' },
          { name: 'Official Details & Policy', href: '/taxes/official-details' }
        ]
      },
      {
        name: 'Menu Setup',
        slug: 'menu_setup',
        icon: 'hugeicons:menu-restaurant',
        subMenu: [
          { name: 'Choices & Addons', href: '/menu/choices-addons' },
          { name: 'Categories', href: '/menu/categories' }
        ]
      },
      {
        name: 'Publishing',
        slug: 'publishing',
        icon: 'carbon:ibm-elo-publishing',
        subMenu: [
          { name: 'Facebook', href: '/publish/facebook' },
          { name: 'Sales Optimized Website', href: '/publish/sales-optimized-website' },
          { name: 'Legacy Website', href: '/publish/legacy-website' }
        ]
      },
      {
        name: 'Payments',
        slug: 'payments',
        icon: 'solar:hand-money-linear',
        subMenu: [
          { name: 'Online Payment', href: '/payments/online-payment' }
        ]
      },
      {
        name: 'Taking Orders',
        slug: 'taking_orders',
        icon: 'lsicon:place-order-outline',
        subMenu: [
          { name: 'Order Taking App', href: '/take-orders/app' },
          { name: 'Alert Call', href: '/take-orders/call' }
        ]
      }
    ]
  },
  {
    name: 'Marketing Tools',
    slug: 'marketing_tools',
    href: 'marketing-tools',
    icon: 'mingcute:target-line',
    menu: [
      {
        name: 'Kickstarter',
        slug: 'kickstarter',
        icon: 'hugeicons:drag-right-04',
        subMenu: [
          { name: 'Overview', href: '/kick-starter/overview' },
          { name: 'First Buy Promo', href: '/kick-starter/first-promo' },
          { name: 'Invite Prospects', href: '/kick-starter/invite-prospects' }
        ]
      },
      {
        name: 'Autopilot',
        slug: 'autopilot',
        href: '/autopilot',
        icon: 'tabler:automation',
        subMenu: [
          { name: 'Overview', href: '/autopilot/overview' },
          { name: 'Your Campaigns', href: '/autopilot/campaigns' }
        ]
      },
      {
        name: 'Website Scanner',
        slug: 'website_scanner',
        href: 'website-scanner',
        icon: 'fluent:scan-text-24-filled',
        subMenu: [
          { name: 'Website Checker', href: '/website-scanner/website-checker' },
          { name: 'Status', href: '/website-scanner/status' }
        ]
      },
      {
        name: 'Google Business',
        slug: 'google_business',
        href: 'google-business',
        icon: 'basil:google-outline',
        subMenu: [
          { name: 'Overview', href: '/google-business/overview' },
          { name: 'Status', href: '/google-business/status' }
        ]
      },
      {
        name: 'Promotions',
        slug: 'promotions',
        href: 'promotions',
        icon: 'mage:megaphone-a',
        subMenu: [
          { name: 'Overview', href: '/promotions/overview' },
          { name: 'Self Made Promos', href: '/promotions/self-made' },
          { name: 'Pre Made Promos', href: '/promotions/pre-made' }
        ]
      },
      {
        name: 'QR Codes & Flyers',
        slug: 'qr_codes_flyers',
        href: 'qr-code',
        icon: 'ic:round-qr-code',
        subMenu: [
          { name: 'QR Codes & Flyers', href: '/qr-code/qr-flyers' }
        ]
      }
    ]
  },
  {
    name: 'Reports',
    slug: 'reports',
    href: 'reports',
    icon: 'mdi:report-line',
    menu: [
      {
        name: 'Dashboard',
        slug: 'dashboard',
        icon: 'carbon:dashboard',
        href: '/dashboard',

      },
      {
        name: 'Sales',
        slug: 'sales',
        icon: 'solar:chart-linear',
        href: 'sales',
        subMenu: [
          { name: 'Trend', href: '/sales/trend' },
          { name: 'Summary', href: '/sales/summary' }
        ]
      },
      {
        name: 'Menu Insights',
        slug: 'menu_insights',
        icon: 'hugeicons:group-items',
        href: 'menuinsights',
        subMenu: [
          { name: 'Categories', href: '/menuinsights/categories' },
          { name: 'Items', href: '/menuinsights/items' }
        ]
      },
      {
        name: 'Online Ordering',
        slug: 'online_ordering',
        icon: 'solar:bill-list-outline',
        href: 'orders',
        subMenu: [
          { name: 'Website Funnel', href: '/orders/web-funnel' },
          { name: 'Clients', href: '/orders/clients' },
          { name: 'Table Reservations', href: '/orders/table-reservation' },
          { name: 'Google Ranking', href: '/orders/google-ranking' },
          { name: 'Website Visits', href: '/orders/website-visits' },
          { name: 'Connectivity Health', href: '/orders/connectivity-health' },
          { name: 'Promotions Stats', href: '/orders/promotions-stats' }
        ]
      },
      {
        name: 'List View',
        slug: 'list_view',
        icon: 'tabler:list-check',
        href: 'list',
        subMenu: [
          { name: 'Orders', href: '/list/orders' },
          { name: 'Clients', href: '/list/clients' }
        ]
      }
    ]
  },
  {
    name: 'Online Ordering',
    slug: 'online_ordering',
    href: 'online-ordering',
    icon: 'heroicons:cursor-arrow-ripple-20-solid',
    menu: [
      {
        name: 'Ordering widget',
        slug: 'ordering_widget',
        icon: 'lets-icons:widget-add',
        href: 'order-widget',
        subMenu: [
          { name: 'Limit Scheduled Orders', href: '/order-widget/scheduled-orders' },
          { name: 'Auto Accept Orders', href: '/order-widget/auto-accept-orders' },
          { name: 'Service Fees', href: '/order-widget/service-fees' },
          { name: 'Fulfillment Options', href: '/order-widget/fulfillment-options' },
          { name: 'ReCAPTCHA', href: '/order-widget/re-captcha' },
          { name: 'Billing details at checkout', href: '/order-widget/billing-details' },
        ]
      },
      {
        name: 'Integrations',
        slug: 'integrations',
        icon: 'hugeicons:brochure',
        href: 'integrations',
        subMenu: [
          { name: 'Catalog', href: '/integrations/catalog' },
          { name: 'Your Integrations', href: '/integrations/your-integrations' }
        ]
      }
    ]
  }
]