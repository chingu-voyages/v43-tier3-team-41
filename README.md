## Pettopia - [website link](https://pettopia-frontend.onrender.com)
### Overview
- An application to act as a one-stop shop for Pet products
- Giving customers ability to easily browse and/or buy products, create a profile with saved products from previous sessions, make payments, etc.
- Giving product owners ability to add products, update price
- An admin should be able to control

### Features 
- Login, Signup using jwt authentication tokens
- Stripe integration for fulfilling orders
- Searching products, filtering by different categories
- Easy navigation between different pages
- Ability to change UI theme

### Running the project
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

### Deployment
- The frontend is deployed as a 'static service' on [render](https://render.com/docs/static-sites) while backend is deployed as a 'Web Service' on [render platform](https://render.com/docs/web-services)
- [Frontend / Website URL](https://pettopia-frontend.onrender.com)
- [Backend / API endpoint URL](https://pettopia-backend.onrender.com)

### Dependencies
- Products data was inserted in MongoDB Atlas instance prior to project running the application. 
- The product data used was a subset of products in the pet categories on Walmart.com
- In order to collect the data, the [Walmart Search Api service](https://serpapi.com/walmart-search-api) on the website [SerpApi](https://serpapi.com/walmart-search-api). This is a website which allows for scraping of products from many places. For e.g. Google Search results, eBay products. 
- A subset of Walmart product data was inserted into MongoDB Atlas instance using some nodejs scripts. Found in dbScripts directory in the backend project. The api keys in each of the files need to modified by anyone who wants to use the script. The SerpApi.com website allows to create a free account with 100 free search requests. 
- The [populateProductsCollection.js](https://github.com/chingu-voyages/v43-tier3-team-41/blob/issue-63/add-documentation-in-readme/pettopia-backend/dbScripts/populateProductsCollection.js) and [populateProductDetailsCollectionUsingSerpApi.js](https://github.com/chingu-voyages/v43-tier3-team-41/blob/issue-63/add-documentation-in-readme/pettopia-backend/dbScripts/populateProductDetailsCollectionUsingSerpApi.js)

### Future scope
- For starters, we want to add data from various sources and many more categories
- Real-time prices for products by web scraping products at regular intervals through daily background jobs
- Adding ability for sellers to upload products
- Product recommendations for users based on search and purchase history

### Contributors
- https://github.com/VijayIyer
