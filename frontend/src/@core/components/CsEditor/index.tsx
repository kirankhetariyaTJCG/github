'use client'

// Next Imports
import dynamic from 'next/dynamic'

// React Import
import { useMemo, forwardRef } from 'react'

// MUI Imports
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import FormHelperText from '@mui/material/FormHelperText'
import Box from '@mui/material/Box'

// Third Party Imports
import { Jodit } from 'jodit-react'
const JoditReact = dynamic(() => import('jodit-react'), { ssr: false })

// Helper Imports
import AppUtils from '@/Helper/AppUtils'

interface Props {
  formik?: any
  fieldName?: string
  value: string
  setValue?: (value: string) => void
  label?: string
  height?: number | string
  readOnly?: boolean
  onBlurChange?: any
  onChangeItem?: any
  isTemplate?: boolean
  toolbar?: boolean
}

const CsEditor = forwardRef((props: Props, ref: any) => {
  // Props
  const {
    formik,
    fieldName,
    value,
    setValue,
    label,
    height,
    readOnly,
    onBlurChange,
    onChangeItem,
    isTemplate,
    toolbar
  } = props

  // Hooks
  const theme = useTheme()

  const editorConfig: any = useMemo(
    () => ({
      readonly: readOnly ?? false,
      askBeforePasteHTML: false,
      askBeforePasteFromWord: false,
      defaultActionOnPaste: 'insert_clear_html',
      defaultInsertMethod: 'insert_cleared_html',
      placeholder: AppUtils.checkValue(value) ? '' : 'Write something awesome ...',
      beautyHTML: false,
      toolbar: toolbar,
      toolbarButtonSize: 'large',
      toolbarSticky: false,
      showCharsCounter: false,
      showWordsCounter: false,
      showXPathInStatusbar: false,
      uploader: {
        insertImageAsBase64URI: true
      },
      toolbarAdaptive: false,
      buttons: [
        'bold',
        'underline',
        'italic',
        '|',
        'ul',
        'ol',
        'align',
        'paragraph',
        '|',
        'undo',
        'redo',
        'preview',
        'hr',
        ...(isTemplate
          ? [
              {
                tooltip: 'Custom Fields',
                iconURL: '/assets/svg/Custom.svg',
                list: {
                  '{{customer_name}}': 'Full Name',
                  '{{customer_email}}': 'Email',
                  '{{contact_number}}': 'Mobile No',
                  '{{company_name}}': 'Company Name'
                },
                exec: (editor: any, { control }: any) => {
                  if (control?.name === '{{customer_name}}') {
                    editor.selection.insertHTML('{{customer_name}}')
                  } else if (control?.name === '{{customer_email}}') {
                    editor.selection.insertHTML('{{customer_email}}')
                  } else if (control?.name === '{{contact_number}}') {
                    editor.selection.insertHTML('{{contact_number}}')
                  } else if (control?.name === '{{company_name}}') {
                    editor.selection.insertHTML('{{company_name}}')
                  }
                }
              }
            ]
          : [])
      ],
      width: '100%',
      height: height ?? 400,
      addNewLine: false,
      defaultMode: '1',
      style: {
        backgroundColor: theme.palette.background.default,
        color: 'var(--jd-color-text)',
        caretColor: 'var(--jd-color-text)',
        '--jd-color-panel': 'var(--jd-color-panel)',
        '--jd-color-icon': 'var(--jd-color-icon)',
        '--jd-color-border': 'var(--jd-color-border)'
      },
      safePluginsList: ['about'],
      disablePlugins: 'inline-popup,select-cells,resizer'
    }),
    [height, readOnly, theme.palette.mode, isTemplate, value]
  )

  return (
    <Box>
      <Box
        component={'fieldset'}
        sx={{
          border: theme =>
            `1px solid ${
              fieldName && formik?.errors?.[fieldName] && formik?.touched?.[fieldName]
                ? theme.palette.error.main
                : theme.palette.divider
            }`,
          p: 4,
          borderRadius: '8px'
        }}
      >
        {label && (
          <Typography
            component={'legend'}
            sx={{
              px: 2,
              color: theme =>
                fieldName && formik?.errors?.[fieldName] && formik?.touched?.[fieldName]
                  ? theme.palette.error.main
                  : theme.palette.text.secondary
            }}
          >
            {label && label}
          </Typography>
        )}

        <Box
          className='Editor'
          sx={{
            '& .jodit-toolbar__box': {
              borderBottom: 'none !important',
              borderRadius: '0 !important'
            },
            '& .jodit-ui-separator': {
              borderRight: `2px solid ${theme.palette.divider} !important`
            },
            '& .jodit-toolbar-editor-collection:after': {
              bgcolor: `${theme.palette.divider} !important`
            },
            '& > div > div': {
              border: 'none !important',
              borderRadius: '0 !important',
              bgcolor: `${theme.palette.background.default} !important`
            },
            '& .jodit-ui-group': {
              bgcolor:
                theme.palette.mode === 'dark' ? theme.palette.background.paper : theme.palette.secondary.lighterOpacity,
              '& .jodit-toolbar-button__button': {
                '& .jodit-icon': {
                  fill: theme.palette.text.primary
                }
              },
              '& .jodit-toolbar-button__trigger': {
                fill: theme.palette.text.primary
              },
              '& .jodit-toolbar-button__button:hover': {
                '& .jodit-icon': {
                  fill: theme.palette.background.default
                },
                bgcolor: theme => theme.palette.primary.main
              },
              '& .jodit-toolbar-button__trigger:hover': {
                fill: theme.palette.background.default,
                bgcolor: theme => theme.palette.primary.main
              }
            }
          }}
        >
          <JoditReact
            ref={ref}
            value={value}
            config={editorConfig}
            onBlur={
              onBlurChange
                ? onBlurChange
                : newContent => {
                    if (setValue) {
                      setValue(newContent)
                    }

                    if (formik) {
                      const textValue = Jodit.modules.Helpers.stripTags(newContent)
                      formik.setFieldValue(fieldName, textValue)
                    }
                  }
            }
            onChange={
              onChangeItem ||
              (newContent => {
                const textValue = Jodit.modules.Helpers.stripTags(newContent)

                if (formik && fieldName) {
                  if (formik?.touched?.[fieldName] && textValue?.trim() === '') {
                    formik?.setFieldError([fieldName], `${label} is Required`)
                  } else {
                    formik?.setFieldError([fieldName], false)
                  }
                }
              })
            }
          />
        </Box>
      </Box>
      {formik && fieldName && formik?.errors?.[fieldName] && formik?.touched?.[fieldName] && (
        <FormHelperText sx={{ ml: 1, color: theme => theme.palette.error.main }}>
          {formik?.errors?.[fieldName]}
        </FormHelperText>
      )}
    </Box>
  )
})

export default CsEditor
