import express from "express";
import EnrollmentForm from "../models/EnrollmentForm.js";

const route = express.Router();

route.post("/Enrollment-form", async (req, res) => {
  const {
    name,
    dateOfBirth,
    contactNumber,
    email,
    address,
    bloodGroup,
    gender,
    caste,
    aadharNumber,
  } = req.body;
  if (
    !name ||
    !dateOfBirth ||
    !contactNumber ||
    !email ||
    !address ||
    !bloodGroup ||
    !gender ||
    !caste ||
    !aadharNumber
  ) {
    return res.status(400).json({ message: "All the fields are required" });
  }

  try {
    const newForm = new EnrollmentForm({
      name,
      dateOfBirth,
      contactNumber,
      email,
      address,
      bloodGroup,
      gender,
      caste,
      aadharNumber,
    });
    await newForm.save();

    return res.status(200).json({ message: "Form submitted successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

export default route;
