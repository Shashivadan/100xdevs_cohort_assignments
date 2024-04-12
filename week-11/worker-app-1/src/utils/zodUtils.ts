import { z } from "zod";

const signupScheme = z.object({
  username: z.string().min(4),
  email: z.string().email(),
  password: z.string().min(4),
});

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});
export { signupScheme, signInSchema };
