import express from 'express';
import createSchedule from './controllers/createSchedules';
import createAppointment from './controllers/createAppointments';
import getAvailabilitiesBetweenDates from './controllers/getAvailabilitiesBetweenDates';
import getFirstAvailabilityAfterDate from './controllers/getFirstAvailabilityAfterDate';
import validateDateRangeMiddleware from './middleware/validateDateRange';
import validateDateMiddleware from './middleware/validateDate';
import getAllSchedules from './controllers/getSchedules';
import getAllAppointments from './controllers/getAppointments';

const router = express.Router();

router.get('/schedules', getAllSchedules);
router.get('/appointments', getAllAppointments);

router.post('/schedules', createSchedule);

router.post('/appointments', createAppointment);

router.get(
  '/availabilities',
  validateDateRangeMiddleware,
  getAvailabilitiesBetweenDates
);
router.get(
  '/first-availability',
  validateDateMiddleware,
  getFirstAvailabilityAfterDate
);

export default router;
