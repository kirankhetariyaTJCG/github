// React Imports
import { memo, useMemo } from 'react'

// Third Party Imports
import { GoogleMap, Marker } from '@react-google-maps/api'

const svgIcon = encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><mask id="lineMdMapMarkerFilledLoop0"><g fill="none" fill-opacity="0" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path fill="#fff" stroke-dasharray="48" stroke-dashoffset="48" d="M12 20.5c0 0 -6 -7 -6 -11.5c0 -3.31 2.69 -6 6 -6c3.31 0 6 2.69 6 6c0 4.5 -6 11.5 -6 11.5Z"><animate fill="freeze" attributeName="fill-opacity" begin="0.7s" dur="0.5s" values="0;1"/><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="48;0"/><animateTransform attributeName="transform" dur="3s" keyTimes="0;0.3;0.4;0.54;0.6;0.68;0.7;1" repeatCount="indefinite" type="rotate" values="0 12 20.5;0 12 20.5;-8 12 20.5;0 12 20.5;5 12 20.5;-2 12 20.5;0 12 20.5;0 12 20.5"/></path><circle cx="12" cy="9" r="2.5" fill="#000" stroke="none"><animate fill="freeze" attributeName="fill-opacity" begin="1.2s" dur="0.5s" values="0;1"/></circle></g></mask><rect width="24" height="24" fill="#FF4D49" mask="url(#lineMdMapMarkerFilledLoop0)"/></svg>
`)
const iconUrl = `data:image/svg+xml;charset=UTF-8,${svgIcon}`

const CsMap = props => {
  // Props
  const { options, draggable, onMarkerDragEnd, onLoad, centerCords, zoom, MapContent } = props

  // ** Hooks
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), [])

  return (
    <>
        <GoogleMap
          center={centerCords}
          zoom={zoom ? zoom : 3}
          mapContainerStyle={containerStyle}
          options={options}
          onLoad={onLoad}
        >
          {MapContent}
          <Marker position={centerCords} draggable={draggable} onDragEnd={onMarkerDragEnd} icon={iconUrl} />
        </GoogleMap>
    </>
  )
}

export default memo(CsMap)
