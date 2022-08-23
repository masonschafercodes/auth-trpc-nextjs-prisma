import { Profile } from "~/components/Profile";

import { requireAuth } from "~/utils/requireAuth";
import {getSession} from "next-auth/react";
import {prisma} from "~/utils/prisma";
import {Session} from "next-auth";

export const getServerSideProps = requireAuth(async  (ctx) => {
    const session = await getSession(ctx);

    const integrations = await prisma.integration.findMany({
        where: {
            userId: session!.id as string,
        }
    });

    return {
        props: {
            userIntegrations: JSON.parse(JSON.stringify(integrations)),
        }
    };
});

export default Profile;