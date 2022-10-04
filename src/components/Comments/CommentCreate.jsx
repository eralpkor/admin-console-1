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
  minValue,
  number,
} from "react-admin";

const EditTitle = (props) => {
  const record = useRecordContext();
  const { identity, isLoading: identityLoading } = useGetIdentity();
  if (identityLoading) return <>Loading...</>;
  console.log("Identity ", identity);
  console.log("Edit button click ", record); // record = job

  return <span>Job ID: {record ? `"${record.jobId}"` : ""}</span>;
};

export const CommentCreate = (props) => {
  const validateAmount = [number(), minValue(0)];

  const record = useRecordContext();
  const { identity, isLoading: identityLoading } = useGetIdentity();
  if (identityLoading) return <>Loading...</>;
  console.log("what is props ", props);

  return (
    <Create {...props} title={<EditTitle />}>
      <SimpleForm>
        <TextInput source="jobId" label="Job id" />
        <TextInput source="comment" validate={[required()]} />
        <TextInput disabled label="Processor" source="userId" />
        <TextInput disabled source="editedBy" />
      </SimpleForm>
    </Create>
  );
};
