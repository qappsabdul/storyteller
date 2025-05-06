/**
 * Authentication middleware
 * 
 * This is a simple demonstration - in a real application,
 * you would likely use JWT, OAuth, or another authentication strategy.
 */

const protect = (req, res, next) => {
  // Example: Check for auth token in headers
  const token = req.headers.authorization;
  
  if (!token || !token.startsWith('Bearer ')) {
    res.status(401);
    throw new Error('Not authorized, no token or invalid token format');
  }
  
  try {
    // Example: In a real app, you would verify the token here
    // const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    // req.user = decoded.user;
    
    // For demo purposes, we'll just set a mock user
    req.user = {
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      isAdmin: false,
    };
    
    next();
  } catch (error) {
    res.status(401);
    throw new Error('Not authorized, token failed');
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403);
    throw new Error('Not authorized as an admin');
  }
};

module.exports = { protect, admin };