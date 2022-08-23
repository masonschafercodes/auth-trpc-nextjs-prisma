import React from "react";
import {signOut, useSession} from "next-auth/react";
import Modal from "~/components/UI/Modal";
import TagsCreation from "./TagsCreation";
import IndeedResultList from "./IndeedResultList";
import {trpc} from "~/utils/trpc";
import {getClearbitIntegrationKey, isClearbitEnabled} from "~/Integrations/Clearbit";
import {Session} from "next-auth";

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
}

interface ISavedSearch {
    createdAt: string;
    id: string;
    query: string;
    result: IIndeedDataResult[];
}

export function Dashboard() {
    const { data: session } = useSession();
    const [indeedData, setIndeedData] = React.useState<IIndeedDataResponse>();
    const [shouldCloseModal, setShouldCloseModal] = React.useState(false);
    const [savedSearches, setSavedSearches] = React.useState<ISavedSearch[]>([]);

    React.useEffect(() => {
        if (indeedData) {
            setShouldCloseModal(true);
        }
    }, [indeedData]);

    const {
        data: IntegrationsData
    } = trpc.useQuery(["integrations.getIntegrations"])

    const { data: SavedSearchData, isLoading: isSavedSearchesLoading, refetch: refetchSavedSearches } = trpc.useQuery(["keywords.get", { userId: session?.user?.email as string }], {
        refetchOnWindowFocus: false,
        onSuccess: (data: any) => {
            data.result.map((savedSearch: any) => {
                setSavedSearches(prevSavedSearches => [...prevSavedSearches, {
                    createdAt: savedSearch.createdAt,
                    id: savedSearch.id,
                    query: savedSearch.query,
                    result: JSON.parse(savedSearch.result)
                }]);
            })
        }
    });

    //

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
                    modalName="indeed-search"
                    closeOnDataPropagation={shouldCloseModal}
                >
                    <div className="text-2xl font-semibold mb-2">Start New Search</div>
                    <TagsCreation integrationsEnabled={IntegrationsData !== undefined ? IntegrationsData : []}
                                  setIndeedData={setIndeedData} refetchSavedSearches={refetchSavedSearches}/>
                </Modal>
            </div>
            <div className="my-12 flex flex-col justify-center items-center w-full">
                {isSavedSearchesLoading ? <div>Loading...</div> : (
                    <div>
                        <div className="text-2xl font-semibold mb-2">Saved Searches</div>
                        <div className="flex flex-col gap-2">
                            {savedSearches.map((savedSearch: ISavedSearch) => (
                                <div key={savedSearch.id} className="flex flex-col gap-2">
                                    <div className="text-2xl font-semibold mb-2">{savedSearch.query}</div>
                                    <code>{JSON.stringify(savedSearch.result, null, 2)}</code>
                                    <div className="text-sm text-gray-600">{savedSearch.createdAt}</div>
                                </div>
))}
                    </div>
                </div>
                )}
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
                                isClearbitEnabled={isClearbitEnabled(IntegrationsData ?? [])}
                                clearbitIntegrationKey={getClearbitIntegrationKey(IntegrationsData ?? [])}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
