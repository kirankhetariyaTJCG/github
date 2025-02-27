// Helper Imports
import AppUtils from '../AppUtils'

export const SECTION_NAME = {
  LOGO: 'LOGO',
  NAVIGATION: 'NAVIGATION',
  STAGING: 'STAGING',
  PROMOTION: 'PROMOTION',
  ABOUT: 'ABOUT',
  OPENING_HOURS: 'OPENING_HOURS',
  ANNOUNCEMENT: 'ANNOUNCEMENT',
  CONTACT: 'CONTACT',
  GALLERY: 'GALLERY',
  JOBS: 'JOBS',
  AWARDS: 'AWARDS',
  PORTALS: 'PORTALS',
  SOCIAL_MEDIA: 'SOCIAL_MEDIA',
  CERTIFICATES: 'CERTIFICATES',
  IMPORTANT_ANNOUNCEMENT: 'IMPORTANT_ANNOUNCEMENT',
  VIDEO: 'VIDEO',
  ARTICLE: 'ARTICLE',
  FOOTER: 'FOOTER',
  DELIVERY_ZONE: 'DELIVERY_ZONE'
}

export const DEFAULT_SECTIONS = [SECTION_NAME.LOGO, SECTION_NAME.NAVIGATION, SECTION_NAME.STAGING]

export const TITLE_STYLE = {
  fontSize: { xs: '1.5rem', md: '2.875rem' },
  fontWeight: 600
}

export const DESCRIPTION_STYLE = {
  fontSize: { xs: '1rem', md: '1.2rem' },
  fontWeight: 500
}

