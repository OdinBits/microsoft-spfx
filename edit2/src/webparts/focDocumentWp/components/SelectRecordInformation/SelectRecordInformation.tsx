import * as React from 'react';
import { FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useDataContext } from '../../context/DataTracker';

const SelectRecordInformation: React.FC = () => 
{
  const { userData, updateField } = useDataContext();
  const [isDisabled, setDisabled] = React.useState(false);

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateField('documentType', e.target.value);
    setDisabled(true);
  };

  return (
    <Box marginBottom="16px">
      <Typography variant="h5" gutterBottom style={{ background: 'rgba(128, 128, 128, 0.2)', padding: '8px', borderRadius: '7px', boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)' }}>
        Document Selection Section
      </Typography>

      <FormControl component="fieldset">
        <RadioGroup
          row
          aria-label="documentType"
          name="documentType"
          value={userData.documentType}
          onChange={handleRadioChange}
        >
          <FormControlLabel value="FOC Document" control={<Radio />} label="FOC Document (AIF/AII/QAM/CTS/CTV)" disabled={isDisabled} />
          <FormControlLabel value="FOC Project" control={<Radio />} label="FOC Document (Project Parts)" disabled={isDisabled} />
          <FormControlLabel value="GOODWILLDoc" control={<Radio />} label="Goodwill Document (CTS/Equipment Parts)" disabled={isDisabled} />
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default SelectRecordInformation;
