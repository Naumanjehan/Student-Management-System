
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';

export default function updatedStudent({editDilogOpen , currentStudent, handleDilogClosed , handleChange,
    handleSaveStudent ,
}) {
  
  return (
  
      <Dialog
        open={editDilogOpen}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>Update Student</DialogTitle>
        <DialogContent>
          <TextField
           margin='dense'
          name='name'
          label='Student Name'
          type='text'
          fullWidth
          value={currentStudent?.name || ''}
          onChange={handleChange}
          />
          <TextField
            margin='dense'
            name='age'
            label='Student Age'
            type='text'
            fullWidth
            value={currentStudent?.age || ''}
            onChange={handleChange}
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleDilogClosed}>Cancel</Button>
          <Button onClick={handleSaveStudent} autoFocus> Save </Button>
        </DialogActions>
      </Dialog>
    
  );
}
