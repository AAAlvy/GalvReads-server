const express = require('express');

const router = express.Router();

const queries = require('../db/queries');

function isValidId(req, res, next) {
  if(!isNaN(req.params.id)) return next();
  next(new Error('Invalid ID'));
}

function validBook(book) {
  const hasTitle = typeof book.title == 'string' && book.title.trim() !='';
  const hasGenre = typeof book.genre == 'string' && book.genre.trim() !='';
  return hasTitle && hasGenre;
}

router.get('/', (req, res) => {
  queries.getAll().then(books => {
      res.json(books);
  });
});

router.get('/:id', isValidId, (req, res, next) =>{
  queries.getOne(req.params.id).then(book => {
    if(book) {
      res.json(book);
    } else {
      next();
    }
  });
});

router.post('/', (req, res, next) => {
  if(validBook(req.body)) {
    queries.create(req.body).then(book => {
      res.json(book[0]);
    });
  } else {
    next(new Error('Invalid book'));
  }
});

module.exports = router;
