import * as trpc from "@trpc/server";
import { Context } from "~/server/context";

const createRouter = () => {
  return trpc.router<Context>();
};

export default createRouter;
