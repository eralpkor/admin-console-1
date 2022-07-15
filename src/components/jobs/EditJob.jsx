import * as React from "react";
import {
  usePermissions,
  useRecordContext,
  useNotify,
  useRedirect,
  Edit,
  SimpleForm,
  TextField,
  TextInput,
  DateInput,
  SelectInput,
} from "react-admin";
import { EditRecordButtons } from "../Buttons/EditRecordButtons";
import { Grid } from "@mui/material";
const EditTitle = () => {
  const record = useRecordContext();

  console.log("Edit button click ", record);
  return <span>Job {record ? `"${record.job_title}"` : ""}</span>;
};

export const EditJob = () => {
  const { isLoading, permissions } = usePermissions();
  const notify = useNotify();
  const redirect = useRedirect();

  if (isLoading) return null;
  const onError = (error) => {
    notify(`Could not load list: ${error.message}`, { type: "warning" });
    redirect("/dashboard");
  };
  if (isLoading) return null;

  return (
    <Edit title={<EditTitle />} queryOptions={{ onError }}>
      <SimpleForm toolbar={<EditRecordButtons />}>
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
        </Grid>
      </SimpleForm>
    </Edit>
  );
};
