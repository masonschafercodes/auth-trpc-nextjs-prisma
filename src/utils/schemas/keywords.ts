import * as z from "zod";

export const keywordSchema = z.object({
  keyword: z.string().min(1).max(20),
});

export type IKeyword = z.infer<typeof keywordSchema>;
