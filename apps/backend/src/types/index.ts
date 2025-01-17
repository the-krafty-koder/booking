export type Range = { start: string; end: string };

export type Appointment = Range & {
  date: string;
};
export type Schedule = Range & { day: string };

export type Availability = {
  date: string;
  availabilities: {
    start: string;
    end: string;
  }[];
};
