/** 
    This is the main router for the tRPC server.
*/

import createRouter from "~/utils/createTRPCRouter";
import { authRouter } from "./authRouter";
import { keywordsRouter } from "./keywordsRouter";

export const serverRouter = createRouter()
  .merge("auth.", authRouter)
  .merge("keywords.", keywordsRouter);

export type ServerRouter = typeof serverRouter;
