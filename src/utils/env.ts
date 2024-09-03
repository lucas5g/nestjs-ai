import { z } from 'zod';
import 'dotenv/config';

export const env = z
  .object({
    GROQ_API_KEY: z.string(),
  })
  .parse(process.env);
