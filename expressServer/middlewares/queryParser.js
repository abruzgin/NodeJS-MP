const queryParser = () => (req, res, next) => {
  if (req.parsedQuery) return next();
  const query = req.query;
  if (!query) return next();
  req.parsedQuery = query;
  return next();
}

export default queryParser;