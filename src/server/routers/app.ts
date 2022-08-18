/** 
    This is the main router for the tRPC server.
*/

import createRouter from "~/utils/createTRPCRouter";
import { authRouter } from "./authRouter";

export const serverRouter = createRouter().merge("auth.", authRouter);

export type ServerRouter = typeof serverRouter;
