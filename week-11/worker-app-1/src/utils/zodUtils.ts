import { z } from "zod";

const signupScheme = z.object({
  username: z.string().min(4),
  email: z.string().email(),
  password: z.string().min(4),
});

export { signupScheme };
