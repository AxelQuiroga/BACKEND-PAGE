import Contact from "../models/Contact.js";
import { asyncHandler } from "../middlewares/errorHandler.js";

export const createContact = asyncHandler(async (req, res) => {
  const { name, email, message, number } = req.body;
  if (!name || !email || !message || !number) {
    return res.status(400).json({ message: "All files are required" });
  }
   if (!/^\d+$/.test(number)) {
    return res.status(400).json({
      message: "The phone number must contain only digits",
    });
  }

  const newContact = await Contact.create({
    name,
    email,
    message,
    number,
  });

  res.status(201).json({
    succes:true,
    message: "Message sent succesfully",
    data: newContact,
  });
})

export const getAllContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    data: contacts,
  });
});

//por id
export const getContactById = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    const error = new Error("Contact not found");
    error.statusCode = 404;
    throw error;
  }
  res.status(200).json({
    success: true,
    data: contact,
  });
});
//eliminar
export const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findByIdAndDelete(req.params.id);
  if (!contact) {
    const error = new Error("Contact not found");
    error.statusCode = 404;
    throw error;
  }

  res.status(200).json({
    message: "Contact deleted succesfully",
    success: true,
    data: contact,
  });
});

//updated
export const updateContact = asyncHandler(async (req, res) => {
    const { name, email, message, number } = req.body;

    const updatedData = {name,email,message,number}

    const contact = await Contact.findByIdAndUpdate(req.params.id,updatedData, {
    returnDocument: "after",
    runValidators: true
  });
  if (!contact) {
    const error = new Error("Contact not found");
    error.statusCode = 404;
    throw error;
  }

  res.status(200).json({
    message: "Contact updated succesfully",
    success: true,
    data: contact,
  });
});
