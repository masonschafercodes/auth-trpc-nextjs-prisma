import { ArrowSquareOut, Sparkle } from "phosphor-react";
import React from "react";
import { IIndeedDataResult } from ".";
import TagsCreation from "~/components/Dashboard/TagsCreation";
import Modal from "~/components/UI/Modal";
import ClearbitEnrichment from "~/components/Dashboard/ClearbitEnrichment";

interface Props extends IIndeedDataResult {
  isClearbitEnabled: boolean;
  clearbitIntegrationKey: string;
}

export default function IndeedResultList(props: Props) {
  return (
    <div className="p-3 rounded-xl border-2 border-gray-700 w-full">
      <div className="flex items-center justify-between">
        <div className="flex flex-col justify-center gap-2">
          <div>
            <h1 className="font-semibold text-gray-300">{props.title}</h1>
            <p className="font-medium text-gray-500 text-sm italic">
              {props.companyName}
            </p>
            <p className="font-medium text-gray-500 text-sm">
              {props.location}
            </p>
          </div>
          <span className="flex gap-2 items-center">
            <Sparkle size={14} className="text-yellow-200" />
            <p className="text-sm font-medium text-gray-500">
              {props.ratingNumber ? props.ratingNumber : "Not Rated"}
            </p>
          </span>
        </div>
        <a
          href={`${props.jobLink}`}
          className="btn btn-ghost"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ArrowSquareOut size={18} className="text-gray-200" />
        </a>
      </div>
      {props.isClearbitEnabled && (
          <div className='mt-2'>
            <Modal
                modalButtonText="See Enrichment Data"
                tooltip={`See Enrichment Data for ${props.title}`}
                modalName={`enrichment-modal-${props.title}`}
            >
              <div className="text-2xl font-semibold mb-2">Enrichment</div>
              <div className='mt-3'>
                <ClearbitEnrichment companyName={props.companyName} apiKey={props.clearbitIntegrationKey} />
              </div>
            </Modal>
          </div>
      )}
    </div>
  );
}
