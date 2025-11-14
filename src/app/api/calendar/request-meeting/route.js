import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);

const meetingRequestSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address'),
  duration: z.string().min(1, 'Please specify desired duration'),
  purpose: z.string().min(10, 'Please provide at least 10 characters').max(500),
});

export async function POST(request) {
  try {
    const body = await request.json();

    const validationResult = meetingRequestSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Invalid input data',
          errors: validationResult.error.errors
        },
        { status: 400 }
      );
    }

    const { name, email, duration, purpose } = validationResult.data;

    const { data, error } = await resend.batch.send([
      {
        from: process.env.RESEND_FROM_EMAIL || 'Portfolio Calendar <onboarding@resend.dev>',
        to: process.env.CONTACT_EMAIL || 'downie.robyn@hotmail.co.uk',
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
        text: `
New Longer Meeting Request

From: ${name}
Email: ${email}
Requested Duration: ${duration}

Purpose:
${purpose}

Received: ${new Date().toLocaleString()}
        `,
      },
      {
        from: process.env.RESEND_FROM_EMAIL || 'Portfolio Calendar <onboarding@resend.dev>',
        to: email,
        subject: 'Meeting Request Received',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Thanks for your meeting request, ${name}!</h2>
            <p>I've received your request for a longer meeting session and will get back to you as soon as possible to schedule it.</p>

            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0;">Meeting Details:</h3>
              <p><strong>Requested Duration:</strong> ${duration}</p>
              <p><strong>Purpose:</strong></p>
              <p style="white-space: pre-wrap;">${purpose}</p>
            </div>

            <p>I'll reach out shortly to confirm a time that works for both of us.</p>

            <p>Best regards,<br>Robyn</p>
          </div>
        `,
        text: `
Hi ${name},

Thanks for your meeting request! I've received your request for a longer meeting session and will get back to you as soon as possible to schedule it.

Meeting Details:
Requested Duration: ${duration}

Purpose:
${purpose}

I'll reach out shortly to confirm a time that works for both of us.

Best regards,
Robyn
        `,
      },
    ]);

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send emails. Please try again later.' },
        { status: 500 }
      );
    }

    console.log('Meeting request emails sent successfully');

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
