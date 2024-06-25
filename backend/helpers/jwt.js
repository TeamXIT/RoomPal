const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
  const token = req.header('Auth-Token');
  if (!token) {
    return res.status(404).json({ message: 'Unauthorized - Token not provided' });
  }

  try {
    const secret = process.env.JWT_SECRET || 'rajasekhar-secret-key';
    const decoded = jwt.verify(token, secret);
    req.user = decoded;  
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized - Invalid token' });
  }
};

module.exports = { verifyJWT };