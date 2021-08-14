const knex = require("../db/connection");

const tableName = "theaters";
const tableNameWithAlias = require("../utils/tableNameWithAlias")(tableName);

function list() {
  return knex(tableNameWithAlias)
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .join("movies as m", "mt.movie_id", "m.movie_id")
    .select(
      "t.theater_id",
      "t.name",
      "t.address_line_1",
      "t.address_line_2",
      "t.city",
      "t.state",
      "t.zip",
      "t.created_at",
      "t.updated_at",
      "m.movie_id",
      "m.title",
      "m.runtime_in_minutes",
      "m.rating",
      "m.description",
      "m.image_url",
      "m.created_at as movie_created_at",
      "m.updated_at as movie_updated_at",
      "mt.is_showing",
      "mt.theater_id as mt_theater_id"
    )
    .orderBy("t.theater_id");
}

module.exports = {
  list,
};
