import * as React from "react";
import {
  SimpleForm,
  TextInput,
  required,
  SelectInput,
  PasswordInput,
  Create,
  email,
  minLength,
  maxLength,
} from "react-admin";

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

export const CreateUser = () => {
  const validateEmail = email();
  const validateFirstName = [required(), minLength(2), maxLength(15)];

  return (
    <Create redirect="list">
      <SimpleForm validate={PasswordValidate}>
        <TextInput
          source="firstName"
          validate={[required()]}
          label="First Name"
        />
        <TextInput
          source="lastName"
          validate={[required()]}
          label="Last Name"
        />
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
        <TextInput
          label="Repeat password"
          source="confirmPassword"
          type="password"
          validate={required()}
        />
        <TextInput
          source="email"
          validate={validateEmail}
          label="Email"
          type="email"
        />
        <SelectInput
          validate={[required()]}
          source="role"
          label="User role"
          choices={[
            { id: "SUEPERADMIN", name: "Super Admin" },
            { id: "ADMIN", name: "Admin" },
            { id: "USER", name: "Processor" },
          ]}
        />
      </SimpleForm>
    </Create>
  );
};