export const DEFAULT_WEBSITE_SECTION_DATA = {
  [SECTION_NAME.LOGO]: {
    title: 'Logo',
    logoType: 1,
    restaurantName: 'Pizzeria',
    restaurantLogo: null,
    style: {
      titleSx: TITLE_STYLE,
      descriptionSx: DESCRIPTION_STYLE
    },
    isActive: true,
    isMultiple: false
  },
  [SECTION_NAME.NAVIGATION]: {
    title: 'Navigation',
    pages: [
      { title: 'Menu', link: '/menu', type: 2 },
      { title: 'Food Delivery', link: '/food-delivery', type: 3 },
      { title: 'Special Offers', link: '/special-offers', type: 4 },
      { title: 'Contact Us', link: '/contact-us', type: 5 }
    ],
    style: {
      titleSx: TITLE_STYLE,
      descriptionSx: DESCRIPTION_STYLE
    },
    isActive: true,
    isMultiple: false
  },
  [SECTION_NAME.STAGING]: {
    title: 'Staging',
    sections: [
      {
        bgImg: '/images/preview/hero_section.png',
        title: 'Revolutionize Your Restaurant with Pizzaholic',
        desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
        _id: AppUtils.randomId(),
        pageTitle: 'Home',
        isOpen: false
      },
      {
        bgImg: '/images/preview/hero_section.png',
        title: 'Menu of Pizzeria',
        desc: 'Custom Food Delivery in Amsterdam',
        _id: AppUtils.randomId(),
        pageTitle: 'Menu',
        isOpen: false
      },
      {
        bgImg: '/images/preview/hero_section.png',
        title: 'Delicious Takeaway & Delivery',
        desc: 'Savor the best meals from our best Menu, it delivered right to your door.',
        _id: AppUtils.randomId(),
        pageTitle: 'Food Delivery',
        isOpen: false
      },
      {
        bgImg: '/images/preview/hero_section.png',
        title: 'Special Offers',
        desc: "Enjoy amazing discounts and special offers on your favorite dishes. Grab them before they're gone!",
        _id: AppUtils.randomId(),
        pageTitle: 'Special Offers',
        isOpen: false
      },
      {
        bgImg: '/images/preview/hero_section.png',
        title: "Let's Get in Touch!",
        desc: 'Have questions or need assistance? We’re here to help! Reach out to us for any inquiries, feedback, or support, and we’ll make sure your experience is as smooth as your next meal.',
        _id: AppUtils.randomId(),
        pageTitle: 'Contact Us',
        isOpen: false
      }
    ],
    style: {
      titleSx: TITLE_STYLE,
      descriptionSx: DESCRIPTION_STYLE
    },
    isActive: true,
    isMultiple: false
  },
  [SECTION_NAME.PROMOTION]: {
    title: 'Special Offers',
    description: '',
    sectios: [],
    style: {
      titleSx: TITLE_STYLE,
      descriptionSx: DESCRIPTION_STYLE
    },
    isActive: true,
    isMultiple: false
  },
  [SECTION_NAME.ABOUT]: {
    title: 'About Us',
    description: '',
    imgSrc: '/images/preview/pizza.jpg',
    style: {
      titleSx: TITLE_STYLE,
      descriptionSx: DESCRIPTION_STYLE
    },
    isActive: true,
    isMultiple: false
  },
  [SECTION_NAME.OPENING_HOURS]: {
    title: 'Opening Hours',
    description: '',
    imgSrc: '/images/preview/pizza.jpg',
    style: {
      titleSx: TITLE_STYLE,
      descriptionSx: DESCRIPTION_STYLE
    },
    isActive: true,
    isMultiple: false
  },
  [SECTION_NAME.ANNOUNCEMENT]: {
    title: 'Announcement',
    description: '',
    imgSrc: '/images/preview/pizza.jpg',
    sections: [],
    style: {
      titleSx: TITLE_STYLE,
      descriptionSx: DESCRIPTION_STYLE
    },
    isActive: true,
    isMultiple: false
  },
  [SECTION_NAME.CONTACT]: {
    title: 'Contact Us',
    description: '',
    imgSrc: '/images/preview/pizza.jpg',
    style: {
      titleSx: TITLE_STYLE,
      descriptionSx: DESCRIPTION_STYLE
    },
    isActive: true,
    isMultiple: false
  },
  [SECTION_NAME.GALLERY]: {
    title: 'Gallery',
    description: '',
    galleryType: 1,
    images: [],
    style: {
      titleSx: TITLE_STYLE,
      descriptionSx: DESCRIPTION_STYLE
    },
    isActive: true,
    isMultiple: false
  },
  [SECTION_NAME.JOBS]: {
    title: 'Jobs',
    description: '',
    imgSrc: '/images/preview/pizza.jpg',
    sections: [],
    style: { titleSx: TITLE_STYLE },
    isActive: true,
    isMultiple: false
  },
  [SECTION_NAME.AWARDS]: {
    title: 'Awards',
    description: '',
    imgSrc: '/images/preview/pizza.jpg',
    sections: [],
    style: {
      titleSx: TITLE_STYLE,
      descriptionSx: DESCRIPTION_STYLE
    },
    isActive: true,
    isMultiple: false
  },
  [SECTION_NAME.PORTALS]: {
    title: 'Review Portals',
    description: '',
    imgSrc: '/images/preview/pizza.jpg',
    sections: [],
    style: {
      titleSx: TITLE_STYLE,
      descriptionSx: DESCRIPTION_STYLE
    },
    isActive: true,
    isMultiple: false
  },
  [SECTION_NAME.SOCIAL_MEDIA]: {
    title: 'Social Media',
    description: '',
    imgSrc: '/images/preview/pizza.jpg',
    instagramLink: '',
    pinterestLink: '',
    youtubeLink: '',
    facebookLink: '',
    twitterLink: '',
    tiktokLink: '',
    style: {
      titleSx: TITLE_STYLE,
      descriptionSx: DESCRIPTION_STYLE
    },
    isActive: true,
    isMultiple: false
  },
  [SECTION_NAME.CERTIFICATES]: {
    title: 'Certificates',
    description: '',
    imgSrc: '/images/preview/pizza.jpg',
    sections: [],
    style: {
      titleSx: TITLE_STYLE,
      descriptionSx: DESCRIPTION_STYLE
    },
    isActive: true,
    isMultiple: false
  },
  [SECTION_NAME.IMPORTANT_ANNOUNCEMENT]: {
    title: 'Important Announcement',
    description: '',
    imgSrc: '/images/preview/pizza.jpg',
    style: {
      titleSx: TITLE_STYLE,
      descriptionSx: DESCRIPTION_STYLE
    },
    isActive: true,
    isMultiple: false
  },
  [SECTION_NAME.VIDEO]: {
    title: 'Videos',
    description: '',
    imgSrc: '/images/preview/pizza.jpg',
    sections: [],
    style: {
      titleSx: TITLE_STYLE,
      descriptionSx: DESCRIPTION_STYLE
    },
    isActive: true,
    isMultiple: false
  },
  [SECTION_NAME.ARTICLE]: {
    title: 'Articles',
    description: '',
    imgSrc: '/images/preview/pizza.jpg',
    sections: [],
    style: {
      titleSx: TITLE_STYLE,
      descriptionSx: DESCRIPTION_STYLE
    },
    isActive: true,
    isMultiple: false
  },
  [SECTION_NAME.FOOTER]: {
    title: 'footer',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
    getInTouchDesc: '',
    links: [
      { checked: false, value: '', label: 'Facebook' },
      { checked: false, value: '', label: 'Instagram' },
      { checked: false, value: '', label: 'Twitter' },
      { checked: false, value: '', label: 'LinkedIn' }
    ],
    isCopyRight: true,
    copyRight: 'Copyright © 2022 Foodhut.',
    style: {
      titleSx: TITLE_STYLE,
      descriptionSx: DESCRIPTION_STYLE
    },
    isActive: true,
    isMultiple: false
  },
  [SECTION_NAME.DELIVERY_ZONE]: {
    id: AppUtils.randomId(),
    type: 'DELIVERY_ZONE',
    title: 'Delivery Zones',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
    data: [],
    style: {
      titleSx: { fontSize: { xs: '1.5rem', md: '2.875rem' }, fontWeight: 600 },
      descriptionSx: { fontSize: { xs: '1rem', md: '1.2rem' }, fontWeight: 500 }
    },
    isActive: false,
    isOpen: false,
    isDefault: false,
    isMultiple: false
  }
}

