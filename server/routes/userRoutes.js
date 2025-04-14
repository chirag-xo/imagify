import {registerUser, loginUser, userCredit, paymentRazorpay} from '../controllers/userController.js';
import express from 'express';
import userAuth from '../middlewares/auth.js';

const userRouter = express.Router();
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/credit', userAuth , userCredit);
userRouter.post('/pay-razor', userAuth , paymentRazorpay);

export default userRouter;

//http://localhost:4000/api/user/register
//http://localhost:4000/api/user/login
//http://localhost:4000/api/user/credits