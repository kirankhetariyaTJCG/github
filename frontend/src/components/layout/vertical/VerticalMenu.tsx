// MUI Imports
import { useTheme } from '@mui/material/styles'
import { Box, Typography } from '@/Helper/MUIImports'

// Third-party Imports
import PerfectScrollbar from 'react-perfect-scrollbar'

// Type Imports
import type { VerticalMenuContextProps } from '@menu/components/vertical-menu/Menu'

// Component Imports
import { Menu, SubMenu, MenuItem, MenuSection } from '@menu/vertical-menu'

// Hook Imports
import { useSettings } from '@core/hooks/useSettings'
import useVerticalNav from '@menu/hooks/useVerticalNav'

// Styled Component Imports
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'

// Data Imports
import { sidebar, SidebarItem } from '@/data/sidebarData'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Style Imports
import menuItemStyles from '@core/styles/vertical/menuItemStyles'
import menuSectionStyles from '@core/styles/vertical/menuSectionStyles'

// Helper Imports
import Storage from '@/Helper/Storage'
import Constants from '@/Helper/Constants'

type RenderExpandIconProps = {
  open?: boolean
  transitionDuration?: VerticalMenuContextProps['transitionDuration']
}

type Props = {
  scrollMenu: (container: any, isPerfectScrollbar: boolean) => void
}

const RenderExpandIcon = ({ open, transitionDuration }: RenderExpandIconProps) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <i className='ri-arrow-right-s-line' />
  </StyledVerticalNavExpandIcon>
)

const VerticalMenu = ({ scrollMenu }: Props) => {
  // Hooks
  const theme = useTheme()
  const verticalNavOptions = useVerticalNav()
  const { settings } = useSettings()
  const { isBreakpointReached } = useVerticalNav()
  const permissions: any = Storage.getDefaultCookie(Constants.PERMISSIONS) ?? []

  const filterSidebarByAccess = (permissions: any[]) => {
    const permissionMap = permissions.reduce((acc, perm) => {
      acc[perm.slug] = perm.is_access;
      return acc;
    }, {} as { [key: string]: boolean });

    const filterMenu = (menu: any) =>
      menu.map((item: any) => {
        if (permissionMap[item.slug]) {
          return { ...item, subMenu: item.subMenu || [] }
        }

        return { ...item, subMenu: item.subMenu ? filterMenu(item.subMenu) : undefined }
      }).filter((item: any) => permissionMap[item.slug] || (item.subMenu && item.subMenu.length > 0));

    return sidebar.map((section) => ({ ...section, menu: filterMenu(section.menu) })).filter((section) => section.menu.length > 0)
  }

  // Vars
  const filteredSidebar = filterSidebarByAccess(permissions);
  const { transitionDuration } = verticalNavOptions
  const ScrollWrapper = isBreakpointReached ? 'div' : PerfectScrollbar

  return (
    // eslint-disable-next-line lines-around-comment
    /* Custom scrollbar instead of browser scroll, remove if you want browser scroll only */
    <ScrollWrapper
      {...(isBreakpointReached
        ? {
          className: 'bs-full overflow-y-auto overflow-x-hidden',
          onScroll: container => scrollMenu(container, false)
        }
        : {
          options: { wheelPropagation: false, suppressScrollX: true },
          onScrollY: container => scrollMenu(container, true)
        })}
    >
      {/* Incase you also want to scroll NavHeader to scroll with Vertical Menu, remove NavHeader from above and paste it below this comment */}
      {/* Vertical Menu */}
      <Menu
        popoutMenuOffset={{ mainAxis: 17 }}
        menuItemStyles={menuItemStyles(verticalNavOptions, theme, settings)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='ri-circle-fill' /> }}
        menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
      >
        {Array.isArray(filteredSidebar) &&
          filteredSidebar.length > 0 &&
          filteredSidebar.map((section: any, index: number) => (
            <MenuSection key={index} label={section?.name}>
              {Array.isArray(section?.menu) &&
                section?.menu?.length > 0 &&
                section?.menu?.map((menu: any, menuIndex: number) => (
                  <Box key={menuIndex}>
                    {Array.isArray(menu?.subMenu) && menu?.subMenu?.length > 0 ? (
                      <SubMenu
                        label={
                          <Typography noWrap sx={{ color: '#fff' }}>
                            {menu?.name}
                          </Typography>
                        }
                        icon={<Icon style={{ color: 'rgba(255, 255, 255, 0.7)' }} icon={menu?.icon} />}
                      >
                        {Array.isArray(menu?.subMenu) &&
                          menu?.subMenu?.length > 0 &&
                          menu?.subMenu?.map((subMenuItem: any, subMenuIndex: number) => {
                            return (
                              <MenuItem key={subMenuIndex} href={`/${section?.href}${subMenuItem?.href}`}>
                                <Typography noWrap sx={{ color: '#fff' }}>
                                  {subMenuItem?.name}
                                </Typography>
                              </MenuItem>
                            )
                          })}
                      </SubMenu>
                    ) : (
                      <MenuItem
                        href={`/${section?.href}${menu?.href}`}
                        icon={<Icon style={{ color: 'rgba(255, 255, 255, 0.7)' }} icon={menu?.icon} />}
                        key={menuIndex}
                      >
                        {menu?.name}
                      </MenuItem>
                    )}
                  </Box>
                ))}
            </MenuSection>
          ))}
      </Menu>
    </ScrollWrapper>
  )
}

export default VerticalMenu
