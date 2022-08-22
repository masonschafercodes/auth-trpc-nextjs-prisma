import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import {
  ITwitterUsername,
  twitterUsernameSchema,
} from "~/utils/schemas/username";
import { trpc } from "~/utils/trpc";

interface Props {
  setIndeedData: React.Dispatch<any>;
}

export default function TagsCreation({ setIndeedData }: Props) {
  const [twitterUsername, setTwitterUsername] =
    React.useState<ITwitterUsername>();
  const [isLoading, setIsLoading] = React.useState(false);

  const { register, handleSubmit, resetField } = useForm<ITwitterUsername>({
    resolver: zodResolver(twitterUsernameSchema),
  });

  const onSubmit = useCallback(
    async (data: ITwitterUsername) => {
      setTwitterUsername(data);
      resetField("username");
    },
    [resetField]
  );

  const handleRemoveKeywordFromList = () => {
    setTwitterUsername(undefined);
  };

  const { mutateAsync } = trpc.useMutation(["keywords.create"]);

  const handleSubmitTwitterUsername = useCallback(
    async (data: ITwitterUsername) => {
      try {
        setIsLoading(true);
        const result = await mutateAsync(data);

        if (result.status === 201) {
          setIndeedData(result);
          setTwitterUsername(undefined);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    },
    [mutateAsync, setIndeedData]
  );

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="form-control w-full">
          <input
            type="text"
            placeholder="keyword to search"
            disabled={!!twitterUsername}
            className="input input-bordered w-full"
            {...register("username")}
          />
        </div>
      </form>
      <div className="my-4 space-y-2">
        <h3 className="font-semibold">Keyword</h3>
        {twitterUsername ? (
          <div className=" flex items-center gap-2">
            <div className="flex items-center">
              <div
                aria-label={twitterUsername.username}
                className="bg-gray-700 hover:bg-red-500 hover:cursor-pointer p-1 rounded-lg font-semibold text-xs"
                onClick={() => handleRemoveKeywordFromList()}
              >
                {twitterUsername.username}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-sm text-gray-700">No username yet</div>
        )}
      </div>
      <div className="mt-2">
        <button
          className="btn w-full"
          disabled={!twitterUsername || isLoading}
          onClick={() =>
            handleSubmitTwitterUsername(twitterUsername as ITwitterUsername)
          }
        >
          {isLoading && (
            <svg
              role="status"
              className="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="#666B85"
              />
            </svg>
          )}
          Start Search
        </button>
      </div>
    </>
  );
}
