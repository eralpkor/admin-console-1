import { BulkDeleteButton, usePermissions } from "react-admin";

export const BulkActionButtons = () => {
  const { permissions } = usePermissions();

  return (
    <>
      {/* default bulk delete action */}
      <BulkDeleteButton />
      {/* <ResetViewsButton label="Reset Views" /> */}
    </>
  );
};
