import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const data = await req.json();

    const {
      firstName,
      lastName,
      email,
      phone,
      countryCode,
      bookingDate,
      serviceType,
      startTime,
      startAmPm,
      endTime,
      endAmPm,
      details,
      userId
    } = data;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MY_GMAIL,
        pass: process.env.MY_GMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.MY_GMAIL,
      to: process.env.MY_GMAIL,
      subject: `New Booking Request from ${firstName} ${lastName}`,
      html: `
        <h2>New Booking Request</h2>

        <p><strong>User ID:</strong> ${userId}</p>

        <h3>Personal Details</h3>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${countryCode} ${phone}</p>

        <h3>Booking Details</h3>
        <p><strong>Date:</strong> ${bookingDate}</p>
        <p><strong>Service Type:</strong> ${serviceType}</p>
        <p><strong>Time:</strong> ${startTime} ${startAmPm} - ${endTime} ${endAmPm}</p>

        <h3>Additional Notes</h3>
        <p>${details}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return Response.json({ success: true, message: "Booking sent successfully!" });
  } catch (error) {
    console.error("MAIL ERROR:", error);
    return Response.json({ success: false, message: "Server error sending email." });
  }
}
