import React from "react";

interface Props {
  modalButtonText: string;
  children: React.ReactNode;
  tooltip?: string;
}

export default function Modal({ modalButtonText, children, tooltip }: Props) {
  return (
    <>
      <div>
        <div className="tooltip" data-tip={tooltip ?? "Open"}>
          <label htmlFor="my-modal-4" className="btn">
            {modalButtonText}
          </label>
        </div>

        <input type="checkbox" id="my-modal-4" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box relative border border-gray-600">
            <label
              htmlFor="my-modal-4"
              className="btn btn-xs btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
            <div>{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
