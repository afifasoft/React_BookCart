const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const logger = require('morgan');

const app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// -------------------------- APIs

// connect to database
const mongoose = require('mongoose');
mongoose.connect('mongodb://sallemao:k8nsa645@ds127888.mlab.com:27888/marco-bookstore');

const db = mongoose.connection;
db.on('error', console.error.bind(console, '# MongoDB - Connection ERROR: '));

// ---------->> SET UP SESSIONS <<--------------
app.use(session({
  secret: 'mySecretString',
  saveUninitialized: false,
  resave: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 2 },
  store: new MongoStore({ mongooseConnection: db, ttl: 2 * 24 * 60 * 60 })
}))
// SAVE TO SESSION
app.post('/cart', (req, res) => {
  const cart = req.body;
  req.session.cart = cart;
  req.session.save((err) => {
    if(err) {
      throw err;
    }
    res.json(req.session.cart);
  })
});
// GET SESSION
app.get('/cart', (req, res) => {
  if(typeof req.session.cart !== 'undefined') {
    res.json(req.session.cart);
  }
})
// ----------->> END SESSIONS <<--------------

var Books = require('./models/books')

// ------->> POST BOOKS <<------------

app.post('/books', (req, res) => {
  const book = req.body;

  Books.create(book, (err, books) => {
    if(err) {
      throw err;
    }
    res.json(books);
  })
});

// ------->> GET BOOKS <<------------

app.get('/books', (req, res) => {
  Books.find((err, books) => {
    if(err) {
      throw err;
    }
    res.json(books);
  })
});

// ------->> DELETE BOOKS <<------------

app.delete('/books/:id', (req, res) => {
  const query = { _id: req.params.id };

  Books.remove(query, (err, books) => {
    if(err) {
      throw err;
  }
    res.json(books);
  })
})

// ------->> UPDATE BOOKS <<------------

app.put('/books/:id', (req, res) => {
  const book = req.body;
  const query = req.params.id;

  const update = {
    '$set': {
      title: book.title,
      description: book.description,
      image: book.image,
      price: book.price
    }
  };

  options = { new: true };

  Books.findOneAndUpdate(query, update, options, (err, books) => {
    if(err) {
      throw err;
    }
    res.json(books);
  })
})

// -------------- END API's ---------------- 

app.listen(3001, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('API Server is running on port 3001');
})