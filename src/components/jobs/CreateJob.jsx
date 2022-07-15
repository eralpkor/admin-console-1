import * as React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  DateInput,
  required,
} from "react-admin";

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
