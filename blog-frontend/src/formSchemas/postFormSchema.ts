import { z } from 'zod';

export const postFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
});

export type PostFormData = z.infer<typeof postFormSchema>;
