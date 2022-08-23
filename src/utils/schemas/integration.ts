import * as z from "zod";

export const integrationFindSchema = z.object({
    companyName: z.string().min(1),
    apiKey: z.string().min(1),
});

export type IIntegrationFind = z.infer<typeof integrationFindSchema>;