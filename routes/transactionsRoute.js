
const express = require("express");
const moment = require("moment/moment");
const Transaction = require("../models/Transaction");
const router = express.Router();

router.post("/add-transaction", async function (req, res) {
  try {
    const newTransaction = new Transaction(req.body);
    await newTransaction.save();
    res.send("Transaction Added Successfully");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/edit-transaction", async function (req, res) {
  try {
    await Transaction.findOneAndUpdate({_id:req.body.transactionId},req.body.payload)
    res.send("Transaction Edited Successfully");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/delete-transaction", async function (req, res) {
  try {
    await Transaction.findOneAndDelete({_id:req.body.transactionId})
    res.send("Transaction Deleted Successfully");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/get-all-transactions", async function (req, res) {
  const {frequency,selectedRange,type}=req.body
  try {
    const transactions = await Transaction.find({
      ...(frequency!=='custom'?
      {
        date:{
        $gt:moment().subtract(Number(req.body.frequency),'d').toDate()
      }
      }:{
        date:{
        $gte:selectedRange[0],
        $lte:selectedRange[1]
      }
      }),
      
      userid:req.body.userid,
      ...(type!=='all' &&{type})
    });
    res.send(transactions);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
