import createRouter from "~/utils/createTRPCRouter";
import {integrationFindSchema} from "~/utils/schemas/integration";

const Client = require('clearbit').Client;

export const integrationsRouter = createRouter()
    .query("getIntegrations", {
        resolve: async ({ctx}) => {
            const userIntegrations = await ctx.prisma.integration.findMany({
                where: {
                    // @ts-ignore
                    userId: ctx.session?.user?.id,
                }
            });
            return userIntegrations;
        }
    })
    .query("getOneIntegration", {
        input: integrationFindSchema,
        resolve: async ({ctx, input}) => {
            const clearbit = new Client({key: input.apiKey});

            const NameToDomain = clearbit.NameToDomain;
            
            return NameToDomain.find({name: input.companyName})
                .then((res: any) => {
                    return {
                        status: "success",
                        data: res
                    }
                })
                .catch(NameToDomain.NotFoundError, function (err: any) {
                    return {
                        status: "error",
                        data: err
                    } // Domain could not be found
                })
                .catch(function (err: any) {
                    return {
                        status: "error",
                        data: err
                    }
                });
        }
    })