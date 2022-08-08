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
} from "react-admin";

export const AccountsCreate = () => {
  const { identity, isLoading: identityLoading } = useGetIdentity();
  if (identityLoading) return <>Loading...</>;

  return (
    <Create>
      <SimpleForm>
        <TextInput source="account_id" label="Account id" />
        <TextInput source="job_id" label="Job id" />
        <TextInput source="total" label="Total" />
        <TextInput source="balance" label="Balance" />
      </SimpleForm>
    </Create>
  );
};
