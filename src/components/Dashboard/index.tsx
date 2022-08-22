import React from "react";
import { useSession, signOut } from "next-auth/react";
import Modal from "~/components/UI/Modal";
import TagsCreation from "./TagsCreation";
import IndeedResultList from "./IndeedResultList";

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

export function Dashboard() {
  // const { data } = useSession();
  const [indeedData, setIndeedData] = React.useState<IIndeedDataResponse>();
  const [shouldCloseModal, setShouldCloseModal] = React.useState(false);

  React.useEffect(() => {
    if (indeedData) {
      setShouldCloseModal(true);
    }
  }, [indeedData]);

  return (
    <div className="max-w-6xl mx-auto">
      <div>
        <div className="navbar justify-between bg-base-100">
          <a className="btn btn-ghost normal-case text-xl">DataTrak</a>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="btn btn-ghost btn-sm normal-case"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="flex items-center justify-end mt-2">
        <Modal
          modalButtonText="New Search"
          tooltip="Start a new Search"
          closeOnDataPropagation={shouldCloseModal}
        >
          <div className="text-2xl font-semibold mb-2">Start New Search</div>
          <TagsCreation setIndeedData={setIndeedData} />
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
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
