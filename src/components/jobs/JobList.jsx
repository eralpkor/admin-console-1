import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DateField,
  usePermissions,
  useNotify,
  useRedirect,
  FunctionField,
  ShowButton,
  useRecordContext,
  FilterForm,
  FilterButton,
  TextInput,
} from "react-admin";
import { Stack } from "@mui/material";
import { BulkActionButtons } from "../Buttons/BulkActionButtons";
import { ListActionButtons } from "../Buttons/ListActionButtons";

const filters = [<TextInput label="Title" source="job_title" />];

const ListToolbar = () => (
  <Stack direction="row" justifyContent="space-between">
    <FilterForm filters={filters} />
    <div>
      <FilterButton filters={filters} />
    </div>
  </Stack>
);

export const JobList = () => {
  const { isLoading, permissions } = usePermissions();
  console.log("joblist pwrmissions ", permissions);
  const record = useRecordContext();
  const notify = useNotify();
  const redirect = useRedirect();
  if (isLoading) return null;
  const onError = (error) => {
    notify(`Could not load list: ${error.message}`, { type: "warning" });
    redirect("/dashboard");
  };
  console.log("  rrecord her, ", record);
  // change the color add to data grid
  // sx={{
  //   "& .column-job_title": { backgroundColor: "#fee" },
  //   "& .column-balance": { backgroundColor: "#fee" },
  // }}

  return (
    <List
      perPage={10}
      actions={<ListActionButtons />}
      queryOptions={{ onError }}
    >
      {/* <ListToolbar /> */}
      <Datagrid
        bulkActionButtons={
          permissions === "user" ? null : <BulkActionButtons />
        }
      >
        <TextField source="id" />
        <TextField source="job_title" />
        <TextField source="job_description" />
        <TextField source="in_progress" />
        <DateField source="due_date" />
        <TextField source="assigned_to" label="Processor" />
        <FunctionField
          label="Full name"
          render={(record) => `${record.first_name} ${record.last_name}`}
        />
        {permissions === "user" ? null : <TextField source="total" />}
        {permissions === "user" ? null : <TextField source="balance" />}

        <EditButton />
        <ShowButton />
      </Datagrid>
    </List>
  );
};
