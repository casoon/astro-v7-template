import { z } from 'astro/zod';
import { defineAction } from 'astro:actions';

const contactMessageSchema = z.object({
  name: z.string().min(1, { error: 'Name is required' }).max(100),
  email: z.email('Invalid email format'),
  subject: z.string().min(1, { error: 'Subject is required' }).max(200),
  message: z.string().min(1, { error: 'Message is required' }).max(5000),
});

type ContactMessage = z.infer<typeof contactMessageSchema>;

/**
 * Delivery hook — the template ships without a mail provider.
 * Replace the body with your provider call (Cloudflare Email Service, Resend, a queue, …)
 * and return `true` once the message was actually handed off. While this returns `false`,
 * the contact page tells visitors that the form is a demo.
 */
async function deliverContactMessage(message: ContactMessage): Promise<boolean> {
  if (import.meta.env.DEV) {
    console.info('[contact] Not delivered (no provider configured):', message.subject);
  }
  return false;
}

export const submitContactForm = defineAction({
  accept: 'form',
  input: contactMessageSchema.extend({
    // Honeypot: visually hidden field that only bots fill in.
    website: z.string().max(200).optional(),
  }),
  handler: async ({ website, ...message }) => {
    // Pretend success so bots get no signal, but drop the message.
    if (website) return { delivered: true };
    return { delivered: await deliverContactMessage(message) };
  },
});
