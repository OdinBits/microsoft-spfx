import * as React from 'react';
import { useDataContext } from '../../context/DataTrackingContext';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';
import { StyledLabel } from '../RequestDetails/RequesterDetailStyle';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

const RemarkAndAttachment : React.FC = () =>
{
    const { userData } = useDataContext();

    const url = userData.attachmentUrl?.Url;
    return (
    <Box>

        <Paper elevation={0}>
            <Grid sx={{}}>
                <Typography sx={{width:'100%' , margin:'7px' , padding : '7px'}}>
                    Remarks / Justification and part number required
                </Typography>
                <TextareaAutosize
                    style={{ width: '100%', height: '50px', border: 'solid gray 1px' , margin : '10px' , padding : '7px'}}
                    value={userData.remarks}
                    minRows={10}
                    maxRows={15}
                    disabled
                />
            </Grid>
        </Paper>

        <Paper elevation={0}>
            <Grid sx={{}}>
                <Typography sx={StyledLabel}>
                    Attachments
                </Typography>
                <a href={url} target="_blank" rel="noopener noreferrer">
                    {url}
                </a>
            </Grid>
        </Paper>


    </Box>
    )
}

export default RemarkAndAttachment;