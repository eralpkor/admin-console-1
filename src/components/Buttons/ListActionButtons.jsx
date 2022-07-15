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
  console.log("list action buttons ", permissions);
  return (
    <TopToolbar>
      {permissions === "admin" && <CreateButton />}
      <ExportButton />

      {/* Add your custom actions */}
    </TopToolbar>
  );
};
