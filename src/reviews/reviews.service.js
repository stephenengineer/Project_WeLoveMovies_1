const knex = require("../db/connection");

const tableName = "reviews";
const tableNameWithAlias = require("../utils/tableNameWithAlias")(tableName);

function read(review_id) {
  return knex(`${tableNameWithAlias}`)
    .select("*")
    .where({ review_id })
    .then((returnedRecords) => returnedRecords[0]);
}

function readReviewWithCritics(review_id) {
  return knex(tableNameWithAlias)
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select(
      "r.review_id",
      "r.content",
      "r.score",
      "r.created_at",
      "r.updated_at",
      "r.critic_id",
      "r.movie_id",
      "c.critic_id as critic_critic_id",
      "c.preferred_name",
      "c.surname",
      "c.organization_name",
      "c.created_at as critic_created_at",
      "c.updated_at as critic_updated_at"
    )
    .where({ review_id })
    .first();
}

function update(updatedReview) {
  return knex(tableNameWithAlias)
    .select("*")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview)
    .then(() => readReviewWithCritics(updatedReview.review_id));
}

function destroy(review_id) {
  return knex(tableNameWithAlias).where({ review_id }).del();
}

function list() {
  return knex(tableNameWithAlias)
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select(
      "r.review_id",
      "r.content",
      "r.score",
      "r.created_at",
      "r.updated_at",
      "r.critic_id",
      "r.movie_id",
      "c.critic_id as critic_critic_id",
      "c.preferred_name",
      "c.surname",
      "c.organization_name",
      "c.created_at as critic_created_at",
      "c.updated_at as critic_updated_at"
    );
}

module.exports = {
  read,
  update,
  delete: destroy,
  list,
};
