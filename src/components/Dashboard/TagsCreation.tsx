import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { IKeyword, keywordSchema } from "~/utils/schemas/keywords";

export default function TagsCreation() {
  const [keywords, setKeywords] = React.useState<IKeyword[]>([]);

  const { register, handleSubmit, resetField } = useForm<IKeyword>({
    resolver: zodResolver(keywordSchema),
  });

  const onSubmit = useCallback(
    async (data: IKeyword) => {
      setKeywords([...keywords, data]);
      resetField("keyword");
    },
    [keywords, resetField]
  );

  const handleRemoveKeywordFromList = (keyword: IKeyword) => {
    setKeywords(keywords.filter((k) => k.keyword !== keyword.keyword));
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="form-control w-full">
          <input
            type="text"
            placeholder="keywords"
            disabled={keywords.length >= 5}
            className="input input-bordered w-full"
            {...register("keyword")}
          />
          <label className="label">
            <span className="label-text-alt text-gray-600">
              Add up to 5 tags for the search
            </span>
          </label>
        </div>
      </form>
      <div className="my-4 space-y-2">
        <h3 className="font-semibold">Tags</h3>
        {keywords.length > 0 ? (
          <div className=" flex items-center gap-2">
            {keywords.map((keyword, index) => (
              <div key={index} className="flex items-center">
                <div
                  aria-label={keyword.keyword}
                  className="bg-gray-700 hover:bg-red-500 hover:cursor-pointer p-1 rounded-lg font-semibold text-xs"
                  onClick={() => handleRemoveKeywordFromList(keyword)}
                >
                  {keyword.keyword}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-sm text-gray-700">No tags yet</div>
        )}
      </div>
    </>
  );
}
