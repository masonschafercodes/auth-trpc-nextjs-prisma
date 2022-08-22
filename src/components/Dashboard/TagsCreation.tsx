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
      const result = await mutateAsync(data);

      if (result.status === 201) {
        setIndeedData(result);
        setTwitterUsername(undefined);
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
          disabled={!twitterUsername}
          onClick={() =>
            handleSubmitTwitterUsername(twitterUsername as ITwitterUsername)
          }
        >
          Start Search
        </button>
      </div>
    </>
  );
}
