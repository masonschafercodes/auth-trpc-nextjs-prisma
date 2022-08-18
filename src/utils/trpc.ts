import { createReactQueryHooks } from "@trpc/react";
import { ServerRouter } from "~/server/routers/app";

export const trpc = createReactQueryHooks<ServerRouter>();
