import mongoose from 'mongoose'

const invitedSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  }
}, { timestamps: true });

const Invited = mongoose.model('Invited', invitedSchema)

export default Invited
