import userCollection from "../Modal/UserAuthModal.js"
import bcrypt from 'bcrypt'


export const RegisterUser = async (req, res) => {
    try {
        const {username,email,password} = req.body;
    // console.log(req.body,"dfgd");

        //Checking if the email is already in use or not
        // let checkEmail= await userCollection.findOne({email:email});
        // if(checkEmail){
        //     return res.json({status:500,msg:"Email Already Exist!", login:false})
        // }
        let checkUser = await userCollection.findOne({ $or: [{ email }, { username }] });
            if (checkUser) {
            let errorMessage = "";
            if (checkUser.email === email) {
                errorMessage = "Email Already Exists!";
            }
            if (checkUser.username === username) {
                errorMessage = "Username Already Exists!";
            }
            console.log(errorMessage);
            return res.json({ status: 400, msg: errorMessage, login: false });
            }
        //Hashing password before saving it into database
        const salt =await  bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const newUser = new userCollection({
            username,
            email,
            password:hashedPassword
        })
        req.session.userId = newUser._id
        newUser.save()
        // console.log(req.session.userId,"res.session.userId");
        return res.json({newUser, msg:"User Registered Successfully", login:true})

        
    } catch (error) {
        console.log(error,'RegisterUser Server error');
        return res.status(500).json({ message: 'Server error' });
    }
}


export const LoginUser = async (req, res) => {
    console.log("LoginUser");

    try {
        const {username,password}=req.body;
        console.log(req.body,"dfgd");
        const userData = await userCollection.findOne({ username });
        if (!userData) {
            let errorMessage = "Username Not Exists!";
            return res.json({ status: 404, msg: errorMessage, login: false });
        }
          
         const validPass = await bcrypt.compare(password, userData.password);
        if (!validPass) {
            return  res.json({ status:401 ,msg:'Invalid Password', login: false})
        }
        req.session.userId = userData._id
        req.session.valid = true;
        return res.json({ msg:"User logged Successfully", login:true});
         
        
    } catch (error) {
        console.log(error,'LoginUser Server error');
        return res.status(500).json({ message: 'Server error' });
    }
}