import * as React from 'react';
import { useDataContext } from '../../context/DataTrackingContext';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';
import { sectionHeaderStyles, inputContainerStyles, textFieldStyles } from '../RequestBasicInformation/RequesterBasicInformationStyle';
import { StyledLabel } from '../RequestDetails/RequesterDetailStyle';

const DocumentInformation = () => {
  const { userData } = useDataContext();

  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={sectionHeaderStyles}>
        SR No
      </Typography>

      <Paper elevation={0}>
        <Grid sx={inputContainerStyles}>
          <Typography sx={StyledLabel}>
            Record Type
          </Typography>
          <TextField
            sx={{ ...textFieldStyles, border: 'none' }}
            value={userData.recordType}
            disabled
          />
        </Grid>
      </Paper>

      <Paper elevation={0}>
        <Grid sx={inputContainerStyles}>
          <Typography sx={StyledLabel}>
            Company Name
          </Typography>
          <TextField
            sx={textFieldStyles}
            value={userData.companyName}
            disabled
            InputProps={{ style: { border: 'none' } }}
          />
        </Grid>
      </Paper>

      <Paper elevation={0}>
        <Grid sx={inputContainerStyles}>
          <Typography sx={StyledLabel}>
            Division
          </Typography>
          <TextField
            sx={textFieldStyles}
            value={userData.division}
            disabled
            InputProps={{ style: { border: 'none' } }}
          />
        </Grid>
      </Paper>

      <Paper elevation={0}>
        <Grid sx={inputContainerStyles}>
          <Typography sx={StyledLabel}>
            CSI Number
          </Typography>
          <TextField
            sx={textFieldStyles}
            value={userData.CSINumber}
            disabled
          />
        </Grid>
      </Paper>

      <Paper elevation={0}>
        <Grid sx={inputContainerStyles}>
          <Typography sx={StyledLabel}>
            Customer Name
          </Typography>
          <TextField
            sx={textFieldStyles}
            value={userData.customerName}
            disabled
          />
        </Grid>
      </Paper>

      <Paper elevation={0}>
        <Grid sx={inputContainerStyles}>
          <Typography sx={StyledLabel}>
            Tentative Date of Supply
          </Typography>
          <TextField
            sx={textFieldStyles}
            type='date'
            value={(userData.tentativeDateOfSupply ?? new Date()).toISOString().split('T')[0]}
            // InputProps={{ readOnly: true }}
            disabled
          />
        </Grid>
      </Paper>


      <Paper elevation={0}>
        <Grid sx={inputContainerStyles}>
          <Typography sx={StyledLabel}>
            No of Hours
          </Typography>
          <TextField
            sx={textFieldStyles}
            value={userData.noOfHours}
            disabled
          />
        </Grid>
      </Paper>

    </Box>
  );
};

export default DocumentInformation;
