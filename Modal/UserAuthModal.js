import mongoose from "mongoose";



const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: {
        type: String,
        unique: true,
        required: true
        },
    password:{
            type:String,
            required:true,
            minlength:6,
        }
})

const UserModal = mongoose.model("UserAuth", UserSchema);
export default UserModal;