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
  PasswordInput,
  BooleanInput,
  Create,
  useAuthenticated,
  usePermissions,
} from "react-admin";
import MyUrlField from "./MyUrlField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import StickyFooter from "./NoAcess";

const ConditionalEmailField = () => {
  const record = useRecordContext();

  // return record && record.hasEmail ? <EmailField source="email" /> : null;
};

export const UserList = () => {
  useAuthenticated();
  const { isLoading, permissions } = usePermissions();
  // const record = useRecordContext();
  console.log("Permission in users ", permissions);
  if (permissions !== "admin") {
    return <StickyFooter />;
  }
  return (
    <List hasCreate={true}>
      <Datagrid rowClick="edit">
        {/* <TextField source="id" /> */}
        <TextField source="first_name" />
        <TextField source="last_name" />
        <TextField source="username" />
        <MyUrlField source="email" />
        <TextField source="is_admin" label="Role" />
        <EditButton />
      </Datagrid>
    </List>
  );
};

export const EditUser = () => (
  <Edit>
    <SimpleForm>
      <TextInput
        source="first_name"
        validate={[required()]}
        label="First Name"
      />
      <TextInput source="last_name" label="Last Name" />
      <TextInput source="username" label="Username" validate={[required()]} />
      <TextInput
        type="password"
        source="password"
        label="Password"
        validate={[required()]}
      />
      <TextInput
        size="large"
        source="email"
        validate={[required()]}
        label="Email"
      />
    </SimpleForm>
  </Edit>
);

export const CreateUser = () => (
  <Create>
    <SimpleForm>
      <TextInput
        source="first_name"
        validate={[required()]}
        label="First Name"
      />
      <TextInput source="last_name" label="Last Name" />
      <TextInput source="username" label="Username" validate={[required()]} />
      <PasswordInput
        source="password"
        label="Password"
        validate={[required()]}
      />
      <TextInput source="email" validate={[required()]} label="Email" />
      <BooleanInput
        source="is_admin"
        validate={[required()]}
        label="Is Admin user?"
        defaultValue={false}
      />
    </SimpleForm>
  </Create>
);
