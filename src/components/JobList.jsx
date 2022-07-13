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
  usePermissions,
  useDelete,
  FunctionField,
} from "react-admin";
import { Divider, Grid } from "@mui/material";
// custom tooltip to conditianaly render create button
// usePermission hook every where
// create beautiful "you are not allowed" component +++
// learn how to use mui grid
// conditianaly show columns +++
// math the balance and amount paid
const getUserFilters = (permissions) =>
  [
    <TextInput label="Job search" source="job_title" alwaysOn />,
    <TextInput source="username" alwaysOn />,
    permissions === "admin" ? <TextInput source="assign_to" /> : null,
  ].filter((filter) => filter !== null);

export const JobList = ({ ...props }) => {
  const { isLoading, permissions } = usePermissions();
  console.log("joblist pwrmissions ", permissions);
  if (isLoading) return null;

  // DELETE one
  const DeleteButton = ({ record }) => {
    const [deleteOne, { isLoading, error }] = useDelete();
    const handleClick = () => {
      console.log("record ", record);
      deleteOne("jobs", { id: record.id, previousData: record });
    };
    if (error) {
      return <p>ERROR</p>;
    }
    return (
      <button disabled={isLoading} onClick={handleClick}>
        Delete
      </button>
    );
  };
  return (
    <List sort={{ field: "job_title", order: "ASC" }}>
      <Datagrid
        sx={{
          "& .column-job_title": { backgroundColor: "#fee" },
          "& .column-balance": { backgroundColor: "#fee" },
        }}
      >
        {/* <TextField source="id" /> */}
        {/* <TextField source="created_at" /> */}
        <TextField source="job_title" />
        <TextField source="job_description" />
        <TextField source="in_progress" />
        <DateField source="due_date" />
        <TextField source="username" label="Processor" />

        {permissions === "admin" && <TextField source="balance" />}
        {permissions === "admin" && <TextField source="amount_paid_1" />}
        {permissions === "admin" && <TextField source="amount_paid_2" />}
        {permissions === "admin" && <TextField source="amount_paid_2" />}

        {/* <TextField source="customer_id" /> */}
        {/* <TextField source="user_id" /> */}
        <FunctionField
          label="Full name"
          render={(record) => `${record.first_name} ${record.last_name}`}
        />
        <TextField source="last_name" />
        <TextField source="username" />
        <EditButton />
      </Datagrid>
    </List>
  );
};

// {...props}
//       filters={getUserFilters(permissions)}
//       sort={{ field: "user_id", order: "ASC" }}

export const EditJob = () => {
  const { isLoading, permissions } = usePermissions();
  console.log("joblist pwrmissions ", permissions);
  if (isLoading) return null;

  return (
    <Edit>
      <SimpleForm>
        <Show>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <SimpleShowLayout spacing={2}>
                {permissions === "admin" && (
                  <DateInput source="created_at" label="Created at" />
                )}
                <TextInput source="job_title" label="Job Title" />
                <TextInput source="in_progress" label="Progress" />
                <DateInput source="due_date" label="Due Date" />
              </SimpleShowLayout>
            </Grid>
            <Grid item xs={3}>
              <SimpleShowLayout spacing={2}>
                <TextInput source="job_description" label="Description" />
                <TextInput source="assigned_to" label="Processor: " />
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
};

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

export const DeleteJob = () => {
  return;
};
