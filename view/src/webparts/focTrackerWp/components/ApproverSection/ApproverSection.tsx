import * as React from 'react';
import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core';
import { useDataContext } from '../../context/DataTrackingContext';

interface ApproverSectionProps {
    handleSaveClick: () => void;
}

const ApproverSection: React.FC<ApproverSectionProps> = ({ handleSaveClick }) =>
{
    const { updateActions, actionData } = useDataContext();

    const handleButtonClick = (action: string):void => {
        console.log(`Handling ${action} click`);
        updateActions('actions', action);
        handleSaveClick(); // Call the common save click logic
    };

    return (
        <Paper style={{ padding: '16px', marginTop: '16px' }}>
            <Typography variant="h6">Approver Comments</Typography>
            <TextField
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                placeholder="Approver Comments"
                value={actionData.comments}
                onChange={(e) => updateActions('comments', e.target.value)}
                style={{ marginTop: '8px' }}
            />
            <Grid container spacing={2} style={{ marginTop: '16px' }}>
                <Grid item>
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ width: '100%', backgroundColor: '#3b5998', color: 'white', marginTop: '8px' }}
                        onClick={() => handleButtonClick('Approved')}
                    >
                        Approve
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        color="secondary"
                        style={{ width: '100%', marginTop: '8px' }}
                        onClick={() => handleButtonClick('Rejected')}
                    >
                        Reject
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default ApproverSection as React.FC<{ handleSaveClick: () => void }>;
