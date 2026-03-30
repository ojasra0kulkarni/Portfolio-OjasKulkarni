import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    // Check if Resend API key is available
    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) {
      // In development without API key, just log and return success
      console.log('Contact form submission:', { name, email, subject, message });
      return NextResponse.json({ success: true });
    }

    const { Resend } = await import('resend');
    const resend = new Resend(resendKey);

    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'ojas.v.kulkarni@gmail.com',
      subject: `[Portfolio] ${subject}: ${name}`,
      html: `
        <h3>New Portfolio Contact</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }
}
