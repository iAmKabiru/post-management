import { z } from 'zod';

export const commentFormSchema = z.object({
  // postId: z.number().min(1, 'Post ID is required'),
  content: z.string().min(1, 'Content is required'),
});

export type CommentFormData = z.infer<typeof commentFormSchema>;