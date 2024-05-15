import * as React from 'react';
import { useDataContext } from '../../context/DataTracker';
import { UserData } from '../../interfaces/IObjectUserData';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Box, TextareaAutosize } from '@mui/material';
import { sectionHeaderStyles, inputContainerStyles, textFieldStyles } from '../RequestBasicInformation/RequesterBasicInformationStyle';
import { StyledLabel } from '../RequestDetails/RequesterDetailStyle';

const DocumentInformation = () => {
  const { userData, updateField } = useDataContext();

  const updateInputData = (name: keyof UserData, value: string) => {
    updateField(name, value);
  };


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
            onChange={(e) => updateInputData("CSINumber", e.target.value)}
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
            onChange={(e) => updateInputData("customerName", e.target.value)}
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
            value={userData.tentativeDateOfSupply}
            onChange={(e) => updateInputData('tentativeDateOfSupply', e.target.value)}
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
            onChange={(e) => updateInputData("noOfHours", e.target.value)}
          />
        </Grid>
      </Paper>

      <TextareaAutosize
        style={{
          width: '100%',
          height: '50px',
          border: 'none',
          fontSize: '16px',
          fontFamily: 'Ubuntu, sans-serif',
          backgroundColor: userData.remarks ? 'rgba(144, 238, 144, 0.1)' : 'transparent', // Faint green when input is entered
          transition: 'background-color 0.3s ease', // Add a smooth transition effect
        }}
        value={userData.remarks}
        minRows={10}
        maxRows={15}
        onChange={(e) => updateInputData("remarks", e.target.value)}
      />


    </Box>
  );
};

export default DocumentInformation;
