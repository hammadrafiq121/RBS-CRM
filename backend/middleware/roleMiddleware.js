export const roleMiddleware = (allowedRoles) => (req, res, next) => {
  // Check if user's role is allowed
  if (allowedRoles.includes(req.user.userRole)) {
    next(); // Role is allowed, proceed to the next middleware or route handler
  } else {
    res.status(403).json({ message: "Forbidden" }); // Role is not allowed, respond with a 403 Forbidden status
  }
};
