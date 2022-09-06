import {
  TopToolbar,
  CreateButton,
  ExportButton,
  usePermissions,
  TextInput,
  FilterButton,
  FilterForm,
} from "react-admin";
import { Stack } from "@mui/material";

export const ListActionButtons = () => {
  const { permissions } = usePermissions();
  return (
    <>
      <TopToolbar>
        {permissions === "user" ? null : <CreateButton />}
        <ExportButton />
        {/* Add your custom actions */}
      </TopToolbar>
    </>
  );
};
