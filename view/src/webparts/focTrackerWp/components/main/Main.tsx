// import * as React from 'react';
// import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid } from '@mui/material';
// import Header from '../ui-ux/Header/Header';
// import SelectRecordInformation from '../SelectRecordInformation/SelectRecordInformation';
// import RequesterBasicInformation from '../RequestBasicInformation/RequesterBasicInformation';
// import RequesterDetails from '../RequestDetails/RequesterDetails';
// import UserBasicInformation from '../UserBasicInformation/UserBasicInformation';
// import DocumentInformation from '../DocumentInformation/DocumentInformation';
// import ApproverSection from '../ApproverSection/ApproverSection';
// import MyTable from '../ui-ux/Table/Table';
// import SaveMessage from '../ui-ux/SaveMessage/saveMessage';
// import { useDataContext } from '../../context/DataTrackingContext';
// import { approverFlowDecision } from '../../utils/decisionUtil';

// const Main: React.FC<{ context: any }> = (props) =>{
//   if ( useDataContext == null)
//   {
//     console.log('Form Main no data for useDataContext');
//   }
//   const { userData, approverData, actionData } = useDataContext();
//   const [saveResult, setSaveResult] = React.useState({ success: false, message: '' });
//   const [confirmationOpen, setConfirmationOpen] = React.useState(false);

//   const handleSaveClick = (): void => 
//   {
//     // Open the confirmation dialog
//     setConfirmationOpen(true);
//   };

//   const handleConfirmationClose = async (confirmed: boolean): Promise<void> =>  
//   {     
//     // Close the confirmation dialog
//     setConfirmationOpen(false);

//     if (confirmed) {
//       // Proceed with the submission
//       const result = await approverFlowDecision({
//         context: props.context,
//         userData: userData,
//         approverData: approverData,
//         approverAction: actionData,
//       });

//       // Update the save result
//       setSaveResult({
//         success: result.success,
//         message: result.message ?? '',
//       });
//     }
//   };

//   const handleSaveMessageClose = (): void => {
//     setSaveResult({ success: false, message: '' });
//   };

//   return (
//     <Box p={4}>
//       <Header />

//       <Grid container spacing={4}>
//         <Grid item xs={12}>
//           <SelectRecordInformation />
//         </Grid>

//         <Grid item xs={12}>
//           <RequesterBasicInformation />
//         </Grid>

//         <Grid item xs={12}>
//           <RequesterDetails />
//         </Grid>

//         <Grid container spacing={2}>
//           <Grid item xs={12} md={6}>
//             <UserBasicInformation />
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <DocumentInformation />
//           </Grid>
//         </Grid>

//         <Grid item xs={12}>
//           <ApproverSection handleSaveClick={handleSaveClick} />
//         </Grid>

//         <Grid item xs={12}>
//           <MyTable />
//         </Grid>
//       </Grid>

//       {/* Confirmation Dialog */}
//       <Dialog open={confirmationOpen} onClose={() => handleConfirmationClose(false)}>
//         <DialogTitle>Confirmation</DialogTitle>
//         <DialogContent>
//           <DialogContentText>Are you sure you want to submit the data?</DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => handleConfirmationClose(false)} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={() => handleConfirmationClose(true)} color="primary">
//             Submit
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Save Message */}
//       {saveResult.success || saveResult.message ? (
//         <SaveMessage success={saveResult.success} message={saveResult.message ?? ''} onClose={handleSaveMessageClose} />
//       ) : null}
//     </Box>
//   );
// };

// export default Main;
