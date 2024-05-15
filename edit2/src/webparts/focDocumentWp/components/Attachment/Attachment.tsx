import * as React from 'react';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CancelIcon from '@mui/icons-material/Cancel';
import { Typography, Input, Button } from '@mui/material';
import { useDataContext } from '../../context/DataTracker';

const AttachmentsInput = () => {
    const { userData, updateField } = useDataContext();

    const [newFileName, setNewFileName] = React.useState('');
    
    // Change 66688989

    // Change 2444455
    
    // Change 3336666666

    // Change 555555

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        if (files && files.length > 0) {
            const file = files[0];
            const fileName = file.name;
            
            setNewFileName(fileName)

            updateField('attachmentFile' , { file : file , fileName : fileName })
            
        }
    };

    const handleClearFile = () => 
    {
        setNewFileName('');
        updateField('attachmentFile', null);
    };

    return (
        <div style={{ marginTop: '16px' }}>
            <Typography variant="h6" gutterBottom>
                Attachments
            </Typography>
            <div>
                {userData.attachmentFile && (
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                        <AttachFileIcon />
                        <Typography variant="body1" style={{ marginLeft: '8px' }}>
                            {newFileName}
                        </Typography>
                        <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            startIcon={<CancelIcon/>}
                            onClick={handleClearFile}
                            style={{ marginLeft: '8px' }}
                        >
                            Remove..
                        </Button>
                    </div>
                )}
            </div>
            <Input type="file" onChange={handleFileChange} />
        </div>
    );
};

export default AttachmentsInput;
