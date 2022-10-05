import React from "react";
import { trpc } from "~/utils/trpc";

interface Props {
  companyName: string;
  apiKey: string;
}

export default function ClearbitEnrichment(props: Props) {
  const { data, isLoading, refetch } = trpc.useQuery(
    [
      "integrations.getOneIntegration",
      {
        apiKey: props.apiKey,
        companyName: props.companyName,
      },
    ],
    {
      enabled: false,
    }
  );
  {
    /* This is a comment */
  }
  React.useEffect(() => {
    refetch();
  }, [props.companyName, refetch]);

  return (
    <div>
      {isLoading || !data ? (
        <div>Loading...</div>
      ) : (
        <>
          {data.status === "error" ? (
            <p className="text-sm font-semibold text-gray-500">
              No clearbit data was found
            </p>
          ) : (
            <div className="flex items-center gap-2 mt-4">
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={data.data.logo}
                  alt={`enrichment data image for ${data.data.name}`}
                  className="w-12 h-12 rounded"
                />
              </div>
              <div className="flex flex-col">
                <h3 className="text-gray-300 font-semibold text-xl">
                  {data.data.name}
                </h3>
                <a
                  href={`https://www.${data.data.domain}`}
                  className="italic underline text-gray-600 hover:text-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {data.data.domain}
                </a>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
