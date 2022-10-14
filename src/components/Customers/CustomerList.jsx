import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  usePermissions,
  useNotify,
  useRedirect,
  EmailField,
  TextInput,
  FilterForm,
  FilterButton,
  DateField,
} from "react-admin";
import StickyFooter from "../Helpers/NoAcess";
import { ListActionButtons } from "../Buttons/CustomerActionButtons";
import { BulkActionButtons } from "../Buttons/BulkActionButtons";
import { Stack } from "@mui/material";

export const CustomerList = () => {
  const { isLoading, permissions } = usePermissions();
  const notify = useNotify();
  const redirect = useRedirect();

  if (isLoading) return null;
  if (permissions !== "SUPERADMIN") {
    return <StickyFooter />;
  }
  // if error redirect to dashboard
  const onError = (error) => {
    notify(`Could not load list: ${error.message}`, { type: "warning" });
    redirect("/dashboard");
  };

  return (
    <List
      perPage={10}
      queryOptions={{ onError }}
      actions={<ListActionButtons />}
    >
      <Datagrid
        rowClick="edit"
        bulkActionButtons={permissions !== "USER" && <BulkActionButtons />}
      >
        <DateField source="createdAt" sortByOrder="DESC" />
        <TextField source="firstName" />
        <TextField source="lastName" />
        <TextField source="phone" />
        <EmailField source="email" />
        <TextField source="company" />
        <TextField source="comment" label="Notes" />
      </Datagrid>
    </List>
  );
};
