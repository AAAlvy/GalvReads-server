const knex= require('./knex');

module.exports = {
  getAll() {
    return knex('book');
  },
  getOne(id) {
    return knex('book').where('id', id).first();
  },
  create(book) {
    return knex('book').insert(book, '*');
  }
};
