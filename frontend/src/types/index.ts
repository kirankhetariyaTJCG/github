export interface CommonTypes {
  type?: any // For general type selection
  name?: string
  firstName?: string
  lastName?: string
  email?: string
  mobileNo?: string
  countryCode?: string
  restaurantName?: string
  description?: string
  password?: string
  confirmPassword?: string
  address?: string
  streetName?: string
  city?: string
  state?: string
  country?: string
  zipCode?: string
  companyName?: string
  discount?: number
  minimum?: number
  maximum?: number
  date?: string
  time?: string
  message?: string
}

export interface WebMasterTypes {
  webmaster_name: string
  webmaster_mail: string
  subject: string
  message: string
}

export interface EditorCommonTypes {
  title?: string
  desc?: string
  description?: string
  link?: string
  img?: any
  imgSrc?: any
  url?: string
  type?: any
  bgImg?: any
}

export interface ModelProps {
  open: boolean
  row?: any
  setOpen: (state: { open: boolean; row: any }) => void
}

export interface DialogProps {
  open: boolean
  setOpen: (open: boolean) => void
}


export interface SectionProps {
  onDelete: () => void,
  section: any,
  onCancel?: () => void
}