import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000),
});

export async function POST(req) {
  try {
    const body = await req.json();

    const validationResult = contactSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          ok: false,
          message: 'Invalid input data',
          errors: validationResult.error.errors
        },
        { status: 400 }
      );
    }

    const { name, email, message } = validationResult.data;

    const { data, error } = await resend.batch.send([
      {
        from: process.env.RESEND_FROM_EMAIL,
        to: process.env.CONTACT_EMAIL,
        replyTo: email,
        subject: `New contact form message from ${name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>From:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `,
        text: `
New Contact Form Submission

From: ${name}
Email: ${email}

Message:
${message}
        `,
      },
      {
        from: process.env.RESEND_FROM_EMAIL,
        to: email,
        subject: 'Thanks for reaching out!',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Thanks for getting in touch, ${name}!</h2>
            <p>I've received your message and will get back to you as soon as possible.</p>

            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0;">Your message:</h3>
              <p style="white-space: pre-wrap;">${message}</p>
            </div>

            <p>Best regards,<br>Robyn</p>
          </div>
        `,
        text: `
Hi ${name},

Thanks for getting in touch! I've received your message and will get back to you as soon as possible.

Your message:
${message}

Best regards,
Robyn
        `,
      },
    ]);

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        {
          ok: false,
          message: 'Failed to send email. Please try again later.'
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        ok: true,
        message: 'Email sent successfully',
        data
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      {
        ok: false,
        message: 'An unexpected error occurred. Please try again.'
      },
      { status: 500 }
    );
  }
}

export function GET() {
  return NextResponse.json(
    { error: 'Method Not Allowed' },
    { status: 405 }
  );
}

export function PUT() {
  return NextResponse.json(
    { error: 'Method Not Allowed' },
    { status: 405 }
  );
}

export function DELETE() {
  return NextResponse.json(
    { error: 'Method Not Allowed' },
    { status: 405 }
  );
}
