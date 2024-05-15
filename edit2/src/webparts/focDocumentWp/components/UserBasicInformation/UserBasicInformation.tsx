import * as React from "react";
import { useDataContext } from "../../context/DataTracker";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Select, MenuItem, InputLabel } from "@mui/material";
import { dropDownStyles, dropDownStyles2, inputContainerStyles, sectionHeaderStyles } from "../RequestBasicInformation/RequesterBasicInformationStyle";
import { StyledLabel } from "../RequestDetails/RequesterDetailStyle";
import fetchFamRequisite from "../../services/api/fetchFamRequisiteAPI";
import { useDataFetcherContext } from "../../context/DataFetcher";
import fetchBussinessManager from "../../services/api/fetchBussinessManagerAPI";
import fetchRegionalManager from "../../services/api/fetchRegionalManagerAPI";

const UserBasicInformation = () => 
{
  const { userData, updateField ,dropDowns} = useDataContext();
  const [bussinessManager,setBussinessManager] = React.useState("");
  const [regionManager,setRegionManager] = React.useState("");
  const { context } = useDataFetcherContext();

  const {famCode,bussinessLine,region,classification,typeofFoc} = dropDowns;

  const handleFamCodeSelection = async (e: React.ChangeEvent<HTMLInputElement>) => 
  {
    updateField("famCode", e.target.value);
    
    //call api , it will return 3 data values
    const result : any = await fetchFamRequisite({value : e.target.value, context : context})

    if(!result )
    {
      console.log("no userBasic famcode", result)
    }

    const recordType = result.recordType;
    const companyName = result.companyName;
    const division = result.division;
    // save in context data 1
    updateField("recordType",recordType);

    // save in context data 2
    updateField("companyName",companyName);

    // save in context data 3
    updateField("division",division);
  };

  const handleBussinessSelection = async (e: React.ChangeEvent<HTMLInputElement>) => 
  {
    updateField("bussinessLine", e.target.value);

    // call the api it will return bussiness manager name
    const result : any = await fetchBussinessManager({value : e.target.value, context : context})
    if(!result)
    {
      console.log("no userBasic bussinessManager", result)
    }
    const Bmanager = result.bussinessManager;
    // save to show manager
    setBussinessManager(Bmanager);
  };

  const handleRegionSelection = async (e: React.ChangeEvent<HTMLInputElement>) => 
  {
    updateField("region", e.target.value);

    // call the api it will return bussiness manager name
    const result : any = await fetchRegionalManager({value : e.target.value, context : context})

    const Zmanager = result.regionalManager;
    // save to show manager
    setRegionManager(Zmanager);
  };

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
          <Select
            value={userData.famCode}
            onChange={handleFamCodeSelection}
            sx={dropDownStyles}
          >
            {famCode && famCode.map((option) => (
              <MenuItem key={"Fam Code"} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Paper>

      <Paper elevation={0}>
        <Grid sx={inputContainerStyles}>
          <Typography sx={StyledLabel}>
            Bussiness Line
          </Typography>
          <Select
            value={userData.bussinessLine}
            onChange={handleBussinessSelection}
            sx={dropDownStyles2}
          >
            {bussinessLine && bussinessLine.map((option) => (
              <MenuItem key={"Bussiness Line"} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
          {"- "+bussinessManager}
        </Grid>
      </Paper>

      <Paper elevation={0}>
        <Grid sx={inputContainerStyles}>
          <InputLabel sx={StyledLabel} id="Region-Label" >
            Region
          </InputLabel>
          <Select
            value={userData.region}
            onChange={handleRegionSelection}
            sx={dropDownStyles2}
          >
            {region && region.map((option) => (
              <MenuItem key={"Region"} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
          {"- "+regionManager}
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
            onChange={(e) => updateField("approxValue", e.target.value)}
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
            onChange={(e) => updateField("machineProjectNumber", e.target.value)}
          />
        </Grid>
      </Paper>

      <Paper elevation={0}>
        <Grid sx={inputContainerStyles}>
          <Typography sx={StyledLabel}>
            Classification
          </Typography>
          <Select
            value={userData.classification}
            onChange={(e) => updateField("classification", e.target.value)}
            sx={dropDownStyles}
          >
            {classification && classification.map((option) => (
              <MenuItem key={"Classification"} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Paper>

      <Paper elevation={0}>
        <Grid sx={inputContainerStyles}>
          <Typography sx={StyledLabel}>
            Type Of FOC
          </Typography>
          <Select
            value={userData.typeOfFOC}
            onChange={(e) => updateField("typeOfFOC", e.target.value)}
            sx={dropDownStyles}
          >
            {typeofFoc && typeofFoc.map((option) => (
              <MenuItem key={"TypeofFOC"} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Paper>

    </Box>
  );
};

export default UserBasicInformation;
