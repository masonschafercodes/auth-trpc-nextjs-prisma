import * as trpc from "@trpc/server";
import { hash } from "argon2";

import { signUpSchema } from "~/utils/auth";
import createRouter from "~/utils/createTRPCRouter";

export const authRouter = createRouter().mutation("signup", {
  input: signUpSchema,
  resolve: async ({ input, ctx }) => {
    const { username, email, password } = input;

    const exists = await ctx.prisma.user.findFirst({
      where: { email },
    });

    if (exists) {
      throw new trpc.TRPCError({
        code: "CONFLICT",
        message: "User with that email already exists",
      });
    }

    const hashedPassword = await hash(password);

    const result = await ctx.prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    return {
      status: 201,
      message: "Account Created",
      result: result.email,
    };
  },
});
