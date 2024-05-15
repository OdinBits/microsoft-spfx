import * as React from 'react';
import { Snackbar, Alert, AlertTitle } from '@mui/material';

interface SaveMessageProps 
{
    success: boolean;
    message: string;
    onClose: () => void;
}

const SaveMessage: React.FC<SaveMessageProps> = ({ success, message, onClose }) => 
{
    return (
        <Snackbar open={true} autoHideDuration={6000} onClose={onClose}>
            <Alert severity={success ? 'success' : 'error'} onClose={onClose}>
                <AlertTitle>{success ? 'Success' : 'Error'}</AlertTitle>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default SaveMessage;
