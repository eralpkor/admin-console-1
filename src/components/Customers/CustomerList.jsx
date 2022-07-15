import * as React from "react";
import { Router } from "react-dom";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  usePermissions,
  useNotify,
  useRedirect,
} from "react-admin";
import MyUrlField from "../MyUrlField";
import { ListActionButtons } from "../Buttons/ListActionButtons";
import { BulkActionButtons } from "../Buttons/BulkActionButtons";

export const CustomerList = () => {
  const { isLoading, permissions } = usePermissions();
  console.log("joblist pwrmissions ", permissions);
  const notify = useNotify();
  const redirect = useRedirect();

  if (isLoading) return null;
  // if error redirect to dashboard
  const onError = (error) => {
    notify(`Could not load list: ${error.message}`, { type: "warning" });
    redirect("/dashboard");
  };
  return (
    <List queryOptions={{ onError }} actions={<ListActionButtons />}>
      {/* <Datagrid rowClick="edit"> */}
      <Datagrid bulkActionButtons={<BulkActionButtons />}>
        {/* <TextField source="id" /> */}
        <TextField source="first_name" />
        <TextField source="last_name" />
        <TextField source="phone" />
        <MyUrlField source="email" />
        <TextField source="company" />
        <TextField source="notes" />

        {permissions === "admin" && <EditButton />}
      </Datagrid>
    </List>
  );
};
