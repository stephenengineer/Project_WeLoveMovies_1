const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./reviews.service");
const mapProperties = require("../utils/map-properties");

const hasData = require("../errors/hasData")();

const formatReviewData = (rawData) => {
  const dataFormatMapReviews = mapProperties({
    critic_critic_id: ["critic", "critic_id"],
    preferred_name: ["critic", "preferred_name"],
    surname: ["critic", "surname"],
    organization_name: ["critic", "organization_name"],
    critic_created_at: ["critic", "created_at"],
    critic_updated_at: ["critic", "updated_at"],
  });
  return dataFormatMapReviews(rawData);
};

async function reviewExists(req, res, next) {
  const review = await service.read(req.params.reviewId);
  if (review) {
    res.locals.review = review;
    return next();
  }
  next({ status: 404, message: "Review cannot be found." });
}

async function update(req, res, next) {
  const updatedReview = {
    ...req.body.data,
    review_id: res.locals.review.review_id,
  };
  const rawData = await service.update(updatedReview);
  const data = formatReviewData(rawData);

  res.json({ data });
}

async function destroy(req, res, next) {
  await service.delete(res.locals.review.review_id);
  res.sendStatus(204);
}

async function list(req, res, next) {
  const { movieId } = req.params;
  const byResult = (datum) => datum.movie_id === Number(movieId);

  const rawData = await service.list();
  const unfilteredData = rawData.map((rawDatum) => formatReviewData(rawDatum));
  const data = unfilteredData.filter(byResult);

  res.json({ data });
}

module.exports = {
  update: [
    asyncErrorBoundary(reviewExists),
    hasData,
    asyncErrorBoundary(update),
  ],
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
  list: [asyncErrorBoundary(list)],
};
