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
  CreateButton,
} from "react-admin";
import { Stack } from "@mui/material";
import { BulkActionButtons } from "../Buttons/BulkActionButtons";
import { ListActionButtons } from "../Buttons/JobActionButtons";
import { FullNameField } from "../Helpers/FullName";

const filters = [
  <TextInput autoFocus label="Processor" source="username" />,
  <TextInput autoFocus label="Title" source="title" />,
  <TextInput autoFocus label="Last name" source="lastName" />,
  <TextInput autoFocus label="In-Progress" source="inProgress" />,
];

export const JobList = (props) => {
  const { isLoading, permissions } = usePermissions();
  const record = useRecordContext();
  const notify = useNotify();
  const redirect = useRedirect();
  if (isLoading) return null;
  const onError = (error) => {
    notify(`Could not load list: ${error.message}`, { type: "warning" });
    redirect("/dashboard");
  };
  // change the color add to data grid
  // sx={{
  //   "& .column-title": { backgroundColor: "#fee" },
  //   "& .column-balance": { backgroundColor: "#fee" },
  // }}

  // filters={filters}
  console.log("whats jobList record ", record);
  return (
    <List
      {...props}
      perPage={10}
      queryOptions={{ onError }}
      actions={<ListActionButtons />}
    >
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
        <DateField source="createdAt" sortByOrder="DESC" />
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
