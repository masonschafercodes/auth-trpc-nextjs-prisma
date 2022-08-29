import React from "react";
import { signOut, useSession } from "next-auth/react";
import Modal from "~/components/UI/Modal";
import TagsCreation from "./TagsCreation";
import IndeedResultList from "./IndeedResultList";
import { trpc } from "~/utils/trpc";
import {
  getClearbitIntegrationKey,
  isClearbitEnabled,
} from "~/Integrations/Clearbit";
import SavedSearch from "~/components/UI/SavedSearch";
import { Eye, EyeSlash } from "phosphor-react";

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

export interface ISavedSearch {
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
  const [showSavedSearches, setShowSavedSearches] = React.useState(false);

  React.useEffect(() => {
    if (indeedData) {
      setShouldCloseModal(true);
    }
  }, [indeedData]);

  const { data: IntegrationsData } = trpc.useQuery([
    "integrations.getIntegrations",
  ]);

  const { isLoading: isSavedSearchesLoading, refetch: refetchSavedSearches } =
    trpc.useQuery(
      ["keywords.get", { userId: session?.user?.email as string }],
      {
        refetchOnWindowFocus: false,
        onSuccess: (data: any) => {
          data.result.map((savedSearch: any) => {
            setSavedSearches((prevSavedSearches) => [
              ...prevSavedSearches,
              {
                createdAt: savedSearch.createdAt,
                id: savedSearch.id,
                query: savedSearch.query,
                result: JSON.parse(savedSearch.result),
              },
            ]);
          });
        },
      }
    );

  return (
    <div className="max-w-6xl mx-auto">
      <div>
        <div className="navbar justify-between bg-base-100">
          <a className="btn btn-ghost normal-case text-xl">DataTrak</a>
          <div className="flex gap-2">
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/profile" className="btn btn-ghost btn-sm normal-case">
              Profile
            </a>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/dashboard" className="btn btn-ghost btn-sm normal-case">
              Dashboard
            </a>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
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
          <TagsCreation
            integrationsEnabled={
              IntegrationsData !== undefined ? IntegrationsData : []
            }
            setIndeedData={setIndeedData}
            refetchSavedSearches={refetchSavedSearches}
          />
        </Modal>
      </div>
      <div className="text-lg font-semibold text-gray-500 mb-2 flex gap-2 items-center">
        Saved Searches
        <div>
          <button
            className="btn btn-circle btn-ghost"
            onClick={() => setShowSavedSearches(!showSavedSearches)}
          >
            {showSavedSearches ? (
              <EyeSlash className="w-6 h-6" />
            ) : (
              <Eye className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>
      <div className="my-2 flex flex-col justify-center items-center w-full">
        {isSavedSearchesLoading ? null : (
          <>
            {showSavedSearches && (
              <div className="w-full">
                <div className="flex flex-col gap-2">
                  {savedSearches
                    .slice(0, 3)
                    .map((savedSearch: ISavedSearch) => (
                      <SavedSearch
                        key={savedSearch.id}
                        savedSearch={savedSearch}
                      />
                    ))}
                </div>
              </div>
            )}
          </>
        )}
        <div className="w-full">
          <div className="divider"></div>
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
                  clearbitIntegrationKey={getClearbitIntegrationKey(
                    IntegrationsData ?? []
                  )}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
