import Record from "../models/Records.model.js";

async function summaryController(req,res) {
    const user = req.user;

    const records = await Record.find({createdBy: user._id});
    const totalIncome = records.filter(record=>record.type ==="income").reduce((sum,record)=>sum+record.amount,0)
    const totalExpense = records.filter(record=>record.type ==="expense").reduce((sum,record)=>sum+record.amount,0)
    const balance = totalIncome - totalExpense;
    const categoryTotals = {};
    const recentTransactions = records.sort((a,b)=>b.date - a.date).slice(0,5);

    records.forEach(record=>{
        if(!categoryTotals[record.category]){
            categoryTotals[record.category] = 0;
        }
        categoryTotals[record.category] += record.amount;

    })
    res.status(200).json({totalIncome, totalExpense, balance, categoryTotals, recentTransactions});
}

export default summaryController;