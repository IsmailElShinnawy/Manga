# Manga Flights - An Airplane Reservation System

## Motivation

Manga Flights is a university project for CSEN704 - Advanced Computer Lab course @ GUC, the main purpose of the project was to build a complete airplane reservation system, where users of the web application can search for, compare and reserve flights.

## Build Status

Currently Manga Flights is a Minimum Value Product (MVP), which can be used by customers and let us observe how they interact with the system.

Currently there are no known bugs/errors in the system, but if you find any pull requests are more than welcomed.

## Code style

Prettier formatter was used:

- Print width: 80
- Tab width: 2
- Semicolons: true
- Quotes: true (uses single quotes)
- JSX Quotes: true (uses single quotes)
- Trailing Commas: es5
- Bracket spacing: true
- Bracket Line: false
- Arrow Function Parentheses: avoid

## Some Screenshots from the website

1. Landing page
   ![Manga Flights landing page](/assets/screenshots/landing-page.png)
2. Sign Up form
   ![Manga Flights Signup form](/assets/screenshots/sign-up-form.png)
3. Sign In form
   ![Manga Flights Signin form](/assets/screenshots/sign-in-form.png)
4. Search Results
   ![Manga Flights Search results page](/assets/screenshots/search-results.png)
5. Flights Chosen
   ![Manga Flights chosen flights](/assets/screenshots/chosen-flights.png)
6. Checkout page
   ![Manga Flights chosen flights](/assets/screenshots/checkout-page.png)
7. View Itinerary page
   ![Manga Flights chosen flights](/assets/screenshots/reservation-itinerary.png)

## Technology used

This web application was build with MERN stack:

- MongoDB as our NoSQL database
- ExpressJS as our NodeJS wrapper
- ReactJS for our view library
- NodeJS for server-side JS runtime enviroment

Additional libraries used:

- TailwindCSS - a utility based CSS library
- Axios - promise-based http client
- Stripe - payment gateway
- MomentJS - date manipulation library
- bcryptjs
- mongoose - Object Document Mapper (ODM) of choice

## Features

- Visually appealing UI that helps the user enjoy his time browsing the website
- UX designed to guide the user smoothly throughout the website with recovery from error, reversibility and learnability
- Responsive design which gives the user feedback about what is currently happening

## Installation

