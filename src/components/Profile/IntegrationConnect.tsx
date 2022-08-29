import React from "react";
import Modal from "~/components/UI/Modal";
import ClearbitIntegrationSetup from "./ClearbitIntegrationSetup";

interface Props {
  integrationName: string;
  integrationDescription: string;
  integrationImage: string;
  isConnected: boolean;
}

export default function IntegrationConnect(props: Props) {
  return (
    <div className="p-3 border border-gray-600 rounded-xl shadow">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={props.integrationImage}
              alt={`integration image for ${props.integrationName}`}
              className="w-12 h-12 rounded"
            />
            <strong>{props.integrationName}</strong>
          </div>
          <div>
            <input
              type="checkbox"
              className="toggle toggle-sm hover:cursor-not-allowed"
              checked={props.isConnected}
              readOnly
            />
          </div>
        </div>
        <div className="mt-2">
          <p className="text-xs text-gray-500">
            {props.integrationDescription}
          </p>
        </div>
        <div className="mt-2">
          {props.isConnected ? (
            <button className="btn btn-sm normal-case">Configure</button>
          ) : (
            <Modal
              modalButtonText="Setup Integration"
              tooltip={`Setup ${props.integrationName} Integration`}
              modalName={`integration-setup-modal-${props.integrationName}`}
            >
              <ClearbitIntegrationSetup />
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
}
