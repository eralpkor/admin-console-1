import {
  TopToolbar,
  CreateButton,
  ExportButton,
  usePermissions,
  TextInput,
  FilterButton,
  FilterForm,
} from "react-admin";
import { Stack, Divider } from "@mui/material";

const filters = [
  <TextInput autoFocus label="First name" source="firstName" />,
  <TextInput autoFocus label="Last name" source="lastName" />,
  <TextInput autoFocus label="Email" source="email" />,
  <TextInput autoFocus label="Company" source="company" />,
];
const FilterToolbar = () => {
  const { permissions } = usePermissions();

  return (
    <Stack sx={{ marginTop: "1rem" }} direction="row" spacing={1}>
      <div>{permissions === "USER" ? null : <CreateButton />}</div>
      <FilterForm filters={filters} />
      <div>
        <FilterButton filters={filters} />
      </div>
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
