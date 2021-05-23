// I've set up a skeleton index.js here with all the basic
// info I would include in my index.js. We have not brought
// in any controllers yet or set up any endpoints. Everything
// else you'll notice is very similar to previous warmups and
// lectures.

// IMPORTS
require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')

const {CONNECTION_STRING, SESSION_SECRET, SERVER_PORT} = process.env

// CONTROLLERS
const authCtrl = require('./controllers/authcontroller')
const productCtrl = require('./controllers/productController')
const cartCtrl = require('./controllers/cartController')
const cartController = require('./controllers/cartController')

// APP INSTANCE CREATED
const app = express()

// TOP LEVEL MIDDLEWARE
app.use(express.json())
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 1000 *60 *60 *24}
}))

// DATABASE CONNECTION
massive({
  connectionString: CONNECTION_STRING,
  ssl: {rejectUnauthorized: false}
})
.then(db =>{
  app.set('db', db)
  console.log("Database Connected")
  app.listen(SERVER_PORT, () => console.log(`Server listening on ${SERVER_PORT}`))
}).catch(err => console.log(err))


// ENDPOINTS
//auth endpoints
app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.get('/auth/logout', authCtrl.logout)
// app.get('/auth/me', authCtrl.getUser)

//product endpoints
app.get('/api/products', productCtrl.getproducts)

//cart endpoints
app.get('/api/cart/', cartCtrl.getCart)
app.get('/api/cart/:product_id', cartCtrl.addToCart)
app.delete('/api/cart/:product_id', cartCtrl.deleteItemFromCart)
app.put('/api/cart/:product_id', cartCtrl.changeCartQty)