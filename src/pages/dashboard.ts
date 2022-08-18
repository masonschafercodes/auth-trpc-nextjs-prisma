import { Dashboard } from "~/components/Dashboard";

import { requireAuth } from "~/utils/requireAuth";

export const getServerSideProps = requireAuth(async  (ctx) => {
    return {
        props: {}
    };
});

export default Dashboard;
