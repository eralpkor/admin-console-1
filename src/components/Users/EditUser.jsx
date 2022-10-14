import * as React from "react";
import {
  useRecordContext,
  Edit,
  SimpleForm,
  TextInput,
  required,
  PasswordInput,
  SelectInput,
  minLength,
  maxLength,
  email,
  useGetIdentity,
} from "react-admin";
import MyUrlField from "../Helpers/MyUrlField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import StickyFooter from "../Helpers/NoAcess";

const GetTitle = () => {
  const record = useRecordContext();
  const { identity, isLoading: identityLoading } = useGetIdentity();
  if (identityLoading) return <>Loading...</>;
  // console.log("Identity ", identity);
  console.log("Edit title ", record); // record = job

  return (
    <span>User {record ? `"${record.firstName} ${record.lastName}"` : ""}</span>
  );
};

const PasswordValidate = (values) => {
  const errors = {};

  if (!values.password) {
    errors.password = "Required";
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = "Required";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Password mismatched";
  }

  return errors;
};

export const EditUser = () => {
  const validateEmail = email();
  const validateFirstName = [required(), minLength(2), maxLength(15)];
  return (
    <Edit title={<GetTitle />}>
      <SimpleForm>
        <TextInput
          source="firstName"
          label="First Name"
          validate={validateFirstName}
        />
        <TextInput
          source="lastName"
          label="Last Name"
          validate={validateFirstName}
        />
        <TextInput source="username" label="Username" validate={required()} />
        <PasswordInput
          source="password"
          label="Password"
          validate={required()}
        />

        <TextInput
          size="large"
          source="email"
          label="Email"
          type="email"
          validate={validateEmail}
        />
        <SelectInput
          validate={required()}
          //optionText={(record) => record.role_id}
          source="role"
          label="User role"
          choices={[
            { id: "SUPERADMIN", name: "SUPERADMIN" },
            { id: "ADMIN", name: "ADMIN" },
            { id: "USER", name: "USER" },
          ]}
        />
      </SimpleForm>
    </Edit>
  );
};
