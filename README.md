# Booking app

## Installation

Navigate to the root folder and run `>npm install`

## Run tasks

Start the frontend server with `nx serve frontend`
Start the backend server with `nx run backend:serve:development`
To run the dev server for your app, use:

## API

I've included a postman collection under the collections folder to get up and
running with the backend API

## Database

I've used a serverless postgres db for the data storage. It's schema is suited for a single health professional for now (Antoine) because of time constraints.

Mock data is present on the db with a 1 week schedule for the days Mon, Tue, Wed and Fri. You can view the current schedule and add to it by querying the api via the /`api/antoine/schedules` endpoint.

Mock data for the appointments are also present. You can view them and create your own via the `/api/antoine/appointment` endpoint

## API Endpoints

1. GET /api/antoine/availabilities

   Description
   Get a list of availabilities within a date range

   URL Params:
   from (required): string - ISO Date string representing start of range
   to (required): string - ISO Date string representing end of range

   Example: http://localhost:3000/api/antoine/availabilities?from=2025-01-13T00:00:00.000Z&to=2025-01-17T00:00:00.000Z

2. GET /api/antoine/first-availability

   Description
   Get the first availability after a certain date, whether same day, next day or
   soonest day availability is found

   URL Params:
   date (required): string - ISO Date string representing date to begin search from

   Example: http://localhost:3000/api/antoine/first-availability?date=2025-01-13T10:30:00.000Z

3. GET /api/antoine/schedules

   Description
   View the current weekly schedule

4. GET /api/antoine/appointments

   Description
   View current appointments

5. POST /api/antoine/schedules

   Decription
   Add to the current schedules

   Body:
   day: string - day of the week eg 'Monday'
   start: string - schedule start time eg '11:00'
   end: string - schedule end time eg '11:00'

6. POST /api/antoine/appointments

   Description
   Add to the current appointments

   Body:
   date: string - ISO string representing a date eg "2025-01-16T00:00:00.000Z"
   start: string - appointment start time eg '11:00'
   end: string - appointment end time eg '11:00'
