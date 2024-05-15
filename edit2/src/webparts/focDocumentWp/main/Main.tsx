import * as React from 'react';
import { useDataContext } from '../context/DataTracker';
import { saveData } from '../services/api/saveDataAPI';
import DocumentInformation from '../components/DocumentInformation/DocumentInformation';
import Header from '../resuable-ui/Header';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import AttachmentsInput from '../components/Attachment/Attachment';
import SelectRecordInformation from '../components/SelectRecordInformation/SelectRecordInformation';
import RequesterBasicInformation from '../components/RequestBasicInformation/RequesterBasicInformation';
import UserBasicInformation from '../components/UserBasicInformation/UserBasicInformation';
import RequesterDetails from '../components/RequestDetails/RequesterDetails';
import { useDataFetcherContext } from '../context/DataFetcher';

interface PopupMessageProps {
  message: string;
  onClose: () => void;
}

const PopupMessage: React.FC<PopupMessageProps> = ({ message, onClose }) => (
  <div style={{
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    background: '#fff',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    zIndex: 9999,
    textAlign: 'center',
    borderRadius: '8px',
  }}>
    <p style={{ fontSize: '24px', marginBottom: '20px' }}>{message}</p>
    <Button onClick={onClose} variant="contained" color="primary" size="large">
      Close
    </Button>
  </div>
);

const Main = () => {

  const { userData } = useDataContext();

  const [popupMessage, setPopupMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSaveClick = async () => {
    try {
      setLoading(true);
      const saveResult = await saveData({ context: context, userData: userData });

      if (saveResult.success) {
        setPopupMessage('Data submitted successfully!');
      } else {
        setPopupMessage(`Error: ${saveResult.message}`);
      }
    } catch (error) {
      console.error('Save operation failed:', error.message);
      setPopupMessage('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const closePopupMessage = () => {
    setPopupMessage("");
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
          <hr style={{ borderTop: '1px solid #ccc', margin: '16px 0' }} />
        </Grid>

        <Grid item xs={12}>
          <RequesterDetails />
        </Grid>

        <Grid item xs={12}>
          <hr style={{ borderTop: '1px solid #ccc', margin: '16px 0' }} />
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
          <hr style={{ borderTop: '1px solid #ccc', margin: '15px 0' }} />
        </Grid>

        <Grid item xs={12} md={6}>
          <AttachmentsInput />
        </Grid>

        <Grid item xs={12}>
          <hr style={{ borderTop: '1px solid #ccc', margin: '15px 0' }} />
        </Grid>

      </Grid>

      <Box mt={2} display="flex" justifyContent="flex-end">
        <Button
          color="primary"
          onClick={handleSaveClick}
          sx={{ fontSize: '20px', marginRight: '120px', padding: '5px', margin: '20px' }} 
        >
          Submit
        </Button>
        <Button
          color="primary"
          sx={{ fontSize: '20px', marginRight: '120px', padding: '5px', margin: '20px' }} 
        >
          Cancel
        </Button>
      </Box>

      {loading && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.5)',
          zIndex: 9998,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <CircularProgress size={80} thickness={5} style={{ color: '#fff' }} />
        </div>
      )}

      {popupMessage && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.5)',
          zIndex: 9998,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <PopupMessage message={popupMessage} onClose={closePopupMessage} />
        </div>
      )}

    </Box>
  );
};

export default Main;
