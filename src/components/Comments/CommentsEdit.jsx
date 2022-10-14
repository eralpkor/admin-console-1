import * as React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  usePermissions,
  useRecordContext,
  Labeled,
  useGetIdentity,
  required,
  TextField,
  ReferenceField,
  useRedirect,
  useNotify,
} from "react-admin";

const EditTitle = (props) => {
  const record = useRecordContext();
  const { identity, isLoading: identityLoading } = useGetIdentity();
  if (identityLoading) return <>Loading...</>;
  if (!record) return <>Record Loading...</>;
  console.log("Identity ", identity);
  console.log("Edit button click ", record.jobId); // record = job

  return (
    <span>
      You are editing a comment for Job ID: {record ? `"${record.jobId}"` : ""}
    </span>
  );
};

export const CommentsEdit = (props) => {
  const record = useRecordContext();
  const notify = useNotify();
  const redirect = useRedirect();
  const { identity, isLoading: identityLoading } = useGetIdentity();
  // if (!record) return <>Loading...</>;

  if (identityLoading) return <>Loading...</>;

  // const onSuccess = (data) => {
  //   console.log("whats data ", data);
  //   mutationOptions={{ onSuccess }}
  //   notify(`Changes saved`);
  //   setTimeout(() => {
  //     redirect(`/job/${data.jobId}`);
  //   }, 3000);
  // };
  // console.log("whats record ", record, identity);

  return (
    <Edit title={<EditTitle />} redirect="edit">
      <SimpleForm defaultValues={{ editedBy: identity.id }}>
        <TextInput disabled source="jobId" />
        <TextInput multiline validate={required()} source="comment" />
        <ReferenceField label="Processor" source="userId" reference="user">
          <TextField label="Processor" source="username" />
        </ReferenceField>
        {/* <TextInput source="editedBy" /> */}
      </SimpleForm>
    </Edit>
  );
};

// EOF
