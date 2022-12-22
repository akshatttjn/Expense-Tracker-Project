const mongoose=require("mongoose");
const { connected } = require("process");
mongoose.connect("mongodb+srv://admin-akshat:Khandala-1@cluster0.ztou0.mongodb.net/Expense-Tracker");
const connection=mongoose.connection

// connection.on('error',err=>console.log(err))

// connection.on('connected',()=>console.log("Successfully connected MongoDB with NodeJS"));