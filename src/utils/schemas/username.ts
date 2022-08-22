import * as z from "zod";

export const twitterUsernameSchema = z.object({
  username: z.string().min(1).max(20),
});

export type ITwitterUsername = z.infer<typeof twitterUsernameSchema>;
