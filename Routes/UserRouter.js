import express from 'express';
import { RegisterUser, LoginUser } from "../Controllers/UserAuth.js";
import sessionCheck from "../Middlware/SessionCheck.js"
const router = express.Router();



router.route('/register')
    .post(RegisterUser)

router.route('/login')
    .post(LoginUser)

    router.get('/chech-auth', (req, res) => {
        if (req.session.userId) {
            // console.log('sessionCheck',req.session.userId);
            return res.json({valid:true, userId:req.session.userId})
        } 
        else {
            return res.json({valid:false})
        }
    });

export default router