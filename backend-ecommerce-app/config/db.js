import mongoose from 'mongoose'
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.Mongodb_Connection_String, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
  } catch (e) {
    console.log(e.message.red.underline)
    process.exit(1)
  }
}
export default connectDB
