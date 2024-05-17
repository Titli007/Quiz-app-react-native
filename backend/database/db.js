const mongoose = require("mongoose")

const connectDB = async()=>{
    try{
        const mongodb_URI = "mongodb://localhost:27017/quiz_app"
        const connection = await mongoose.connect(mongodb_URI)
        console.log("mongodb connected")
    }catch(error){
        console.log(error)
    }
}

module.exports = connectDB