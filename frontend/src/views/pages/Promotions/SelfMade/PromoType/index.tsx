// MUI Imports
import { Box } from '@/Helper/MUIImports'

// Third Party Imports
import type { FormikProps } from 'formik'

// Custom Imports
import Step2 from '../Steps/Step2'
import DiscountOnSelectedItems from './DiscountOnSelectedItems'

// Types Imports
import type { Step2Values } from '../AddEditPromo'
import { useEffect } from 'react'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'

interface Props {
    promo_type: number
    step2Formik: FormikProps<Step2Values>
    row?: any
}

const PromoType = (props: Props) => {

    // Props
    const { promo_type, step2Formik, row } = props

    useEffect(() => {
        if (AppUtils.checkValue(row) && Object?.keys(row)?.length > 0) {
            step2Formik.setFieldValue('is_minimum', AppUtils.checkValue(row?.usage_maximum) && row?.usage_maximum !== 0)
        }

        if (!AppUtils.checkValue(row) && Object?.keys(row)?.length === 0 && (promo_type === 1 || promo_type === 3)) {
            step2Formik.setFieldValue('is_minimum', true)
        }
    }, [])


    return (
        <Box>
            {(promo_type === 1 || promo_type === 3) && <Step2 formik={step2Formik} />}
            {(promo_type === 2 || promo_type === 4) && <DiscountOnSelectedItems formik={step2Formik} promo_type={promo_type} />}
        </Box>
    )
}

export default PromoType