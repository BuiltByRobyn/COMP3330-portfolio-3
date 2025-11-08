import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, duration, purpose } = body;

    if (!name || !email || !duration || !purpose) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    try {
      await resend.emails.send({
        from: 'Portfolio Calendar <onboarding@resend.dev>', 
        to: 'downie.robyn@hotmail.co.uk',
        replyTo: email, 
        subject: `New Meeting Request from ${name}`,
        html: `
          <h2>New Longer Meeting Request</h2>
          <p><strong>From:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Requested Duration:</strong> ${duration}</p>
          <p><strong>Purpose:</strong></p>
          <p>${purpose.replace(/\n/g, '<br>')}</p>
          <hr>
          <p><em>Received: ${new Date().toLocaleString()}</em></p>
        `,
      });

      console.log('Meeting request email sent successfully');
    } catch (emailError) {
      console.error('Failed to send email:', emailError);
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Meeting request received successfully',
        data: { name, email, duration },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing meeting request:', error);
    return NextResponse.json(
      { error: 'Failed to process meeting request' },
      { status: 500 }
    );
  }
}
