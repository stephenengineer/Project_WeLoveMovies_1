const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./theaters.service");
const reduceProperties = require("../utils/reduce-properties");

async function list(req, res, next) {
  const { movieId } = req.params;
  const byResult = movieId
    ? (datum) =>
        datum.movies.some((movie) => movie.movie_id === Number(movieId))
    : () => true;

  const rawData = await service.list();
  const dataFormatReduceMovies = reduceProperties("theater_id", {
    movie_id: ["movies", null, "movie_id"],
    title: ["movies", null, "title"],
    runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
    rating: ["movies", null, "rating"],
    description: ["movies", null, "description"],
    image_url: ["movies", null, "image_url"],
    movie_created_at: ["movies", null, "created_at"],
    movie_updated_at: ["movies", null, "updated_at"],
    is_showing: ["movies", null, "is_showing"],
    mt_theater_id: ["movies", null, "theater_id"],
  });
  const unfilteredData = dataFormatReduceMovies(rawData);
  const data = unfilteredData.filter(byResult);
  if (movieId) data.forEach((datum) => (datum.movies = undefined));

  res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
};
