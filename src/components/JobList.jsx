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
  SelectInput,
  useRecordContext,
  useNotify,
  useRedirect,
  ReferenceManyField,
  Toolbar,
  SaveButton,
} from "react-admin";
import { Divider, Grid, Box, Typography } from "@mui/material";
import { BulkActionButtons } from "./BulkActionButtons";
import { ListActionButtons } from "./ListActionButtons";
import { EditRecordButtons } from "./EditRecordButtons";
// custom tooltip to conditianaly render create button +++
// usePermission hook every where +++
// create beautiful "you are not allowed" component +++
// learn how to use mui grid +++
// conditianaly show columns +++
// math the balance and amount paid
const Aside = () => (
  <Box sx={{ width: "200px", margin: "1em" }}>
    <Typography variant="h6">Add comments</Typography>
    <Typography variant="body2">Please fill the form:</Typography>
  </Box>
);

export const JobList = (props) => {
  const { isLoading, permissions } = usePermissions();
  console.log("joblist pwrmissions ", permissions);
  const notify = useNotify();
  const redirect = useRedirect();
  if (isLoading) return null;
  const onError = (error) => {
    notify(`Could not load list: ${error.message}`, { type: "warning" });
    redirect("/dashboard");
  };

  return (
    <List actions={<ListActionButtons />} queryOptions={{ onError }}>
      <Datagrid
        bulkActionButtons={permissions === "admin" && <BulkActionButtons />}
        sx={{
          "& .column-job_title": { backgroundColor: "#fee" },
          "& .column-balance": { backgroundColor: "#fee" },
        }}
      >
        {/* <TextField source="created_at" /> */}
        <TextField source="id" />
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

const EditTitle = () => {
  const record = useRecordContext();
  // let values = {
  //   balance: record.balance,
  //   amount_paid_1: record.amount_paid_1,
  //   amount_paid_2: record.amount_paid_2,
  //   amount_paid_3: record.amount_paid_3,
  // };

  // function calculate(values) {
  //   var newValue =
  //     values.amount_paid_1 + values.amount_paid_2 + values.amount_paid_3;
  //   return values.balance - newValue;
  // }

  // console.log("Calculation ", calculate(values));

  console.log("Edit button click ", record);
  return <span>Job {record ? `"${record.job_title}"` : ""}</span>;
};

export const EditJob = (props) => {
  const { isLoading, permissions } = usePermissions();
  const record = useRecordContext();
  const notify = useNotify();
  const redirect = useRedirect();

  if (isLoading) return null;
  const onError = (error) => {
    notify(`Could not load list: ${error.message}`, { type: "warning" });
    redirect("/dashboard");
  };
  if (isLoading) return null;

  return (
    <Edit aside={<Aside />} title={<EditTitle />} queryOptions={{ onError }}>
      <SimpleForm toolbar={<EditRecordButtons />}>
        {/* <SimpleForm toolbar={<MyToolbar />}> */}
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TextField source="id" />

            <TextField source="created_at" label="Created at" />
            {permissions === "admin" && (
              <TextInput source="job_title" label="Job Title" />
            )}
            {permissions === "user" && (
              <TextField source="job_title" label="Job Title" />
            )}
            <SelectInput
              source="in_progress"
              label="Progress"
              choices={[
                { id: "open", name: "Open" },
                { id: "in-progress", name: "In-Progress" },
                { id: "closed", name: "Closed" },
              ]}
            />
            {permissions === "admin" && (
              <DateInput source="due_date" label="Due Date" />
            )}

            <TextField source="due_date" label="Due Date" />
          </Grid>
          <Grid item xs={3}>
            <TextField source="job_description" />
            <TextInput
              source="job_description"
              label="Description"
              multiline={true}
              fullWidth
            />
            {permissions === "admin" && (
              <TextInput source="assigned_to" label="Processor: " />
            )}
          </Grid>
          <Grid item xs={3}>
            {permissions === "admin" && (
              <>
                <TextInput source="balance" label="Balance" />
                <TextInput source="amount_paid_1" label="Amount paid 1" />
                <TextInput source="amount_paid_2" label="Amount paid 2" />
                <TextInput source="amount_paid_3" label="Amount paid 3" />
              </>
            )}
          </Grid>

          {/* <Grid item xs={3}>
              <SimpleShowLayout>
                <TextField source="comment" label="Comments" />
                <TextInput source="comment" fullWidth />
              </SimpleShowLayout>
            </Grid> */}
        </Grid>
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
  return null;
};
