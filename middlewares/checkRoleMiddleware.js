function checkRoleMiddleware(allowedRoles) {
    return function (req, res, next) {
        console.log("User role:", req.user.role);
        const userRole = req.user.role;
        if (!allowedRoles.includes(userRole)) {
            return res.status(403).json({ message: "Forbidden: You do not have permission to access this resource" });
        }
        next();
    }
}

export default checkRoleMiddleware;