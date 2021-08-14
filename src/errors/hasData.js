function hasData() {
  return (req, res, next) => {
    console.log("req.body:", req.body);
    const { data } = req.body;
    console.log("data:", data);
    if (data) return next();

    next({ status: 400, message: "A body is required." });
  };
}

module.exports = hasData;
