import * as React from "react";
import {
  usePermissions,
  useRecordContext,
  useNotify,
  useRedirect,
  Edit,
  SimpleForm,
  TextInput,
  useGetIdentity,
} from "react-admin";

export const AccountEdit = () => {
  const { isLoading, permissions } = usePermissions();
  const notify = useNotify();
  const redirect = useRedirect();
  const { identity, isLoading: identityLoading } = useGetIdentity();
  const record = useRecordContext();

  if (isLoading) return null;
  if (identityLoading) return <>Loading...</>;

  const onError = (error) => {
    notify(`Could not load list: ${error.message}`, { type: "warning" });
    redirect("/dashboard");
  };
  if (isLoading) return null;
  console.log(identity, permissions);
  return permissions === "user" ? (
    <div>User cannot do that</div>
  ) : (
    <Edit queryOptions={{ onError }}>
      <SimpleForm>
        <TextInput disabled source="id" label="Account id" />
        <TextInput disabled source="job_id" label="Job id" />
        <TextInput disabled source="total" />
        <TextInput disabled source="balance" />
      </SimpleForm>
    </Edit>
  );
};
