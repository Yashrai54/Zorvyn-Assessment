import User from "../models/User.model.js";

const createUser =async (req,res)=>{
    try{
    const {name,email,role} = req.body;
    if(!name || !email || !role){
        return res.status(400).json({message: "Please provide name, email and role"});
    }
    const validRoles = ['viewer','analyst','admin'];
    if(!validRoles.includes(role)){
        return res.status(400).json({message: "Invalid role. Valid roles are viewer, analyst, admin"});
    }
    if(await User.findOne({email})){
        return res.status(400).json({message: "User with this email already exists"});
    }
    const newUser = new User({name,email,role});
   await newUser.save();
    res.status(201).json(newUser);
    }
    catch(error){
        res.status(500).json({message: "Error creating user", error: error.message});
    }
}

const getAllUsers = async(req,res)=>{
    try{
    const users = await User.find();
    res.status(200).json(users);
    }
    catch(error){
        res.status(500).json({message: "Error fetching users", error: error.message});
    }
}

const updateRoleAndStatus = async (req,res)=>{
    try{
    const {id} = req.params;
    const {role, isActive} = req.body;
    if(!role && isActive === undefined){
        return res.status(400).json({message: "Please provide role or isActive status to update"});
    }
    const user = await User.findById(id);
    if(!user){
        return res.status(404).json({message: "User not found"});
    }
    if(role){
        user.role = role;
    }
    if(isActive !== undefined){
        user.isActive = isActive;
    }
    await user.save();
    res.status(200).json(user);
}
    catch(error){
        res.status(500).json({message: "Error updating user", error: error.message});
    }
}

export { createUser, getAllUsers, updateRoleAndStatus };