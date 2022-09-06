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
  ReferenceInput,
} from "react-admin";

export const CommentsEdit = (props) => {
  const record = useRecordContext();
  const { identity, isLoading: identityLoading } = useGetIdentity();
  // if (!record) return <>Loading...</>;

  if (identityLoading) return <>Loading...</>;

  console.log("whats record ", record, identity);

  return (
    <Edit redirect={`/jobs`}>
      <SimpleForm>
        <TextInput disabled source="job_id" />
        <TextInput multiline validate={required()} source="comment" />
        {/* <TextInput source={obj} /> */}
        <TextInput disabled source="edited_by" defaultValue={identity.id} />
        {/* <TextInput disabled source="added_by" label="Added by" />
        <TextInput disabled source="created_at" label="Created at" />
        <TextInput disabled source="updated_at" label="Updated at" /> */}
      </SimpleForm>
    </Edit>
  );
};

// mutationOptions={{ edited_by: identity.id }}
