
"use server";

import { z } from "zod";
import { getAuth } from "firebase/auth";
import { initializeFirebase } from "@/firebase";
import { addDoc, collection, getFirestore } from "firebase/firestore";

// Schema for booking form
const bookingSchema = z.object({
  userId: z.string(),
  firstName: z.string().min(1, "First name is required."),
  lastName: z.string().min(1, "Last name is required."),
  email: z.string().email("Invalid email address."),
  phone: z.string().min(1, "Phone number is required."),
  bookingDate: z.string().min(1, "Booking date is required."),
  serviceType: z.string().min(1, "Please select a service."),
  startTime: z.string().min(1, "Start time is required."),
  startAmPm: z.string().min(1, "Please select AM or PM."),
  endTime: z.string().min(1, "End time is required."),
  endAmPm: z.string().min(1, "Please select AM or PM."),
  details: z.string().optional(),
});

export async function handleBookingForm(formData: FormData) {
  const validatedFields = bookingSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please correct the errors below.",
    };
  }

  // The Firestore submission logic has been removed as requested.
  // You can now implement your own backend logic (e.g., with PHP).
  
  // The validated data is available in validatedFields.data
  // For example: const bookingData = validatedFields.data;

  return {
    message: "Your booking request has been received! We will contact you shortly to confirm.",
    errors: null,
  };
}

export async function getFaqs() {
  // The AI call has been removed. Returning static FAQs.
  return [
    {
      question: "What areas do you service?",
      answer: "We proudly serve all suburbs in Canberra.",
    },
    {
      question: "What are your operating hours?",
      answer: "Our operating hours are from 8:00 AM to 4:00 PM, Monday to Friday.",
    },
    {
      question: "How is pricing determined?",
      answer: "We charge hourly rates for our services. For a detailed quote, please fill out our contact form, and we will get in touch with you.",
    },
    {
      question: "What services do you offer?",
      answer: "We offer Shopping Assistance, Domestic Assistance, Transport & Appointments, Companion Support, and Welfare checks."
    },
    {
      "question": "Are your companions trained and background-checked?",
      "answer": "Yes, all our companions are trained, background-checked, and certified in First Aid and CPR for your peace of mind."
    }
  ];
}
