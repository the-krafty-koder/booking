export type Availability = {
  date: string;
  endDate: string;
};

export type DailyAvailabilities = {
  date: string;
  availabilities: Availability[];
};

export type AvailabilitiesState = {
  data: {
    list: DailyAvailabilities[];
    hasFutureAvailabilities: boolean;
    hasPreviousAvailabilities: boolean;
  };
  isLoading: boolean;
  isError: boolean;
};

export type AvailabilitiesFetchInitAction = {
  type: 'AVAILABILITIES_FETCH_INIT';
};

export type AvailabilitiesFetchSuccessAction = {
  type: 'AVAILABILITIES_FETCH_SUCCESS';
  payload: {
    list: DailyAvailabilities[];
    hasFutureAvailabilities: boolean;
    hasPreviousAvailabilities: boolean;
  };
};

export type AvailabilitiesFetchFailureAction = {
  type: 'AVAILABILITIES_FETCH_FAILURE';
};

export type AvailabilitiesAction =
  | AvailabilitiesFetchInitAction
  | AvailabilitiesFetchSuccessAction
  | AvailabilitiesFetchFailureAction;
