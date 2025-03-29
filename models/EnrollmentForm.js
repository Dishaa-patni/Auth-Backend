import mongoose, { Schema } from "mongoose";

const EnrollmentFormSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  dateOfBirth: {
    type: Date,
    required: true,
  },

  contactNumber: {
    type: String,
    required: true,
  },

  email: {
    type: String,
  },

  address: {
    type: String,
    required: true,
  },

  bloodGroup: {
    type: String,
  },

  gender: {
    type: String,
    required: true,
  },
  caste: {
    type: String,
    required: true,
  },
  aadharNumber: {
    type: String,
    required: true,
  },
});

const EnrollmentForm = mongoose.model("EnrollmentForm", EnrollmentFormSchema);

export default EnrollmentForm;
