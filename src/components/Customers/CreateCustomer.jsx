import * as React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  required,
  email,
  minLength,
  maxLength,
  regex,
} from "react-admin";

export const CreateCustomer = () => {
  const validateEmail = email("email required");
  const validateFirstName = [
    required("name must me at least 2 digits"),
    minLength(2),
    maxLength(15),
  ];
  // const validatePhone = regex(
  //   /^\\(?([0-9]{3})\\)?[-.\\s]?([0-9]{3})[-.\\s]?([0-9]{4})$/,
  //   "must be a valid phone number"
  // );

  return (
    <Create>
      <SimpleForm>
        <TextInput
          source="firstName"
          validate={validateFirstName}
          label="First Name"
        />
        <TextInput
          source="lastName"
          label="Last Name"
          validate={validateFirstName}
        />
        <TextInput
          source="email"
          validate={validateEmail}
          label="Email"
          type="email"
        />
        <TextInput source="phone" label="Phone" />
        <TextInput source="company" label="Company" defaultValue="n/a" />
        <TextInput source="comment" label="Notes:" defaultValue="n/a" />
      </SimpleForm>
    </Create>
  );
};
