import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  TextInput,
  FilterForm,
  FilterButton,
  useAuthenticated,
  usePermissions,
  DateField,
  useNotify,
  useRedirect,
  useGetIdentity,
  ReferenceField,
} from "react-admin";
import { ListActionButtons } from "../Buttons/CommentListActionButtons";
import { BulkActionButtons } from "../Buttons/BulkActionButtons";
import { Stack } from "@mui/material";

const filters = [
  <TextInput autoFocus label="Comment" source="comment" />,
  <TextInput autoFocus label="Job" source="job_id" />,
];

export const CommentsList = () => {
  const { isLoading, permissions } = usePermissions();
  const { identity, isLoading: identityLoading } = useGetIdentity();
  const notify = useNotify();
  const redirect = useRedirect();

  if (identityLoading) return <>Loading...</>;

  if (isLoading) return null;
  // if error redirect to dashboard
  const onError = (error) => {
    notify(`Could not load list: ${error.message}`, { type: "warning" });
    redirect("/dashboard");
  };

  return (
    <List queryOptions={{ onError }} actions={<ListActionButtons />}>
      <Datagrid
        bulkActionButtons={
          permissions === "superAdmin" && <BulkActionButtons />
        }
      >
        <TextField source="id" />
        <DateField source="createdAt" sortByOrder="DESC" />
        <DateField source="updatedAt" />
        <TextField source="comment" />
        <TextField source="jobId" />
        <ReferenceField label="Processor" source="userId" reference="user">
          <TextField source="username" />
        </ReferenceField>
        <ReferenceField label="Admin" source="editedBy" reference="user">
          <TextField source="username" />
        </ReferenceField>
        <EditButton />
      </Datagrid>
    </List>
  );
};
