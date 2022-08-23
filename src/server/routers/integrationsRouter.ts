import createRouter from "~/utils/createTRPCRouter";

export const integrationsRouter = createRouter().query("getIntegrations", {
    resolve: async ({ ctx }) => {
        const userIntegrations = await ctx.prisma.integration.findMany({
            where: {
        // @ts-ignore
                userId: ctx.session?.user?.id,
            }
        });
        return userIntegrations;
    }
})