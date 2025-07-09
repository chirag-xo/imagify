import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Razorpay from "razorpay";  
import transactionModel from "../models/transactionModel.js";

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.json({success:false , message: "Please fill all fields" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const userData = {
            name,
            email,
            password: hashedPassword,
        };
        const newUser = new userModel(userData);
        const user = await newUser.save();

        const token = jwt.sign({ id: user._id }, `${process.env.JWT_SECRET}/imagify`);

        res.json({
            success: true,
            token,
            user:{name: user.name}
        });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
        
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(isMatch){
            const token = jwt.sign({ id: user._id }, `${process.env.JWT_SECRET}/imagify`);
            res.json({
                success: true,
                token,
                user:{name: user.name}
            });
        }
        else{
            res.json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
        
    }
}

const userCredit = async (req, res) => {
    try {
        const userId = req.userId;
        console.log("id ", userId);
        const user = await userModel.findById(userId);
        console.log(user, " user");
        res.json({
            success: true,
            credit : user.creditBalance,
            user:{name: user.name}
        });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "HELLO" });
        
    }
}

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const paymentRazorpay = async (req, res) => {
    try {
        const{userId , planId} = req.body
        console.log(userId , planId)
        const user = await userModel.findById(userId)
        if(!user || !planId){
            return res.json({ success: false , message:'Missing Details' })
        
        }
        let credits , plan , amount , date

        switch (planId) {
            case 'Basic':
                credits = 100
                plan = 'Basic'
                amount = 10
                break;
            case 'Advanced':
                credits = 500
                plan = 'Advanced'
                amount = 50
                break;
            case 'Business':
                credits = 5000
                plan = 'Business'
                amount = 250
                break;
            default:
                return res.json({ success: false , message:'Invalid Plan' });
        }
        date = Date.now()

        const transactionData = {
            userId, plan , amount , credits , date
        }

        const newTransaction = await transactionModel.create(transactionData)

        const options = {
            amount: amount * 100, // amount in the smallest currency unit
            currency: process.env.CURRENCY,
            receipt: newTransaction._id,
        }

        await razorpayInstance.orders.create(options , (error,order)=>{
            if(error){
                console.log(error)
                return res.json({ success: false , message:'Razorpay Error' })
            }
            res.json({ success:true , order})
            
            
        })

        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
        
    }
}
const verifyRazorpay = async (req, res) => {
    try {
        const {razorpay_order_id} = req.body.razorpay_order_id;
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

        if (orderInfo.status === 'paid') {
            const transactionData = await transactionModel.findById(orderInfo.receipt);
            if(transactionData.payment){
                return res.json({ success: false , message:'Payment Failed' })
            }
            const userData = await userModel.findById(transactionData.userId);
            const creditBalance = userData.creditBalance + transactionData.credits;
            await userModel.findByIdAndUpdate(userData._id, { creditBalance }); 

            await transactionModel.findByIdAndUpdate(transactionData._id, { payment: true });
            res.json({ success: true, message: 'Payment Successful' });

        }else{
            res.json({ success: false, message: 'Payment Failed' });
        }

        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
        
    }
}

  


export { registerUser, loginUser , userCredit , paymentRazorpay , verifyRazorpay };