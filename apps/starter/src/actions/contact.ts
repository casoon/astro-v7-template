import { z } from 'astro/zod';
import { defineAction } from 'astro:actions';

export const submitContactForm = defineAction({
  accept: 'form',
  input: z.object({
    name: z.string().min(1, { error: 'Name is required' }).max(100),
    email: z.email('Invalid email format'),
    subject: z.string().min(1, { error: 'Subject is required' }).max(200),
    message: z.string().min(1, { error: 'Message is required' }).max(5000),
  }),
  handler: async () => {
    return { message: 'Message sent successfully.' };
  },
});
