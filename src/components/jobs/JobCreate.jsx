import * as React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  DateInput,
  required,
  SelectInput,
  useRecordContext,
  ReferenceInput,
  Labeled,
  TextField,
  usePermissions,
  useGetIdentity,
  AutocompleteInput,
  minValue,
  number,
} from "react-admin";

export const JobCreate = (props) => {
  const record = useRecordContext();
  const validateAmount = [number(), minValue(0)];
  // const { isLoading, permissions } = usePermissions();
  const { identity, isLoading: identityLoading } = useGetIdentity();
  if (identityLoading) return <>Loading...</>;
  console.log("What is identity ", identity);
  console.log("what is record ", record);
  return (
    <Create>
      <SimpleForm>
        <TextInput
          source="job_title"
          validate={[required()]}
          label="Job title"
        />
        <TextInput
          source="job_description"
          validate={[required()]}
          label="Description"
          fullWidth
        />
        <DateInput source="due_date" label="Due Date" validate={[required()]} />
        <Labeled>
          <TextField source="Processor" />
        </Labeled>
        <ReferenceInput
          label="Processor"
          source="assigned_to"
          reference="users"
        >
          <SelectInput validate={[required()]} optionText="username" />
        </ReferenceInput>
        <Labeled>
          <TextField source="Customer" />
        </Labeled>
        <ReferenceInput
          label="Customer"
          source="customer_id"
          reference="customers"
        >
          <AutocompleteInput validate={[required()]} optionText="full_name" />
        </ReferenceInput>
        <SelectInput
          source="in_progress"
          label="Progress"
          validate={[required()]}
          choices={[
            { id: "open", name: "Open" },
            { id: "in-progress", name: "In-Progress" },
            { id: "closed", name: "Closed" },
          ]}
        />
        <TextInput source="total" validate={validateAmount} defaultValue="0" />
        <TextInput
          source="amount_paid"
          label="Payment"
          validate={validateAmount}
          defaultValue="0"
        />
        <TextInput source="payment_type" defaultValue="n/a" />
        <TextInput source="check_number" defaultValue="n/a" />

        <TextInput disabled defaultValue={identity.id} source="admin_id" />
      </SimpleForm>
    </Create>
  );
};
