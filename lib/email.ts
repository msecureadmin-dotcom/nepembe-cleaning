import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendQuoteEmail(data: {
  name: string;
  phone: string;
  email: string;
  service: string;
  location: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
}) {
  const adminEmail = process.env.ADMIN_EMAIL || "msecure.admin@gmail.com";

  const html = `
    <h2>New Cleaning Quote Request</h2>
    <table style="border-collapse:collapse;width:100%">
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Name</td><td style="padding:8px;border:1px solid #ddd">${data.name}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Phone</td><td style="padding:8px;border:1px solid #ddd">${data.phone}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #ddd">${data.email}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Service</td><td style="padding:8px;border:1px solid #ddd">${data.service}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Location</td><td style="padding:8px;border:1px solid #ddd">${data.location}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Preferred Date</td><td style="padding:8px;border:1px solid #ddd">${data.preferredDate}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Preferred Time</td><td style="padding:8px;border:1px solid #ddd">${data.preferredTime}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Message</td><td style="padding:8px;border:1px solid #ddd">${data.message}</td></tr>
    </table>
  `;

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: adminEmail,
    subject: `Cleaning Quote Request from ${data.name}`,
    html,
  });
}
