// ** Icon Imports
import { Icon as Iconify, IconProps } from '@iconify/react'

const Icon = ({ icon, ...rest }: IconProps) => <Iconify icon={icon} fontSize='1.5rem' {...rest} />

export default Icon
