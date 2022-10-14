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
  useNotify,
  useRedirect,
} from "react-admin";

const EditTitle = (props) => {
  const record = useRecordContext();
  const { identity, isLoading: identityLoading } = useGetIdentity();
  if (identityLoading) return <>Loading...</>;
  console.log("Identity ", identity);
  console.log("Edit button click ", record); // record = job

  return (
    <span>
      You are creating a comment for Job ID: {record ? `"${record.jobId}"` : ""}
    </span>
  );
};

export const CommentCreate = (props) => {
  const notify = useNotify();
  const redirect = useRedirect();
  const record = useRecordContext();
  const { identity, isLoading: identityLoading } = useGetIdentity();
  if (identityLoading) return <>Loading...</>;

  const onSuccess = (data) => {
    console.log("whats data ", data);
    notify(`Changes saved`);
    setTimeout(() => {
      redirect(`/job/${data.jobId}`);
    }, 1500);
  };

  return (
    <Create {...props} title={<EditTitle />} mutationOptions={{ onSuccess }}>
      <SimpleForm>
        <TextInput source="jobId" label="Job id" />
        <TextInput source="comment" validate={[required()]} />
        <TextInput disabled label="Processor" source="userId" />
        <TextInput disabled source="editedBy" />
      </SimpleForm>
    </Create>
  );
};
