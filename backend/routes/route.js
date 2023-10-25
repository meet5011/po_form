const express = require("express");
const db = require("../db/connect");
const dotenv = require("dotenv");

dotenv.config();

const router = express.Router();

router.get('/health',async(req,res)=>{
    await res.status(200).send("Health check");
})
router.get('/suppliers',async(req,res)=>{
     try {
      const orders =  await db.collection("purchase_orders").find().toArray();
      //console.log(suppliers);
      console.log(orders.length);
      res.status(200).json(orders);
     } catch (error) {
        console.log(error);
     }
})

module.exports = router;