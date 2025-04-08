"use client";
import { Dialog } from "primereact/dialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { ICustomDialogProps } from "@/lib/utils/interfaces";


export default function CustomDialog({
  visible,
  onHide,
  children,
  width = "450px",
  height = "auto",
  showCloseButton = true,
  className = "",
}: ICustomDialogProps) {
  return (
    <Dialog
      visible={visible}
      onHide={onHide}
      dismissableMask
      showHeader={false}
      className={`w-full mx-4 md:mx-auto  ${className}`}
      contentClassName="p-0 rounded-xl"
      style={{ maxWidth: width, borderRadius: "0.75rem", height: height }}
    >
      <div className="relative">
        {/* Close button */}
        {showCloseButton && (
          <span
            onClick={onHide}
            className="absolute cursor-pointer right-4 top-4 z-10 w-8 h-8 flex items-center justify-center rounded-full text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <FontAwesomeIcon icon={faCircleXmark} />
          </span>
        )}

        {/* Just render the children passed to the dialog */}
        {children}
      </div>
    </Dialog>
  );
}