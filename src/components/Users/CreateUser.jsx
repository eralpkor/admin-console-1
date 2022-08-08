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
  SelectInput,
  PasswordInput,
  Create,
  email,
  minLength,
  maxLength,
} from "react-admin";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import StickyFooter from "../Helpers/NoAcess";

export const CreateUser = () => {
  const validateEmail = email();
  const validateFirstName = [required(), minLength(2), maxLength(15)];
  return (
    <Create>
      <SimpleForm>
        <TextInput
          source="first_name"
          validate={[required()]}
          label="First Name"
        />
        <TextInput source="last_name" label="Last Name" />
        <TextInput
          source="username"
          label="Username"
          validate={validateFirstName}
        />
        <PasswordInput
          source="password"
          label="Password"
          validate={[required()]}
        />
        <TextInput source="email" validate={validateEmail} label="Email" />
        <SelectInput
          validate={[required()]}
          source="role_id"
          label="User role"
          choices={[
            { id: 1, name: "Super Admin" },
            { id: 2, name: "Admin" },
            { id: 3, name: "Processor" },
          ]}
        />
      </SimpleForm>
    </Create>
  );
};
