import * as React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  required,
  email,
  minLength,
  maxLength,
} from "react-admin";

export const CreateCustomer = () => {
  const validateEmail = email();
  const validateFirstName = [required(), minLength(2), maxLength(15)];

  return (
    <Create>
      <SimpleForm>
        <TextInput
          source="first_name"
          validate={validateFirstName}
          label="First Name"
        />
        <TextInput
          source="last_name"
          label="Last Name"
          validate={validateFirstName}
        />
        <TextInput source="email" validate={validateEmail} label="Email" />
        <TextInput source="phone" label="Phone" />
        <TextInput source="company" label="Company" />
        <TextInput source="notes" label="Notes" />
      </SimpleForm>
    </Create>
  );
};
