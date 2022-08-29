import createRouter from "~/utils/createTRPCRouter";
import {
  integrationCreateSchema,
  integrationFindSchema,
} from "~/utils/schemas/integration";

const Client = require("clearbit").Client;

export const integrationsRouter = createRouter()
  .query("getIntegrations", {
    resolve: async ({ ctx }) => {
      return await ctx.prisma.integration.findMany({
        where: {
          // @ts-ignore
          userId: ctx.session?.user?.id,
        },
      });
    },
  })
  .query("getOneIntegration", {
    input: integrationFindSchema,
    resolve: async ({ ctx, input }) => {
      const clearbit = new Client({ key: input.apiKey });

      const NameToDomain = clearbit.NameToDomain;

      return NameToDomain.find({ name: input.companyName })
        .then((res: any) => {
          return {
            status: "success",
            data: res,
          };
        })
        .catch(function (err: any) {
          return {
            status: "error",
            data: err,
          };
        });
    },
  })
  .mutation("createIntegration", {
    input: integrationCreateSchema,
    resolve: async ({ ctx, input }) => {
      try {
        const integration = await ctx.prisma.integration.create({
          data: {
            type: input.type,
            data: `{"token": "${input.token}"}`,
            user: {
              connect: {
                id: input.userId,
              },
            },
          },
        });

        return {
          status: "success",
          data: integration,
        };
      } catch (e: any) {
        return {
          status: "error",
          data: e.message,
        };
      }
    },
  });
