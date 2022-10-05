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
  useRecordContext,
  FilterForm,
  FilterButton,
  TextInput,
  NumberField,
  ReferenceField,
  CloneButton,
} from "react-admin";
import { Stack } from "@mui/material";
import { BulkActionButtons } from "../Buttons/BulkActionButtons";
import { ListActionButtons } from "../Buttons/ListActionButtons";
import { FullNameField } from "../Helpers/FullName";

const filters = [
  <TextInput autoFocus label="Processor" source="username" />,
  <TextInput autoFocus label="Title" source="title" />,
  <TextInput autoFocus label="Last name" source="lastName" />,
  <TextInput autoFocus label="In-Progress" source="inProgress" />,
];

export const JobList = (props) => {
  const { isLoading, permissions } = usePermissions();
  console.log("joblist permissions ", permissions);
  const record = useRecordContext();
  const notify = useNotify();
  const redirect = useRedirect();
  if (isLoading) return null;
  const onError = (error) => {
    notify(`Could not load list: ${error.message}`, { type: "warning" });
    redirect("/dashboard");
  };
  console.log("record, ", record);
  // change the color add to data grid
  // sx={{
  //   "& .column-title": { backgroundColor: "#fee" },
  //   "& .column-balance": { backgroundColor: "#fee" },
  // }}
  const FilterToolbar = () => (
    <Stack direction="row" justifyContent="space-between">
      <FilterForm filters={filters} />
      <div>
        <FilterButton filters={filters} />
      </div>
    </Stack>
  );

  return (
    <List
      {...props}
      perPage={10}
      actions={<ListActionButtons />}
      queryOptions={{ onError }}
    >
      <FilterToolbar />
      <Datagrid
        rowClick="edit"
        bulkActionButtons={
          permissions === "USER" ? null : <BulkActionButtons />
        }
        sx={{
          "& .column-title": { backgroundColor: "#fee" },
          "& .column-balance": { backgroundColor: "#fee" },
        }}
      >
        <TextField source="id" />
        <TextField source="title" />
        <TextField maxWidth={250} source="description" />
        {/* Customer name */}
        <FullNameField />
        <TextField source="inProgress" />
        <DateField source="dueDate" />
        <TextField source="username" label="Processor" />
        <ReferenceField label="Admin" source="adminId" reference="user">
          <TextField source="username" />
        </ReferenceField>

        {permissions === "USER" ? null : (
          <NumberField
            source="total"
            options={{
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 2,
            }}
          />
        )}
        {permissions === "USER" ? null : (
          <NumberField
            source="balance"
            options={{
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 2,
            }}
          />
        )}

        {/* <EditButton /> */}
      </Datagrid>
    </List>
  );
};
