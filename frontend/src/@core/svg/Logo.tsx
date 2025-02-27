// React Imports
import type { SVGAttributes } from 'react'

const Logo = (props: SVGAttributes<SVGElement>) => {
  return (
    <svg width='30' height='30' viewBox='0 0 453 444' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <g clipPath='url(#clip0_10_11)'>
        <g clipPath='url(#clip1_10_11)'>
          <rect width='453' height='444' rx='100' fill='#F76343' />
          <path
            d='M0 197.267C0 105.643 0 59.8306 27.7878 30.8234C28.7778 29.79 29.79 28.7778 30.8234 27.7878C59.8306 0 105.643 0 197.267 0H253C347.281 0 394.421 0 423.711 29.2893C453 58.5786 453 105.719 453 200V331.318C453 357.758 435.453 380.987 410.02 388.215V388.215C407.011 389.07 403.94 389.686 400.834 390.055L334.182 397.981C323.601 399.239 318.31 399.868 312.993 399.933C307.676 399.997 302.372 399.496 291.764 398.495L196.5 389.5C128.214 382.744 85.9371 369.895 33.1241 302.316C18.4996 283.602 11.1873 274.246 5.74938 258.909C5.576 258.42 5.32346 257.687 5.15898 257.195C0 241.762 0 226.931 0 197.267V197.267Z'
            fill='url(#paint0_linear_10_11)'
          />
          <path
            d='M296.957 114.364V478H209.244V196.395H207.114L125.793 246.111V170.116L215.459 114.364H296.957Z'
            fill='white'
          />
        </g>
      </g>
      <defs>
        <linearGradient
          id='paint0_linear_10_11'
          x1='411.765'
          y1='44.1'
          x2='117.759'
          y2='410.626'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#E99A8A' />
          <stop offset='0.635407' stopColor='#FF4118' />
          <stop offset='1' stopColor='#FF5733' />
        </linearGradient>
        <clipPath id='clip0_10_11'>
          <rect width='453' height='444' fill='white' />
        </clipPath>
        <clipPath id='clip1_10_11'>
          <rect width='453' height='444' fill='white' />
        </clipPath>
      </defs>
    </svg>
  )
}

export default Logo
