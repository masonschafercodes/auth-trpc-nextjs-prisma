import React from "react";
import {signOut} from "next-auth/react";
import Modal from "~/components/UI/Modal";
import TagsCreation from "./TagsCreation";
import IndeedResultList from "./IndeedResultList";
import {trpc} from "~/utils/trpc";

interface IIndeedDataResponse {
    status: number;
    message: string;
    result: IIndeedDataResult[];
}

export interface IIndeedDataResult {
    title: string;
    companyName: string;
    ratingNumber: string;
    location: string;
    jobLink: string;
    clearbitData: Object[];
}

// interface IClearbitData {
//     "id": string;
//     "name": string;
//     "legalName": string;
//     "domain": string;
//     "domainAliases": string[];
//     "site": {
//         "phoneNumbers": string[],
//         "emailAddresses": string[],
//     },
//     "category": {
//         "sector": string;
//         "industryGroup": string;
//         "industry": string;
//         "subIndustry": string;
//         "sicCode": string;
//         "naicsCode": string;
//     },
//     "tags": string[];
//     "description": string;
//     "foundedYear": number;
//     "location": string;
//     "timeZone": string;
//     "utcOffset": number;
//     "geo": {
//         "streetNumber": string;
//         "streetName": string;
//         "subPremise": string | null;
//         "city": string;
//         "postalCode": string;
//         "state": string;
//         "stateCode": string;
//         "country": string;
//         "countryCode": string;
//         "lat": number;
//         "lng": number;
//     },
//     "logo": string;
//     "facebook": {
//         "handle": string | null;
//     },
//     "linkedin": {
//         "handle": string | null;
//     },
//     "twitter": {
//         "handle": string;
//         "id": string;
//         "bio": string;
//         "followers": number;
//         "following": number;
//         "location": string;
//         "site": string;
//         "avatar": string;
//     },
//     "crunchbase": {
//         "handle": string | null;
//     },
//     "emailProvider": boolean;
//     "type": string;
//     "ticker": string | null;
//     "identifiers": {
//         "usEIN": string | null;
//     },
//     "phone": string | null;
//     "indexedAt": string;
//     "metrics": {
//         "alexaUsRank": number;
//         "alexaGlobalRank": number;
//         "employees": number;
//         "employeesRange": string;
//         "marketCap": number | null;
//         "raised": number;
//         "annualRevenue": number | null;
//         "estimatedAnnualRevenue": string | null;
//         "fiscalYearEnd": number | null;
//     },
//     "tech": string[];
//     "techCategories": string[];
//     "parent": {
//         "domain": string | null;
//     },
//     "ultimateParent": {
//         "domain": string | null;
//     }
// }

export function Dashboard() {
    // const { data } = useSession();
    const [indeedData, setIndeedData] = React.useState<IIndeedDataResponse>();
    const [shouldCloseModal, setShouldCloseModal] = React.useState(false);

    React.useEffect(() => {
        if (indeedData) {
            setShouldCloseModal(true);
        }
    }, [indeedData]);

    const {
        isLoading,
        isLoadingError,
        error,
        isError,
        data: IntegrationsData
    } = trpc.useQuery(["integrations.getIntegrations"])

    return (
        <div className="max-w-6xl mx-auto">
            <div>
                <div className="navbar justify-between bg-base-100">
                    <a className="btn btn-ghost normal-case text-xl">DataTrak</a>
                    <div className='flex gap-2'>
                        <a href='/profile' className="btn btn-ghost btn-sm normal-case">
                            Profile
                        </a>
                        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                        <a href='/dashboard' className="btn btn-ghost btn-sm normal-case">
                            Dashboard
                        </a>
                        <button
                            onClick={() => signOut({callbackUrl: "/"})}
                            className="btn btn-ghost btn-sm normal-case"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-end mt-2">
                <Modal
                    modalButtonText="New Search"
                    tooltip="Start a new Search"
                    closeOnDataPropagation={shouldCloseModal}
                >
                    <div className="text-2xl font-semibold mb-2">Start New Search</div>
                    <TagsCreation integrationsEnabled={IntegrationsData !== undefined ? IntegrationsData : []}
                                  setIndeedData={setIndeedData}/>
                </Modal>
            </div>
            <div className="my-12 flex flex-col justify-center items-center w-full">
                {!indeedData ? (
                    <h1 className="text-sm font-semibold text-gray-600">
                        No jobs searched yet!
                    </h1>
                ) : (
                    <div className="space-y-2 w-full">
                        {indeedData.result.map((result, index) => (
                            <IndeedResultList
                                key={index}
                                title={result.title}
                                jobLink={result.jobLink}
                                location={result.location}
                                ratingNumber={result.ratingNumber}
                                companyName={result.companyName}
                                clearbitData={result.clearbitData}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
