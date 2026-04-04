import User from "../models/User.model.js";

async function authMiddleware(req, res, next) {
    const userId = req.header('user-id')
    console.log("User ID from header:", userId);
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized: No user ID provided" });
    }

    const user = await User.findById(userId);
    console.log("User found:", user);
    if (!user) {
        return res.status(401).json({ message: "Unauthorized: User not found" });
    }
    req.user = user;
    next();
}

export default authMiddleware;