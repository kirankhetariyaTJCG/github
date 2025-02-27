// MUI Imports
import { Dialog, DialogTitle, DialogContent, DialogActions, LoadingButton } from '@/Helper/MUIImports'

import Typography from '@mui/material/Typography'

// Custom Imports
import CsEditor from '@/@core/components/CsEditor'

// Types Imports
import type { DialogProps } from '@/types'

const TemplateDialog = (props: DialogProps & { setTerms: (terms: string) => void, label: string }) => {
  // Props
  const { open, setOpen, setTerms, label } = props

  const newTerms = `
<h2>${label}</h2>
<p><strong>Last Updated:</strong> {date}</p>
<h3>1. Introduction</h3>
<p>
    This privacy policy outlines how <strong>{restaurant_name}</strong> 
    we, collects, uses, and protects any information that 
    you provide us when you use our services or visit our premises.
</p>
<h3>2. Information We Collect</h3>
<p>We may collect the following personal information:</p>
<ul>
    <li><strong>Restaurant Name:</strong> {restaurant_name}</li>
    <li><strong>Company Name:</strong> {company_name}</li>
    <li><strong>Address:</strong> {address}</li>
    <li><strong>Contact Number:</strong> {phone}</li>
    <li><strong>Additional Details:</strong> such as reservation information, payment methods, and special preferences.</li>
</ul>
<h3>3. How We Use Your Information</h3>
<p>We use your personal information for purposes including but not limited to:</p>
<ul>
    <li>Processing reservations and orders</li>
    <li>Improving our services and menu offerings</li>
    <li>Sending promotional offers (if you have consented)</li>
    <li>Responding to feedback or inquiries</li>
</ul>
<h3>4. Information Sharing</h3>
<p>
    We do not share your personal information with third parties except 
    where required by law, with trusted service providers, or with your consent.
</p>
<h3>5. Data Security</h3>
<p>
    We are committed to ensuring the security of your information. We have 
    implemented suitable physical, electronic, and managerial procedures to 
    protect and secure the information we collect.
</p>
<h3>6. Your Rights</h3>
<p>You have the right to:</p>
<ul>
    <li>Request access to your personal information</li>
    <li>Request corrections to your information</li>
    <li>Request deletion under certain circumstances</li>
</ul>
<h3>7. Contact Us</h3>
<p>
    If you have any questions about this privacy policy or wish to exercise 
    any of your rights, please contact us at:
</p>
<ul>
    <li><strong>Email:</strong> {email}</li>
    <li><strong>Phone:</strong> {phone}</li>
    <li><strong>Address:</strong> {address}</li>
</ul>
<h3>8. Updates to This Policy</h3>
<p>
    We may update this policy from time to time. Please review it periodically 
    for any changes.
</p>
`

  // State
  const text =
    '<p>The template is not legal advice and by using it you agree to this disclaimer. The materials below are for informational purposes only and do not constitute advertising, a solicitation or legal advice. You should consult independent legal advice before publishing these agreements. You should read the generated information with care and modify, delete or add all and any areas as necessary. Use of, access to or transmission of such materials and information or any of the links contained herein is not intended to create, and receipt thereof does not constitute formation of, an attorney-client relationship between us and the user or browser. You should not rely upon this information for any purpose without seeking legal advice from a licensed attorney in your state or province. The information contained is provided only as general information and may or may not reflect the most current legal developments; accordingly, information is not promised or guaranteed to be correct or complete. We expressly disclaim all liability in respect to any actions taken or not taken based on any or all of the contents of this website. Further, we do not necessarily endorse and is not responsible for any third-party content that may be accessed through this information.</p>'

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}`, p: 4 }}>
        <Typography sx={{ fontWeight: 700, fontSize: '1.25rem' }}>Create from template</Typography>
      </DialogTitle>
      <DialogContent sx={{ p: '1rem !important' }}>
        <Typography sx={{ mb: 2 }}>
          The template is not legal advice. By using the template you confirm that you have read and agreed to this
          disclaimer:
        </Typography>
        <CsEditor fieldName='name' value={text} readOnly={true} height={200} toolbar={false} />
      </DialogContent>
      <DialogActions>
        <LoadingButton variant='outlined' onClick={() => setOpen(false)}>
          Cancel
        </LoadingButton>
        <LoadingButton
          variant='contained'
          onClick={() => {
            const value = newTerms
              .replace(/{date}/g, "2024-01-01")
              .replace(/{restaurant_name}/g, "Pizzeria")
              .replace(/{company_name}/g, "TJCG Pvt Ltd")
              .replace(/{address}/g, "150ft Ring Road, Rajkot, Gujarat")
              .replace(/{phone}/g, "+1234567890")
              .replace(/{email}/g, "pizzeria@gmail.com");
            setTerms(value)
            setOpen(false)
          }}
        >
          Create
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}

export default TemplateDialog
