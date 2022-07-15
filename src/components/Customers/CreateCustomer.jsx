import * as React from "react";
import { Create, SimpleForm, TextInput, required } from "react-admin";

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
  return (
    <Create>
      <SimpleForm>
        <TextInput
          source="first_name"
          validate={[required()]}
          label="First Name"
        />
        <TextInput
          source="last_name"
          label="Last Name"
          validate={[required()]}
        />
        <TextInput source="email" validate={[required()]} label="Email" />
        <TextInput source="phone" label="Phone" />
        <TextInput source="company" label="Company" />
        <TextInput source="notes" label="Notes" />
      </SimpleForm>
    </Create>
  );
};
