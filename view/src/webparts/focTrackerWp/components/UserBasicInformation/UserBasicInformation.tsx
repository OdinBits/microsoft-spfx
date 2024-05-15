import * as React from "react";
import { useDataContext } from "../../context/DataTrackingContext";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
// import { InputLabel } from "@mui/material";
import {  inputContainerStyles, sectionHeaderStyles } from "../RequestBasicInformation/RequesterBasicInformationStyle";
import { StyledLabel } from "../RequestDetails/RequesterDetailStyle";


const UserBasicInformation = () => 
{
  const { userData } = useDataContext();

  return (
    <Box >
      <Typography variant="h5" gutterBottom sx={sectionHeaderStyles}>
        Basic Information
      </Typography>

      <Paper elevation={0}>
        <Grid sx={inputContainerStyles}>
          <Typography sx={StyledLabel}>
            FamCode
          </Typography>
          <TextField
            sx={{
              width: '80%',
              input: {
                height: '35px',
                boxSizing: 'border-box',
                flex: '1',
              }
            }}
            value={userData.famCode}
            disabled
          />
        </Grid>
      </Paper>

      <Paper elevation={0}>
        <Grid sx={inputContainerStyles}>
          <Typography sx={StyledLabel}>
            Bussiness Line
          </Typography>
          <TextField
            sx={{
              width: '80%',
              input: {
                height: '35px',
                boxSizing: 'border-box',
                flex: '1',
              }
            }}
            value={userData.bussinessLine}
            disabled
          />
        </Grid>
      </Paper>

      <Paper elevation={0}>
        <Grid sx={inputContainerStyles}>
          <Typography sx={StyledLabel}>
            Region
          </Typography>
          <TextField
            sx={{
              width: '80%',
              input: {
                height: '35px',
                boxSizing: 'border-box',
                flex: '1',
              }
            }}
            value={userData.region}
            disabled
          />
        </Grid>
      </Paper>


      <Paper elevation={0}>
        <Grid sx={{
          display: 'flex',
          flexDirection: 'row',
          margin: '14px',
          marginTop: '14px',
          flex: '1',
        }}>
          <Typography sx={StyledLabel}>
            Approx Value
          </Typography>
          <TextField
            sx={{
              width: '80%',
              input: {
                height: '35px',
                boxSizing: 'border-box',
                flex: '1',
              }
            }}
            value={userData.approxValue}
            disabled
          />
        </Grid>
      </Paper>

      <Paper elevation={0}>
        <Grid sx={{
          display: 'flex',
          flexDirection: 'row',
          margin: '14px',
          marginTop: '14px',
          flex: '1',
        }}>
          <Typography sx={StyledLabel}>
            Machine / Project Number
          </Typography>
          <TextField
            sx={{
              width: '80%',
              input: {
                height: '35px',
                boxSizing: 'border-box',
                flex: '1',
              }
            }}
            value={userData.machineProjectNumber}
            disabled
          />
        </Grid>
      </Paper>

      <Paper elevation={0}>
        <Grid sx={inputContainerStyles}>
          <Typography sx={StyledLabel}>
            Classification
          </Typography>
          <TextField
            sx={{
              width: '80%',
              input: {
                height: '35px',
                boxSizing: 'border-box',
                flex: '1',
              }
            }}
            value={userData.classification}
            disabled
          />
        </Grid>
      </Paper>

      <Paper elevation={0}>
        <Grid sx={inputContainerStyles}>
          <Typography sx={StyledLabel}>
            Type Of FOC
          </Typography>
          <TextField
            sx={{
              width: '80%',
              input: {
                height: '35px',
                boxSizing: 'border-box',
                flex: '1',
              }
            }}
            value={userData.typeOfFOC}
            disabled
          />
        </Grid>
      </Paper>

    </Box>
  );
};

export default UserBasicInformation;
