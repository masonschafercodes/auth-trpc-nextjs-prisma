import React from "react";

interface Props {
  modalButtonText: string;
  children: React.ReactNode;
  tooltip?: string;
  closeOnDataPropagation?: boolean;
}

export default function Modal({
  modalButtonText,
  children,
  tooltip,
  closeOnDataPropagation,
}: Props) {
  const modalCheckbox = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (modalCheckbox.current && closeOnDataPropagation) {
      modalCheckbox.current.checked = false;
    }
  }, [modalCheckbox, closeOnDataPropagation]);

  return (
    <>
      <div>
        <div className="tooltip" data-tip={tooltip ?? "Open"}>
          <label htmlFor="my-modal-4" className="btn">
            {modalButtonText}
          </label>
        </div>

        <input
          type="checkbox"
          ref={modalCheckbox}
          id="my-modal-4"
          className="modal-toggle"
        />
        <div className="modal">
          <div className="modal-box relative border border-gray-600 bg-base-300">
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
