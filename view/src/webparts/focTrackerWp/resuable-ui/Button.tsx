import * as React from 'react';
import Button from '@mui/material/Button';

interface CustomeButtonProps {
  onClick: () => void; // Callback function passed from the parent
}

const CustomeButton: React.FC<CustomeButtonProps> = ({ onClick }) => {
  const handleClick = () => {
    onClick(); // Call the callback function provided by the parent
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClick}>
        Submit
      </Button>
    </div>
  );
};

export default CustomeButton;
