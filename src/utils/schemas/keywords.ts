import * as z from "zod";

export const keywordSchema = z.object({
  keyword: z.string().min(1).max(20),
});

export const keywordsSchema = z.array(keywordSchema);

export type IKeyword = z.infer<typeof keywordSchema>;
