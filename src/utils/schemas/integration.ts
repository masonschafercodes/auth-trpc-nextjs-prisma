import * as z from "zod";

export const integrationFindSchema = z.object({
  companyName: z.string().min(1),
  apiKey: z.string().min(1),
});

export const integrationCreateSchema = z.object({
  type: z.string().min(1),
  token: z.string().min(1),
  userId: z.string().min(1),
});

export type IIntegrationFind = z.infer<typeof integrationFindSchema>;
export type IIntegrationCreate = z.infer<typeof integrationCreateSchema>;
