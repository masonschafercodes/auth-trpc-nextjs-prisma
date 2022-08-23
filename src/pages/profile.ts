import { Profile } from "~/components/Profile";

import { requireAuth } from "~/utils/requireAuth";

export const getServerSideProps = requireAuth(async  (ctx) => {
    return {
        props: {}
    };
});

export default Profile;