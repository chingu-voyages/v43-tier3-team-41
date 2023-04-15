## Pettopia
- An application to act as a one-stop shop for all pet products
- Giving customers ability to easily browse and/or buy products, create a profile with saved products from previous sessions, make payments, etc.
- Giving product owners ability to add products, update price
- An admin should be able to control

### MVP
- A website with basic features of an eCommerce app for pet products

## Implemented Features 
- Login, Signup using jwt authentication tokens
- Stripe integration for fulfilling orders
- Searching products, filtering by different categories
- Easy navigation between different pages

## Steps to run project
- There are 2 separate projects - frontend and backend
- The frontend holds UI logic as well as communicating with the backend on user actions
- The backend holds the implementation for CRUD operations with database
- Steps to run frontend react project
  - `cd frontend`
  - `npm i` to install relevant packages (react, helper libraries with react)
  - `npm start` to launch the application
- Steps to run backend express application
  - add the following environment variables in a .env file in the backend directory
    - `CLIENT_URL` this should equal the url on which frontend has been launched e.g. http://localhost:3000
    - `MONGODB_CONNECTION_STRING` this should be the mongodb connection string with username, password and database name
    - `PORT` the port number on which express app is listening for incoming requests e.g 5000
    - `STRIPE_KEY` this is a key required for being able to create stripe checkout session. Steps to create stripe key :
  - `cd backend`
  - `npm i`
  - `npm start`

## Deployment

# voyage-tasks

Your project's `readme` is as important to success as your code. For 
this reason you should put as much care into its creation and maintenance
as you would any other component of the application.

If you are unsure of what should go into the `readme` let this article,
written by an experienced Chingu, be your starting point - 
[Keys to a well written README](https://tinyurl.com/yk3wubft).

And before we go there's "one more thing"! Once you decide what to include
in your `readme` feel free to replace the text we've provided here.

> Own it & Make it your Own!
