import mongoose from "mongoose";

const mongoURI = "mongodb+srv://shlomo1839:4ym7tk4mdb@cluster0.kosyfnf.mongodb.net/collegeDB"

export const connectionMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("conecte succses")
    } catch(error) {
        console.log("error in connect;", error)
    }
}