import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  EmailField,
  EditButton,
  DateField,
  required,
  SimpleForm,
  Edit,
  TextInput,
  Labeled,
  DateInput,
  SimpleShowLayout,
  Show,
  Create,
} from "react-admin";
import { Divider, Grid } from "@mui/material";
// custom tooltip to conditianaly render create button
// usePermission hook every where
// create beautiful "you are not allowed" component
// learn how to use mui grid
// conditianaly show columns
// math the balance and amount paid
export const JobList = () => (
  <List>
    <Datagrid>
      {/* <TextField source="id" /> */}
      <TextField source="created_at" />
      <TextField source="job_title" />
      <TextField source="job_description" />
      <TextField source="in_progress" />
      <DateField source="due_date" />
      <TextField source="assigned_to" />
      {false && (
        <>
          <TextField source="balance" />
          <TextField source="amount_paid_1" />
          <TextField source="amount_paid_2" />
          <TextField source="amount_paid_2" />
        </>
      )}

      <TextField source="customer_id" />
      <TextField source="user_id" />
      <TextField source="first_name" />
      <TextField source="last_name" />
      <TextField source="username" />

      <EditButton />
    </Datagrid>
  </List>
);

export const EditJob = () => (
  <Edit>
    <SimpleForm>
      <Show>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <SimpleShowLayout spacing={2}>
              <DateInput source="created_at" label="Created at" />
              <TextInput source="job_title" label="Job Title" />
              <TextInput source="in_progress" label="Progress" />
              <DateInput type="due_date" source="due_date" label="Due Date" />
            </SimpleShowLayout>
          </Grid>
          <Grid item xs={3}>
            <SimpleShowLayout spacing={2}>
              <TextInput source="job_description" label="Description" />
              <TextInput source="assigned_to" label="Assign to: " />
            </SimpleShowLayout>
          </Grid>
          <Grid item xs={3}>
            <SimpleShowLayout>
              <TextInput source="balance" label="Balance" />
              <TextInput source="amount_paid_1" label="Amount paid 1" />
              <TextInput source="amount_paid_2" label="Amount paid 2" />
              <TextInput source="amount_paid_3" label="Amount paid 3" />
            </SimpleShowLayout>
          </Grid>
        </Grid>
      </Show>
    </SimpleForm>
  </Edit>
);

export const CreateJob = () => (
  <Create>
    <SimpleForm>
      <TextInput source="job_title" validate={[required()]} label="Job title" />
      <TextInput source="in_progress" label="Progress" />
      <DateInput type="due_date" source="due_date" label="Due Date" />
      <TextInput source="job_description" label="Description" />
      <TextInput source="assigned_to" label="Assign to: " />
      <TextInput source="balance" label="Balance" />
      <TextInput source="amount_paid_1" label="Amount paid 1" />
      <TextInput source="amount_paid_2" label="Amount paid 2" />
      <TextInput source="amount_paid_3" label="Amount paid 3" />
    </SimpleForm>
  </Create>
);
// {
// 	"id": 3,
// 	"created_at": "7/1/2022, 5:09:08 PM",
// 	"job_title": "Movies Maine",
// 	"job_description": "Analyst Shoes Optional Plastic indexing Plaza Qatari Rial Tennessee vortals Industrial",
// 	"in_progress": "in-progress",
// 	"due_date": "7/1/2022, 5:09:08 PM",
// 	"assigned_to": 3,
// 	"balance": 250.75,
// 	"amount_paid_1": 0,
// 	"amount_paid_2": 0,
// 	"amount_paid_3": 0,
// 	"customer_id": 17,
// 	"user_id": 1
// }

{
  /* <Show>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TextInput source="job_title" label="Job Title" fullWidth />
            <TextInput source="in_progress" label="Progress" />
            <DateInput
              type="due_date"
              source="due_date"
              label="Due Date"
              defaultValue={new Date()}
            />
          </Grid>
          <Grid item xs={3}></Grid>
          <TextInput
            source="first_name"
            validate={[required()]}
            label="First Name"
          />
          <TextInput source="last_name" label="Last Name" />
          <TextInput
            source="username"
            label="Username"
            validate={[required()]}
          />
          <TextInput
            type="password"
            source="password"
            label="Password"
            validate={[required()]}
          />
          <TextInput source="email" validate={[required()]} label="Email" />
        </Grid>
      </Show> */
}
