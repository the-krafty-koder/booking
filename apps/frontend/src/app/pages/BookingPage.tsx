import {
  AppBar,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from 'react';
import Calendar from '../components/Calendar';
import styles from './BookingPage.module.css';

const BookingPage = () => {
  const [firstAppointmentChecked, setFirstAppointmentChecked] = useState(true);
  const [reason, setReason] = useState('Introduction Call');
  return (
    <>
      <AppBar position="static" className={styles.appBar}>
        <Stack spacing={3} direction="row">
          <AccountCircleIcon fontSize="large" />
          <Stack>
            <Typography variant="subtitle2">Make an appointment</Typography>
            <Typography>
              <b>Antoine Pairet</b>
            </Typography>
          </Stack>
        </Stack>
      </AppBar>
      <div className={styles.content}>
        <Stack spacing={3}>
          <Typography variant="h5" className={styles.contentHeading}>
            Find availability
          </Typography>

          <FormControl>
            <FormLabel>
              Is this your first appointment with this practitioner?
            </FormLabel>
            <FormGroup className={styles.formGroup}>
              <Stack direction="row" spacing={0}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={!firstAppointmentChecked}
                      onChange={() =>
                        setFirstAppointmentChecked(!firstAppointmentChecked)
                      }
                    />
                  }
                  label="No"
                  className={styles.formControlLabel}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={firstAppointmentChecked}
                      onChange={() =>
                        setFirstAppointmentChecked(!firstAppointmentChecked)
                      }
                    />
                  }
                  label="Yes"
                  className={styles.formControlLabel}
                />
              </Stack>
            </FormGroup>
            <FormControl fullWidth>
              <FormLabel>What is the reason for your visit?</FormLabel>
              <Select
                value={reason}
                onChange={(event) => {
                  setReason(event.target.value);
                }}
              >
                <MenuItem value="Introduction Call">Introduction Call</MenuItem>
                <MenuItem value="Cultural Fit">Cultural Fit</MenuItem>
                <MenuItem value="Business Meeting">Business Meeting</MenuItem>
                <MenuItem value="Technical Meeting">Technical Meeting</MenuItem>
              </Select>
            </FormControl>
          </FormControl>
        </Stack>
      </div>
      <Calendar firstAppointmentChecked={firstAppointmentChecked} />
    </>
  );
};

export default BookingPage;
