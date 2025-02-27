// MUI Imports
import { Box, Dialog, DialogTitle, DialogContent, IconButton, Typography } from '@/Helper/MUIImports';

// Third Party Imports
import { useSelector } from 'react-redux';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import { toast } from 'react-toastify';

// Icon Imports
import Icon from '@/@core/components/Icon';

// Type Imports
import { DialogProps } from '@/types';

// Styles Imports
import 'prismjs/themes/prism.css';

const ButtonsCode = (props: DialogProps) => {
    // Props
    const { open, setOpen } = props;

    // Hooks
    const { restaurant } = useSelector((state: any) => state.restaurant)

    const code = `<!-- If you want to customize the button, you can modify or remove the class attribute inside the <span> tag -->
    <span class="roos-button" data-rid="${restaurant?._id}">See MENU & Order</span>
    ${restaurant?.has_table_reservation
            ? `<span class="roos-button reservation" data-rid="${restaurant?._id}" data-is-table="true">Table Reservation</span>`
            : ""}
    <script src="https://1roos.com/sdk/sdk.js" defer async></script>`;


    const copyCode = () => {
        navigator.clipboard.writeText(code)
        toast.success('Code copied to clipboard successfully!')
    }

    return (
        <Dialog open={open} maxWidth="md">
            <DialogTitle
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: (theme) => `0.0625rem solid ${theme.palette.divider}`,
                    px: 4,
                    py: 2,
                }}
            >
                <Typography sx={{ fontSize: '1.2rem', fontWeight: 600 }}>
                    Generated HTML Code
                </Typography>
                <IconButton onClick={() => setOpen(false)} sx={{ fontSize: 25 }}>
                    <Icon icon={"ic:round-close"} />
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{ p: 4, pt: '1rem !important', width: { sm: '40rem' } }}>
                <Typography sx={{ fontSize: '1.2rem', fontWeight: 600, mb: 4 }}>Here is your customized HTML code snippet</Typography>
                <Box
                    sx={{
                        border: theme => `1px solid ${theme.palette.divider}`,
                        borderRadius: '8px',
                        overflow: 'hidden'
                    }}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            bgcolor: theme => theme.palette.secondary.lightOpacity,
                            p: 2
                        }}
                    >
                        <Typography sx={{ fontWeight: 500, pl: 2 }}>HTML</Typography>
                        <IconButton onClick={copyCode}>
                            <Icon icon="mdi:content-copy" />
                        </IconButton>
                    </Box>
                    <Editor
                        readOnly={true}
                        value={code}
                        onValueChange={(newCode) => { }}
                        highlight={(code) => highlight(code, languages.markup, 'html')}
                        padding={10}
                        style={{ fontFamily: 'monospace', fontSize: 16, backgroundColor: '#f5f5f5' }}
                    />
                </Box>
                <Typography sx={{ mt: 4 }}>
                    {"You can customize the appearance of the button by modifying, adding, or removing the class or style attributes in the <span> tag. This allows you to tailor the design to match your preferences."}
                </Typography>
            </DialogContent>
        </Dialog>
    );
};

export default ButtonsCode;