import * as React from 'react';
import { PeoplePicker } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { useDataContext } from '../../context/DataTrackingContext';
import { inputContainerStyles, textFieldStyles } from '../RequestBasicInformation/RequesterBasicInformationStyle';
import {
        TextField,
        Grid,
        Box,
        Typography,
        Button,
        Paper,
        } from '@mui/material';
import {
        StyledLabel,
        StyledButton,
        } from './RequesterDetailStyle';
import { useDataFetcherContext } from '../../context/DataFetcher';

const RequesterDetails: React.FC = () => 
{
  const { userData } = useDataContext();

  const [isHidden, setIsHidden] = React.useState(true);

  const { context } = useDataFetcherContext();


  const hideOrView = () => 
  {
    setIsHidden(!isHidden);
  };

  if (!context || !context.pageContext) 
  {
    console.log('Context or pageContext not available. Ensure proper initialization.');
    return null;
  }


  return (
    <Box marginTop="16px">

      <Grid display="flex" spacing={2} sx={{ flex: '1', marginBottom: '16px' }}>
        {/* Adjust the width as needed */}
        <Typography variant="h5" >
          Requester Details Information
        </Typography>

        {/* Adjust the width as needed */}
        <Button onClick={hideOrView} sx={StyledButton}>
          {isHidden ? 'Hide' : 'View'}
        </Button>

      </Grid>

      {isHidden && (

        <Box display="flex">
          {/* First Grid Item */}
          <Grid spacing={2} item xs={12} md={6}>
            <Paper elevation={0}>
              <Grid sx={inputContainerStyles}>
                <Typography sx={StyledLabel}>
                  Company
                </Typography>
                <TextField
                  disabled
                  sx={textFieldStyles}
                  value={userData.company}
                />
              </Grid>
            </Paper>
            <Paper elevation={0}>
              <Grid sx={inputContainerStyles}>
                <Typography sx={StyledLabel}>
                  Cost Center
                </Typography>
                <TextField
                  disabled
                  sx={textFieldStyles}
                  value={userData.costCenter}
                />
              </Grid>
            </Paper>
            <Paper elevation={0}>
              <Grid sx={inputContainerStyles}>
                <Typography sx={StyledLabel}>
                  FAM Code
                </Typography>
                <TextField
                  disabled
                  sx={textFieldStyles}
                  value={userData.FAMCode}
                  type="text"
                />
              </Grid>
            </Paper>
          </Grid>

          {/* Second Grid Item */}
          <Grid spacing={2} item xs={12} md={6}>
            <Paper elevation={0}>
              <Grid sx={inputContainerStyles}>
                <Typography sx={StyledLabel}>
                  Location
                </Typography>
                <TextField
                  disabled
                  sx={textFieldStyles}
                  value={userData.location}
                  type="text"
                />
              </Grid>
            </Paper>
            <Paper elevation={0}>
              <Grid sx={inputContainerStyles}>
                <Typography sx={StyledLabel}>
                  Emp No.
                </Typography>
                <TextField
                  disabled
                  sx={textFieldStyles}
                  value={userData.employeeNo}
                  type="text"
                />
              </Grid>
            </Paper>
            <Paper elevation={0}>
              <Grid style={{
                display: 'flex',
                flexDirection: 'row',
                margin: '14px',
                marginTop: '16px',
                flex: '1',
              }}>
                <Typography sx={StyledLabel}>
                  Manager
                </Typography>
                <Grid sx={{
                  height: '35px',
                  boxSizing: 'border-box',
                  width:'100%',
                  marginTop: '5px'
                }}>
                  <PeoplePicker
                    disabled={true}
                    context={context}
                    defaultSelectedUsers={[userData.manager]}
                    personSelectionLimit={1}
                    styles={{ root: { width: '100%',flex:'1' }, input: { width: '100%' , flex:'1' } }}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Box>
      )}

    </Box>
  );
};

export default RequesterDetails;
