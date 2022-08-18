import NextAuth from "next-auth";

import { nextAuthOptions } from "~/utils/nauth";

export default NextAuth(nextAuthOptions);