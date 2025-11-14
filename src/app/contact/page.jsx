import ContactForm from '@/components/contact-form';

export const metadata = {
  title: 'Contact Me | Robyn Portfolio',
  description: 'Get in touch with me for collaborations, questions, or opportunities.',
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Contact Me</h1>
        <p className="text-lg text-muted-foreground">
          Have a question? I'd love to hear from you.
        </p>
      </div>

      <ContactForm />
    </div>
  );
}