- Make sure you have [NodeJS](https://nodejs.org/en/) installed on your machine

  You can check by running

         node -v

  in your terminal to make sure NodeJS is setup correctly

- Make sure to include two .env files in both the frontend and backend directories

### How to run the frontend:

1.  In your terminal navigate to

         /Manga/frontend

2.  Install yarn by running

         npm i -g yarn

3.  Install required packages by running

         yarn

4.  Spin up the development server using

          yarn start

    open your browser at http://localhost:3000

### How to run the backend:

1.  In your terminal navigate to

         /Manga/backend

2.  Install nodemon by running

         npm i -g nodemon

3.  Install required packages by running

         npm i

4.  Spin up the development server using

          nodemon server

    It will run on http://localhost:8080

## API reference

### /account

1.  /updateProfile (PUT) (REQUIRES TOKEN)

    Request body (json)

          {
             "firstname": "string",
             "lastname": "string",
             "passportNumber": "string",
             "email": "string"
          }

2.  /changePassword (PUT) (REQUIRES TOKEN)

    Request body (json)

         {
            "password": "string",
            "newPassword": "string",
         }

### /auth

1.  /signup (POST)

    Request body (json)

         {
            "username": "string",
            "email": "string",
            "password": "string",
            "firstname": "string",
            "lastname": "string",
            "homeAddress": "string",
            "countryCode": "string",
            "telephoneNumber": "string",
            "passportNumber": "string",
         }

2.  /signin (POST)

    Request body (json)

         {
            "email": "string",
            "password": "string",
         }

### /flight

1.  / (POST) (REQUIRES TOKEN) (ADMIN)

    Request body (json)

         {
            "flightNumber": "string",
            "departureTime": "string",
            "arrivalTime": "string",
            "economySeats": "integer",
            "businessSeats": "integer",
            "departureTerminal": "string",
            "arrivalTerminal": "string",
            "ticketPrice": "number",
            "baggageAllowance": "number",
         }

2.  / (GET) (REQUIRES TOKEN) (ADMIN)
3.  / (DELETE) (REQUIRES TOKEN) (ADMIN)

    Request body (json)

          {
             "flights": ["string"],
          }

4.  /search (POST) (REQUIRES TOKEN) (ADMIN)

    Request body (json)

          {
             "fromArrivalDate": "string",
             "toArrivalDate": "string",
             "fromDepartureDate": "string",
             "toDepartureDate": "string",
             "fromArrivalTime": "string",
             "toArrivalTime": "string",
             "fromDepartureTime": "string",
             "toDepartureTime": "string",
          }

5.  /:id (PUT) (REQUIRES TOKEN) (ADMIN)

    Request body (json)

         {
            "flightNumber": "string",
            "departureTime": "string",
            "arrivalTime": "string",
            "economySeats": "integer",
            "businessSeats": "integer",
            "departureTerminal": "string",
            "arrivalTerminal": "string",
            "ticketPrice": "number",
            "baggageAllowance": "number",
         }

6.  /:id (GET)

7.  /user/search (POST)

    Request body (json)

         {
            "passengers": "string",
            "departureTerminal": "string",
            "arrivalTerminal": "string",
            "departureDate": "integer",
            "arrivalDate": "integer",
            "cabinClass": "string",
         }

8.  /seats/:id (POST)

    Request body (json)

         {
            "cabin": "string",
         }

9.  /return/:id (POST)

    Request body (json)

         {
            "cabinClass": "string",
            "numberOfPassengers": "integer",
         }

10. /alternative/:reservation_id (POST) (REQUIRES TOKEN)

    Request body (json)

         {
            "type": "string",
         }

### /reservation

1.  / (GET) (REQUIRES TOKEN)
2.  /:id (DELETE) (REQUIRES TOKEN)
3.  /:id (GET) (REQUIRES TOKEN)
4.  / (POST) (REQUIRES TOKEN)

    Request body (json)

         {
            "departureFlightId": "string",
            "returnFlightId": "string",
            "departureFlightSeats": ["integer"],
            "returnFlightSeats": ["integer"],
            "departureFlightCabin": "string",
            "returnFlightCabin": "string",
         }

5.  /email/:id (GET) (REQUIRES TOKEN)

6.  /seats/:id (PUT) (REQUIRES TOKEN)

    Request body (json)

         {
            "type": "string",
            "seats": ["integer"],
         }

7.  /:id (PUT) (REQUIRES TOKEN)

    Request body (json)

         {
            "type": "string",
            "flightId": "string",
            "flightSeats": ["integer"],
            "flightCabin": "string",
         }

## Tests

- Postman can be used to test the functionality of different API endpoints make sure to attach bearer token if endpoint requires token

- Any browser can be used to test the functionality of the frontend webpages and web compenents and the integration with the

## How to use

### What can you do on the portal

- Login/Signup to the portal
- Go to the admin dashboard if signed in with admin account

  - Add a flight
  - Update a flight
  - Search for specific flights
  - Delete flights

- Use the main search in the landing page

  - View the search results
  - Choose a departure flight
  - Choose a return flight
  - Confirm and Checkout
  - Choose seats for both flights
  - Pay for the flights
  - Confirm and reserve

- Go to your profile

  - List your reserved flights

    - Choose to update the seats in one of the flights
    - Choose to change a flight in one of the reservations
    - Cancel a reservation
    - Email yourself an itinerary of a reservation

  - Update your personal informations

  - Update your password

  - Logout

## Contribute

Pull requests are more than welcomed in this repository, feel free to open one to fix a bug, enhance a feature or introduce a new one.

## Credits

Ismail El Shinnawy
Mohamed Zakaria
Ali Amr
Yara Ahmed
Nadine Khaled
