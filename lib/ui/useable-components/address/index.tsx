import { Dialog } from "primereact/dialog";
import React from "react";

export default function UserAddressComponent() {
  return (
    <Dialog
      header="Welcome!"
      showHeader={false}
      visible={true}
      onHide={() => {}}
      className="lg:w-1/3 w-full h-auto"
    >
      <div>
        <div>HEADER</div>
      </div>
    </Dialog>
  );
}
