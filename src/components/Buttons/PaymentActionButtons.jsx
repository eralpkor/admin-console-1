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

const filters = [
  <TextInput autoFocus source="jobId" />,
  <TextInput autoFocus source="paymentType" />,
  <TextInput autoFocus source="userId" />,
];

const FilterToolbar = () => {
  const { permissions } = usePermissions();

  return (
    <Stack sx={{ marginTop: "1rem" }} direction="row" spacing={1}>
      <FilterForm filters={filters} />
      <div>
        <FilterButton filters={filters} />
      </div>
      <div>{permissions === "USER" ? null : <CreateButton />}</div>
      <div>
        <ExportButton />
      </div>
    </Stack>
  );
};

export const ListActionButtons = () => {
  return (
    <TopToolbar>
      <FilterToolbar />
    </TopToolbar>
  );
};
