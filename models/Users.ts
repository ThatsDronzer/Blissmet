import mongoose from "mongoose"


const UserSchema = new mongoose.Schema({
    name:{ 
        type: String,
        required: true,
        maxlength: 30,
        match: /^[a-zA-Z\s]+$/,
    },
    email:{
        type: String,
        required: true,
        maxlength: 40,
        match: /^\S+@\S+\.\S+$/,
        unique: true,
    },
    phone:{ 
        type: String,
        required: false,
        unique: false,
        match: /^\d{10,15}$/,
    },
    password:{
        type: String,
        required: false,
    },
    role:{
        type: String,
        required: true,
    },
    uid:{
        type:String,
        required: false,
    },
    provider:{
        type:String,
        required:true,
    },
    bookings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Booking",
        }
    ],
    favorites:{
        vendors:[{type: mongoose.Schema.Types.ObjectId, ref:"Vendor"}],
        venues:[{type: mongoose.Schema.Types.ObjectId, ref:"Venue"}],
    }
},{ timestamps : true })

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;