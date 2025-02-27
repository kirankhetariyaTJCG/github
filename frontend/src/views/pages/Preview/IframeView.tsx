// MUI Imports
import { Box, IconButton } from '@/Helper/MUIImports'

// Next Imports
import { useSearchParams } from 'next/navigation';

// Third Party Imports
import { useDispatch } from 'react-redux';

// Store Imports
import { setToggleMenu } from '@/redux-store/Website';

// Icon Imports
import Icon from '@/@core/components/Icon';

// Helper Imports
import UrlHelper from '@/Helper/Url';

const IframeView = () => {

    // Hooks
    const dispatch = useDispatch()
    const params = useSearchParams()
    const restaurant_id = params.get('restaurant_id')

    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 9999,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <IconButton
                sx={{
                    color: '#fff',
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    zIndex: 10000,
                    bgcolor: 'rgba(0, 0, 0, 0.5) !important',
                    display: { xs: 'none', sm: 'block' }
                }}
                onClick={() => dispatch(setToggleMenu(false))}
            >
                <Icon icon={'mdi:close'} />
            </IconButton>

            <iframe
                src={`${UrlHelper.sdkLink}?restaurant_id=${restaurant_id}`}
                title="Iframe Preview"
                style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                }}
            />
        </Box>
    );
};

export default IframeView;
