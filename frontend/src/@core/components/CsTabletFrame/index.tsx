// React Imports
import type { ReactElement } from 'react'

// MUI Imports
import Box from '@mui/material/Box'

const CsTabletFrame = (props: { content: ReactElement }) => {
  // Props
  const { content } = props

  return (
    <Box
      sx={{
        m: 'auto',
        width: '55rem',
        height: '35rem',
        border: `20px solid #000`,
        borderRadius: '1.5rem',
        overflow: 'auto',
      }}
    >
      {content}
    </Box>
  )
}

export default CsTabletFrame
