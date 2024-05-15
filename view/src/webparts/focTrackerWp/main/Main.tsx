import * as React from 'react';
import {
  Box,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Divider,
  CircularProgress
} from '@mui/material';
import { useDataContext } from '../context/DataTrackingContext';
import Header from '../resuable-ui/Header';
import SelectRecordInformation from '../components/SelectRecordInformation/SelectRecordInformation';
import RequesterBasicInformation from '../components/RequestBasicInformation/RequesterBasicInformation';
import UserBasicInformation from '../components/UserBasicInformation/UserBasicInformation';
import RequesterDetails from '../components/RequestDetails/RequesterDetails';
import MyTableFOCDocument from '../components/ui-ux/Table/Table';
import MyTableFOCProject from '../components/ui-ux/Table2/Table2';
import ApproverSection from '../components/ApproverSection/ApproverSection';
import SaveMessage from '../components/ui-ux/SaveMessage/saveMessage';
import { decisionTree } from '../utils/decisionTreeUtil';
import { useDataFetcherContext } from '../context/DataFetcher';
import DocumentInformation from '../components/DocumentInformation/DocumentInformation';
import RemarkAndAttachment from '../components/RemarkAndAttachment/RemarkAndAttachment';


const Main = () => {
  const { userData, approverData, actionData } = useDataContext();
  const [confirmationOpen, setConfirmationOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false); // Track submission state
  const [saveResult, setSaveResult] = React.useState({ success: false, message: '' });
  const { context } = useDataFetcherContext();

  const Table = () => {
    if (userData.documentType === "FOC Document" || userData.documentType === "GOODWILLDoc") {
      return (
        <Grid item xs={12}>
          <MyTableFOCDocument />
        </Grid>
      );
    } else if (userData.documentType === "FOC Project") {
      return (
        <Grid item xs={12}>
          <MyTableFOCProject />
        </Grid>
      );
    } else {
      return null;
    }
  };

  const handleSaveClick = () => 
  {
    setConfirmationOpen(true);
  };

  const handleConfirmationClose = async (confirmed: boolean) => {
    setConfirmationOpen(false);

    if (confirmed) {
      setIsSubmitting(true); // Start submission
      const result = await decisionTree({
        context: context,
        userData: userData,
        approverData: approverData,
        approverAction: actionData,
      });

      setSaveResult({
        success: result.success,
        message: result.message ?? '',
      });

      setIsSubmitting(false); // End submission
    }
  };

  const handleSaveMessageClose = () => {
    setSaveResult({ success: false, message: '' });
  };


  return (
    <Box p={4}>
      <Header />

      <Grid container spacing={4}>

        <Grid item xs={12}>
          <SelectRecordInformation />
        </Grid>

        <Grid item xs={12}>
          <RequesterBasicInformation />
        </Grid>

        <Grid item xs={12}>
          <Divider sx={{ borderTop: '1px solid #ccc', margin: '16px 0' }} />
        </Grid>

        <Grid item xs={12}>
          <RequesterDetails />
        </Grid>

        <Grid item xs={12}>
          <Divider sx={{ borderTop: '1px solid #ccc', margin: '16px 0' }} />
        </Grid>

        <Grid container spacing={2} sx={{ marginTop: '16px', margin: '5px' }}>
          <Grid item xs={12} md={6}>
            <UserBasicInformation />
          </Grid>

          <Grid item xs={12} md={6}>
            <DocumentInformation />
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Divider sx={{ borderTop: '1px solid #ccc', margin: '15px 0' }} />
        </Grid>

        <Grid item xs={12} sx={{ margin: '17px', padding: '50px' }}>
          <RemarkAndAttachment />
        </Grid>


        <Grid item xs={12}>
          <Divider sx={{ borderTop: '1px solid #ccc', margin: '15px 0' }} />
        </Grid>


        {/* {isApprover && } */}
        {/* Show CircularProgress while submitting */}
        

        <Grid item xs={12}>
          <ApproverSection handleSaveClick={handleSaveClick} />
        </Grid>

        <Table />

      </Grid>
      
      <Grid item xs={12}>
          {isSubmitting ? (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
              <CircularProgress size={80} thickness={4} />
            </Box>
          ) : null}
        </Grid>

      <Dialog open={confirmationOpen} onClose={() => handleConfirmationClose(false)}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to submit the data?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleConfirmationClose(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleConfirmationClose(true)} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {saveResult.success || saveResult.message ? (
        <SaveMessage success={saveResult.success} message={saveResult.message ?? ''} onClose={handleSaveMessageClose} />
      ) : null}
    </Box>
  );
};

export default Main;
