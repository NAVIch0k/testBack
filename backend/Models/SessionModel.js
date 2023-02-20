import mongoose from 'mongoose'

const SessionModel = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref:'User' },
  refresh: { type: String, required:true }
})

export default mongoose.model('Session', SessionModel)
