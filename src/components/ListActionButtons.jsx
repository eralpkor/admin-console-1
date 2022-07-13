import {
  TopToolbar,
  FilterButton,
  CreateButton,
  ExportButton,
  Button,
  usePermissions,
  useListContext,
  DeleteButton,
} from "react-admin";
import IconEvent from "@mui/icons-material/Event";

export const ListActionButtons = () => {
  const { total, isLoading } = useListContext();
  const { permissions } = usePermissions();
  return (
    <TopToolbar>
      {permissions === "admin" && <CreateButton />}
      <ExportButton />
      <DeleteButton />
      {/* Add your custom actions */}
    </TopToolbar>
  );
};
