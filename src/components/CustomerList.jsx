import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  Create,
  RichTextInput,
  DateField,
  Edit,
  SimpleForm,
  TextInput,
  DateInput,
  required,
  EmailField,
} from "react-admin";
import MyUrlField from "./MyUrlField";

export const CustomerList = () => (
  <List hasCreate={true}>
    <Datagrid rowClick="edit">
      {/* <TextField source="id" /> */}
      <TextField source="first_name" />
      <TextField source="last_name" />
      <TextField source="phone" />
      <MyUrlField source="email" />
      <TextField source="company" />
      <TextField source="notes" />

      <EditButton />
    </Datagrid>
  </List>
);

export const EditCustomer = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="first_name" label="First Name" />
      <TextInput source="last_name" label="Last Name" />
      <TextInput source="phone" label="Phone" />

      <TextInput source="email" type="email" label="Email" />
      <TextInput source="company" label="Company" />
      <TextInput source="notes" label="Notes:" multiline />
    </SimpleForm>
  </Edit>
);

export const CreateCustomer = () => (
  <Create>
    <SimpleForm>
      <TextInput
        source="first_name"
        validate={[required()]}
        label="First Name"
      />
      <TextInput source="last_name" label="Last Name" validate={[required()]} />
      <TextInput source="email" validate={[required()]} label="Email" />
      <TextInput source="phone" label="Phone" />
      <TextInput source="company" label="Company" />
      <TextInput source="notes" label="Notes" />
    </SimpleForm>
  </Create>
);
