import * as React from "react";
import { Edit, SimpleForm, TextInput } from "react-admin";

export const EditCustomer = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="firstName" label="First Name" />
        <TextInput source="lastName" label="Last Name" />
        <TextInput source="phone" label="Phone" />
        <TextInput source="email" type="email" label="Email" />
        <TextInput source="company" label="Company" />
        <TextInput source="comment" label="Notes:" multiline fullWidth />
      </SimpleForm>
    </Edit>
  );
};
