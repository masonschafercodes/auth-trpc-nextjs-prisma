import { Dashboard } from "~/components/Dashboard";

import { requireAuth } from "~/utils/requireAuth";
import {getSession} from "next-auth/react";

export const getServerSideProps = requireAuth(async  (ctx) => {
    return {
        props: {
        }
    };
});

export default Dashboard;