export const sections = [
  {
    id: AppUtils.randomId(),
    type: 'LOGO',
    title: 'Logo', logoType: 1, restaurantName: 'Pizzeria', restaurantLogo: null,
    style: {
      titleSx: { fontSize: { xs: '1.5rem', md: '2.875rem' }, fontWeight: 600 },
      descriptionSx: { fontSize: { xs: '1rem', md: '1.2rem' }, fontWeight: 500 }
    },
    isActive: false,
    isOpen: false,
    isDefault: true,
    isMultiple: false
  },
  {
    id: AppUtils.randomId(),
    type: 'NAVIGATION',
    title: 'Navigation',
    pages: [
      { title: 'Menu', link: '/menu', type: 2 },
      { title: 'Food Delivery', link: '/food-delivery', type: 3 },
      { title: 'Special Offers', link: '/special-offers', type: 4 },
      { title: 'Contact Us', link: '/contact-us', type: 5 }
    ],
    style: {
      titleSx: { fontSize: { xs: '1.5rem', md: '2.875rem' }, fontWeight: 600 },
      descriptionSx: { fontSize: { xs: '1rem', md: '1.2rem' }, fontWeight: 500 }
    },
    isActive: false,
    isOpen: false,
    isDefault: true,
    isMultiple: false
  },
  {
    id: AppUtils.randomId(),
    type: 'STAGING',
    title: 'Staging',
    sections: [
      {
        bgImg: '/images/preview/hero_section.png',
        title: 'Revolutionize Your Restaurant with Pizzaholic',
        desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
        _id: 'ojquj',
        pageTitle: 'Home',
        isOpen: false
      },
      {
        bgImg: '/images/preview/hero_section.png',
        title: 'Menu of Pizzeria',
        desc: 'Custom Food Delivery in Amsterdam',
        _id: 'ebabp',
        pageTitle: 'Menu',
        isOpen: false
      },
      {
        bgImg: '/images/preview/hero_section.png',
        title: 'Delicious Takeaway & Delivery',
        desc: 'Savor the best meals from our best Menu, it delivered right to your door.',
        _id: 'br9d7',
        pageTitle: 'Food Delivery',
        isOpen: false
      },
      {
        bgImg: '/images/preview/hero_section.png',
        title: 'Special Offers',
        desc: "Enjoy amazing discounts and special offers on your favorite dishes. Grab them before they're gone!",
        _id: 'rigjr',
        pageTitle: 'Special Offers',
        isOpen: false
      },
      {
        bgImg: '/images/preview/hero_section.png',
        title: "Let's Get in Touch!",
        desc: 'Have questions or need assistance? We’re here to help! Reach out to us for any inquiries, feedback, or support, and we’ll make sure your experience is as smooth as your next meal.',
        _id: '7xvds',
        pageTitle: 'Contact Us',
        isOpen: false
      },
      {
        bgImg: '/images/preview/hero_section.png',
        title: "Pizzeria Reservations",
        desc: 'Book a table and experience delicious Pizza, Burger, Sandwiches, Custom in Amsterdam',
        _id: '7xada',
        pageTitle: 'Table Reservation',
        isOpen: false
      },
      {
        bgImg: '/images/preview/hero_section.png',
        title: "Order Ahead",
        desc: 'And Cut The Waiting Time To Mere Seconds',
        _id: '1afda',
        pageTitle: 'Order Ahead',
        isOpen: false
      },
    ],
    style: {
      titleSx: { fontSize: { xs: '1.5rem', md: '2.875rem' }, fontWeight: 600 },
      descriptionSx: { fontSize: { xs: '1rem', md: '1.2rem' }, fontWeight: 500 }
    },
    isActive: false,
    isOpen: false,
    isDefault: true,
    isMultiple: false
  },
  {
    id: AppUtils.randomId(),
    type: 'FOOTER',
    title: 'Footer',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
    getInTouchDesc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
    links: [
      { checked: true, value: '', label: 'Facebook' },
      { checked: true, value: '', label: 'Instagram' },
      { checked: true, value: '', label: 'Twitter' },
      { checked: true, value: '', label: 'LinkedIn' }
    ],
    isCopyRight: true,
    copyRight: '2022 Foodhut.',
    style: {
      titleSx: { fontSize: { xs: '1.5rem', md: '2.875rem' }, fontWeight: 600 },
      descriptionSx: { fontSize: { xs: '1rem', md: '1.2rem' }, fontWeight: 500 }
    },
    isActive: false,
    isOpen: false,
    isDefault: true,
    isMultiple: false
  },
  {
    id: AppUtils.randomId(),
    type: 'DELIVERY_ZONE',
    title: 'Delivery Zones',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
    data: [],
    style: {
      titleSx: { fontSize: { xs: '1.5rem', md: '2.875rem' }, fontWeight: 600 },
      descriptionSx: { fontSize: { xs: '1rem', md: '1.2rem' }, fontWeight: 500 }
    },
    isActive: false,
    isOpen: false,
    isDefault: false,
    isMultiple: false
  }

]