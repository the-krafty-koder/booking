import {
  Box,
  IconButton,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { AvailabilitiesAction, AvailabilitiesState } from '../types';
import { useCallback, useEffect, useReducer, useState } from 'react';
import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from '@mui/icons-material';
import buildQueryString from '../lib/buildQueryString';
import transformAvailabilitiesData from '../lib/transformAvailabilityData';

const MAX_PERIODS = 21;
const API_URL =
  'https://staging-api.rosa.be/api/patient-booking/availabilities';
const MAX_DAYS_TO_DISPLAY = 7;

const StyledTableCellContainer = styled(TableCell)(() => ({
  borderBottom: 'none',
  paddingLeft: '30px',
  paddingRight: '30px',
}));

const StyledAvailableTableCell = styled(Box)(() => ({
  backgroundColor: '#ffe4e1',
  minHeight: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  ':hover': {
    cursor: 'pointer',
  },
}));

const StyledUnAvailableTableCell = styled(Box)(() => ({
  textAlign: 'center',
}));

export const generateRow = (
  entries: [string, string[]][],
  startIndex: number
) => {
  const rowCells: JSX.Element[] = [];
  const indexAsString =
    startIndex < 10 ? `0${startIndex}` : startIndex.toString();
  const [realIndex] = indexAsString.split('.').slice(0, 1);

  entries.map(([_, periods]) => {
    const matchingDate = periods.find((period) => {
      const startPeriod = indexAsString.includes('.5')
        ? `${realIndex}.30`
        : `${realIndex}.00`;
      const endPeriod = indexAsString.includes('.5')
        ? startIndex < 9.5 // add 0 to startIndex
          ? `0${parseInt(realIndex) + 1}.00`
          : `${parseInt(realIndex) + 1}.00`
        : `${realIndex}.30`;

      const expected = `${startPeriod}-${endPeriod}`;
      return expected === period;
    });

    const cell = (
      <StyledTableCellContainer>
        {matchingDate ? (
          <StyledAvailableTableCell>
            <span>{matchingDate.split('-').slice(0, 1)}</span>
          </StyledAvailableTableCell>
        ) : (
          <StyledUnAvailableTableCell>
            <p>---</p>
          </StyledUnAvailableTableCell>
        )}
      </StyledTableCellContainer>
    );
    rowCells.push(cell);
  });

  return rowCells;
};

export const generateRows = (transformedData: Record<string, string[]>) => {
  const entries = Object.entries(transformedData);
  const rows = [];
  for (let startIndex = 8; startIndex <= MAX_PERIODS; startIndex += 0.5) {
    const row = generateRow(entries, startIndex);
    rows.push(row);
  }

  return rows;
};

const availabilitiesReducer = (
  state: AvailabilitiesState,
  action: AvailabilitiesAction
) => {
  switch (action.type) {
    case 'AVAILABILITIES_FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'AVAILABILITIES_FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'AVAILABILITIES_FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
  }
};

interface CalendarProps {
  firstAppointmentChecked: boolean;
}
const Calendar = ({ firstAppointmentChecked }: CalendarProps) => {
  const [availabilities, dispatchAvailabilities] = useReducer(
    availabilitiesReducer,
    {
      data: {
        list: [],
        hasFutureAvailabilities: false,
        hasPreviousAvailabilities: false,
      },
      isLoading: false,
      isError: false,
    }
  );
  const [startDate, setStartDate] = useState(new Date().toISOString());

  const transformedData: Record<string, string[]> = transformAvailabilitiesData(
    availabilities.data.list
  );

  const rows = generateRows(transformedData);

  const fetchAvailabilities = async () => {
    try {
      const url = buildQueryString(API_URL, {
        key: 'antoine-staging-pairet',
        entityType: 'hp',
        date: startDate,
        site: '61379ba159d4940022b6c926',
        motive: '61eea367ddf6c500149ae2cc',
        skip_initial_empty_days: true,
        'is-new-patient': firstAppointmentChecked,
      });

      const response = await fetch(url);
      const data = await response.json();

      dispatchAvailabilities({
        type: 'AVAILABILITIES_FETCH_SUCCESS',
        payload: {
          list: data.availabilities.slice(0, MAX_DAYS_TO_DISPLAY),
          hasFutureAvailabilities: data.hasFutureAvailabilities,
          hasPreviousAvailabilities: data.hasPreviousAvailabilities,
        },
      });
    } catch (_) {
      dispatchAvailabilities({
        type: 'AVAILABILITIES_FETCH_FAILURE',
      });
    }
  };

  const handlePreviousClicked = () => {
    const currentStartDate = new Date(startDate);
    currentStartDate.setDate(currentStartDate.getDate() - 7);
    setStartDate(currentStartDate.toISOString());
  };

  const handleNextClicked = () => {
    const currentStartDate = new Date(startDate);
    currentStartDate.setDate(currentStartDate.getDate() + 7);
    setStartDate(currentStartDate.toISOString());
  };

  const handleFetchAvailabilities = useCallback(() => {
    dispatchAvailabilities({ type: 'AVAILABILITIES_FETCH_INIT' });
    fetchAvailabilities();
  }, [startDate]);

  useEffect(() => {
    handleFetchAvailabilities();
  }, [handleFetchAvailabilities]);

  return (
    <div
      style={{ display: 'flex', alignItems: 'start', justifyContent: 'center' }}
    >
      {availabilities.isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {availabilities.isError ? (
            <p>Error occurred</p>
          ) : (
            <>
              <IconButton
                onClick={handlePreviousClicked}
                style={{ marginTop: '10px' }}
                disabled={!availabilities.data.hasPreviousAvailabilities}
                name="previous"
              >
                <ArrowBackIosOutlined />
              </IconButton>

              <Table style={{ width: '70%' }}>
                <TableHead>
                  <TableRow>
                    {Object.keys(transformedData).map((key) => (
                      <TableCell
                        style={{
                          textAlign: 'center',
                        }}
                      >
                        {key}
                      </TableCell>
                    ))}
                  </TableRow>
                  <IconButton />
                </TableHead>
                <TableBody>
                  {rows.map((row, index) => (
                    <TableRow key={index}>{row}</TableRow>
                  ))}
                </TableBody>
              </Table>
              <IconButton
                onClick={handleNextClicked}
                style={{ marginTop: '10px' }}
                disabled={!availabilities.data.hasFutureAvailabilities}
                name="next"
              >
                <ArrowForwardIosOutlined />
              </IconButton>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Calendar;
