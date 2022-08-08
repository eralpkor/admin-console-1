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
} from "react-admin";
import StickyFooter from "../Helpers/NoAcess";
import { ListActionButtons } from "../Buttons/ListActionButtons";
import { BulkActionButtons } from "../Buttons/BulkActionButtons";

export const CustomerList = () => {
  const { isLoading, permissions } = usePermissions();
  console.log("joblist pwrmissions ", permissions);
  const notify = useNotify();
  const redirect = useRedirect();

  if (isLoading) return null;
  console.log("Permission in users ", permissions);
  if (permissions !== "superAdmin") {
    return <StickyFooter />;
  }
  // if error redirect to dashboard
  const onError = (error) => {
    notify(`Could not load list: ${error.message}`, { type: "warning" });
    redirect("/dashboard");
  };
  return (
    <List queryOptions={{ onError }} actions={<ListActionButtons />}>
      {/* <Datagrid rowClick="edit"> */}
      <Datagrid
        bulkActionButtons={
          permissions === "superAdmin" && <BulkActionButtons />
        }
      >
        <TextField source="id" />
        <TextField source="first_name" />
        <TextField source="last_name" />
        <TextField source="phone" />
        <EmailField source="email" />
        <TextField source="company" />
        <TextField source="notes" />

        {permissions === "superAdmin" && <EditButton />}
      </Datagrid>
    </List>
  );
};
