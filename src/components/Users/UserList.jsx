import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  useRecordContext,
  Edit,
  SimpleForm,
  TextInput,
  required,
  useAuthenticated,
  usePermissions,
  EmailField,
} from "react-admin";
import MyUrlField from "../Helpers/MyUrlField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import StickyFooter from "../Helpers/NoAcess";

const ConditionalEmailField = () => {
  const record = useRecordContext();

  // return record && record.hasEmail ? <EmailField source="email" /> : null;
};

export const UserList = () => {
  useAuthenticated();
  const { isLoading, permissions } = usePermissions();
  // const record = useRecordContext();
  console.log("Permission in users ", permissions);
  if (permissions !== "superAdmin") {
    return <StickyFooter />;
  }
  return (
    <List hasCreate={true}>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="first_name" />
        <TextField source="last_name" />
        <TextField source="username" />
        <EmailField source="email" />
        <TextField source="role" label="Role" />

        <EditButton />
      </Datagrid>
    </List>
  );
};
