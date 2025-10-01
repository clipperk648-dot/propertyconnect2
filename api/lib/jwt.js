const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET || process.env.JWT_ACCESS_SECRET || process.env.JWT_REFRESH_SECRET;
  return secret || 'dev-secret';
};

module.exports = { getJwtSecret };
