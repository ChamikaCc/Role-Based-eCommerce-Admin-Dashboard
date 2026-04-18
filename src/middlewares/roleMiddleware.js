export function allowRoles() {
  const allowedRoles = Array.from(arguments); // Convert all passed arguments (roles) into an array

  return function (req, res, next) {

    if (!req.user) {
      return res.status(401).json(
        {
             message: "Unauthorized" 
            
        }); //Check if user is authenticated
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Forbidden: insufficient permissions", //Check if user's role is allowed
      });
    }

    next();
  };
}