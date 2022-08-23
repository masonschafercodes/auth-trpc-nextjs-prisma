import * as z from "zod";

export const keywordSearchSchema = z.object({
  username: z.string().min(1).max(100),
  shouldSave: z.boolean().default(false),
  userId: z.string().optional(),
});


export type IKeywordSearch = z.infer<typeof keywordSearchSchema>;
