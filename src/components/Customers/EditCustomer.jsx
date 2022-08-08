import * as React from "react";
import { Edit, SimpleForm, TextInput } from "react-admin";

export const EditCustomer = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="first_name" label="First Name" />
        <TextInput source="last_name" label="Last Name" />
        <TextInput source="phone" label="Phone" />
        <TextInput source="email" type="email" label="Email" />
        <TextInput source="company" label="Company" />
        <TextInput source="notes" label="Notes:" multiline fullWidth />
      </SimpleForm>
    </Edit>
  );
};
