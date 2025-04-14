import jwt from 'jsonwebtoken';

const userAuth = (req, res, next) => {
    const token = req.headers.token;
    console.log(req.headers);
    if (!token) {
        return res.json({ success: false, message: "u. Try Login Again" });
    }
    try {
        const tokenDecoded = jwt.verify(token, `${process.env.JWT_SECRET}/imagify`);
        console.log("TOKENDEcoded",tokenDecoded)
        if(tokenDecoded.id){
            req.userId = tokenDecoded.id;
        }else{
            return res.json({ success: false, message: "Unauthorized. Try Login Again" });
        }

        next();
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "Unauthorized. Try Login Again" });
        
    }
};
export default userAuth;