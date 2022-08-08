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

const validateUserCreation = (values) => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = "The firstName is required";
  }
  if (!values.age) {
    // You can return translation keys
    errors.age = "ra.validation.required";
  } else if (values.age < 18) {
    // Or an object if the translation messages need parameters
    errors.age = {
      message: "ra.validation.minValue",
      args: { min: 18 },
    };
  }
  return errors;
};

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
