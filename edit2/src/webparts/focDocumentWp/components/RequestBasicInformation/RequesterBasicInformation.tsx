import * as React from 'react';
import {
  TextField,
  Typography,
  Grid,
  Paper,
  Box,
} from '@mui/material';
import {
  sectionHeaderStyles,
  textFieldStyles,
  inputContainerStyles,
} from './RequesterBasicInformationStyle';
import { useDataContext } from '../../context/DataTracker';
import { PeoplePicker } from '@pnp/spfx-controls-react/lib/PeoplePicker';
import { StyledLabel } from '../RequestDetails/RequesterDetailStyle';
import { useDataFetcherContext } from '../../context/DataFetcher';

const RequesterBasicInformation: React.FC = () => 
{
  const { userData } = useDataContext();

  const { employeeData } = useDataContext();

  const { employee } = employeeData.loggedEmployee;

  const { context } = useDataFetcherContext();

  if (!context) 
  {
    console.log('Context not found');
  }

  return (
    <Box>
      <Grid container spacing={2}>

        <Grid item xs={12} md={6} sx={{ marginBottom: '16px' }}>
          <Typography variant="h5" gutterBottom sx={sectionHeaderStyles}>
            Request Basic Information
          </Typography>
          <Paper elevation={0}>
            <Grid style={{
              display: 'flex',
              flexDirection: 'row',
              margin: '14px',
              marginTop: '16px',
              flex: '1',
            }}>
              <Typography sx={StyledLabel}>
                Emp Mail
              </Typography>
              <Grid sx={{
                height: '35px',
                boxSizing: 'border-box',
                width: '100%'
              }}>
                <PeoplePicker
                  context={context}
                  disabled={true}
                  personSelectionLimit={1}
                  defaultSelectedUsers={employee ? [employee] : ["NAN"]}
                  styles={{ root: { width: '100%', flex: '1' }, input: { width: '100%', flex: '1' } }}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} sx={{ marginBottom: '16px' }}>
          <Typography variant="h5" gutterBottom sx={sectionHeaderStyles}>
            Doc Id
          </Typography>
          <Paper elevation={0}>
            <Grid sx={inputContainerStyles}>
              <Typography sx={StyledLabel}>
                Doc Id
              </Typography>
              <TextField
                sx={textFieldStyles}
                disabled
                value={userData.docId}
              />
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RequesterBasicInformation;