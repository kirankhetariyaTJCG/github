'use client'

// React Imports
import { useMemo } from 'react'

// Next Imports
import { usePathname } from 'next/navigation'

// MUI Imports
import { deepmerge } from '@mui/utils'
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendTheme,
  lighten,
  darken
} from '@mui/material/styles'
import { GlobalStyles } from '@mui/material'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import CssBaseline from '@mui/material/CssBaseline'
import type { } from '@mui/material/themeCssVarsAugmentation' //! Do not remove this import otherwise you will get type errors while making a production build
import type { } from '@mui/lab/themeAugmentation' //! Do not remove this import otherwise you will get type errors while making a production build

// Third-party Imports
import { useMedia } from 'react-use'

// Type Imports
import type { ChildrenType, SystemMode } from '@core/types'

// Component Imports
import ModeChanger from './ModeChanger'

// Config Imports
import themeConfig from '@configs/themeConfig'

// Hook Imports
import { useSettings } from '@core/hooks/useSettings'

// Core Theme Imports
import defaultCoreTheme from '@core/theme'

type Props = ChildrenType & {
  systemMode: SystemMode
}

const ThemeProvider = (props: Props) => {
  // Props
  const { children, systemMode } = props

  // Hooks
  const { settings } = useSettings()
  const pathname = usePathname()
  const isDark = useMedia('(prefers-color-scheme: dark)', false)

  // Vars
  const isServer = typeof window === 'undefined'
  let currentMode: SystemMode

  if (isServer) {
    currentMode = systemMode
  } else {
    if (settings.mode === 'system') {
      currentMode = isDark ? 'dark' : 'light'
    } else {
      currentMode = settings.mode as SystemMode
    }
  }

  // Merge the primary color scheme override with the core theme
  const theme = useMemo(() => {
    const newColorScheme = {
      colorSchemes: {
        light: {
          palette: {
            primary: {
              main: settings.primaryColor,
              light: lighten(settings.primaryColor as string, 0.2),
              dark: darken(settings.primaryColor as string, 0.1)
            }
          }
        },
        dark: {
          palette: {
            primary: {
              main: settings.primaryColor,
              light: lighten(settings.primaryColor as string, 0.2),
              dark: darken(settings.primaryColor as string, 0.1)
            }
          }
        }
      }
    }

    const coreTheme = deepmerge(defaultCoreTheme(settings, currentMode), newColorScheme)

    return extendTheme(coreTheme)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings.primaryColor, settings.skin, currentMode])

  const globalStyles = {
    '*::-webkit-scrollbar': {
      width: pathname === '/website-editor' ? 0 : 6
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: 20,
      background: 'transparent'
    },
    '*::-webkit-scrollbar-thumb': {
      background: systemMode === 'light' ? 'rgba(191, 191, 213, 0.9)' : 'rgba(87, 89, 108, 0.7)',
      borderRadius: '6px'
    }
  }

  return (
    <AppRouterCacheProvider
      options={{
        prepend: true
      }}
    >
      <CssVarsProvider
        theme={theme}
        defaultMode={systemMode}
        modeStorageKey={`${themeConfig.templateName.toLowerCase().split(' ').join('-')}-mui-template-mode`}
      >
        <>
          <GlobalStyles styles={globalStyles} />
          <ModeChanger />
          <CssBaseline />
          {children}
        </>
      </CssVarsProvider>
    </AppRouterCacheProvider>
  )
}

export default ThemeProvider
