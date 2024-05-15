import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Header: React.FC = () => {
    return (
        <Box mt={2} mb={4} textAlign="left" ml={2}> 
            <Typography variant="h5" fontSize="1.5rem">
                FOC and Goodwill Tracking
            </Typography>
        </Box>
    );
}

export default Header;
