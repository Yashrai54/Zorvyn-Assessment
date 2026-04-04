import Record from '../models/Records.model.js'; 

const createRecord = async(req,res)=>{
    const createdBy = req.user._id;
    const { amount, type, category, date, notes } = req.body;
    if(!amount || !type || !category || !date || !createdBy){
        return res.status(400).json({message: "Please provide all required fields"});
    }
    const validTypes = ['income', 'expense'];
    if(!validTypes.includes(type)){
        return res.status(400).json({message: "Invalid type. Valid types are income and expense"});
    }
    try{
        const newRecord = new Record({amount, type, category, date, notes, createdBy});
        await newRecord.save();
        res.status(201).json(newRecord);
    }
    catch(error){
        res.status(500).json({message: "Error creating record", error: error.message});
    }
}

const getRecords = async(req,res)=>{
    try{
        const { userId, type, category, startDate, endDate } = req.query;
        let query = {};
        if(userId){
            query.createdBy = userId;
        }
        if(type){
            query.type = type;
        }
        if(category){
            query.category = category.toLowerCase();
        }
        if(startDate || endDate){
            query.date = {};
            if(startDate){
                query.date.$gte = new Date(startDate);
            }
            if(endDate){
                query.date.$lte = new Date(endDate);
            }
        }
        const page =1
        const limit = 10;
        const skip = (page - 1) * limit;

        const records = await Record.find(query).sort({date: -1}).skip(skip).limit(limit);
        res.status(200).json(records);
    }
    catch(error){
        res.status(500).json({message: "Error fetching records", error: error.message});
    }
}

const updateRecord = async(req,res)=>{
    try{
        const {id} = req.params;
        const { amount, type, category, date, notes } = req.body;
        const record = await Record.findById(id);
        if(!record){
            return res.status(404).json({message: "Record not found"});
        }
        const updatedRecord = await Record.findByIdAndUpdate(id, { amount, type, category, date, notes }, { new: true });
        res.status(200).json(updatedRecord);
    }
    catch(error){
        res.status(500).json({message: "Error updating record", error: error.message});
    }
}

const deleteRecord = async(req,res)=>{
    try{
        const {id} = req.params;
        const record = await Record.findById(id);
        if(!record){
            return res.status(404).json({message: "Record not found"});
        }       await Record.findByIdAndDelete(id);
        res.status(200).json({message: "Record deleted successfully"});
    }
    catch(error){
        res.status(500).json({message: "Error deleting record", error: error.message});
    }  
}

export { createRecord, getRecords, updateRecord, deleteRecord };