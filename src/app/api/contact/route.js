import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: 'Missing fields' }),
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER, // Your Gmail address
        pass: process.env.GMAIL_PASS  // App-specific password
      }
    });

    // Send email
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: 'sudhakars2609@gmail.com',
      subject: `New message from ${name}`,
      html: `
        <h3>New Contact Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    });

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200 }
    );

  } catch (error) {
    console.error('Email send error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to send message' }),
      { status: 500 }
    );
  }
}
