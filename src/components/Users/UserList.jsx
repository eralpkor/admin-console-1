import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  useNotify,
  useAuthenticated,
  usePermissions,
  EmailField,
  useRedirect,
} from "react-admin";

import StickyFooter from "../Helpers/NoAcess";

export const UserList = () => {
  useAuthenticated();
  const { isLoading, permissions } = usePermissions();
  const notify = useNotify();
  const redirect = useRedirect();
  const onError = (error) => {
    notify(`Could not load list: ${error.message}`, { type: "warning" });
    redirect("/dashboard");
  };

  if (permissions !== "SUPERADMIN") {
    return <StickyFooter />;
  }
  return (
    <List hasCreate={true} queryOptions={{ onError }}>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="firstName" />
        <TextField source="lastName" />
        <TextField source="username" />
        <EmailField source="email" />
        <TextField source="role" label="Role" />
        {/* <EditButton /> */}
      </Datagrid>
    </List>
  );
};
