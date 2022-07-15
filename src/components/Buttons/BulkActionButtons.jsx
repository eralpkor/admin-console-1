import { BulkDeleteButton, usePermissions } from "react-admin";

export const BulkActionButtons = () => {
  const { permissions } = usePermissions();

  return (
    <>
      {/* default bulk delete action */}
      {permissions === "admin" && <BulkDeleteButton />}
      {/* <ResetViewsButton label="Reset Views" /> */}
    </>
  );
};
