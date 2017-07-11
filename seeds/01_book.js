const books = require('../books');

exports.seed = function(knex, Promise) {
  return knex('book').del()
    .then(function () {
      return knex('book').insert(books);
    });
};
