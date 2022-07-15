import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DateField,
  usePermissions,
  useNotify,
  useRedirect,
  FunctionField,
} from "react-admin";
import { BulkActionButtons } from "../Buttons/BulkActionButtons";
import { ListActionButtons } from "../Buttons/ListActionButtons";

export const JobList = () => {
  const { isLoading, permissions } = usePermissions();
  console.log("joblist pwrmissions ", permissions);
  const notify = useNotify();
  const redirect = useRedirect();
  if (isLoading) return null;
  const onError = (error) => {
    notify(`Could not load list: ${error.message}`, { type: "warning" });
    redirect("/dashboard");
  };

  return (
    <List actions={<ListActionButtons />} queryOptions={{ onError }}>
      <Datagrid
        bulkActionButtons={permissions === "admin" && <BulkActionButtons />}
        sx={{
          "& .column-job_title": { backgroundColor: "#fee" },
          "& .column-balance": { backgroundColor: "#fee" },
        }}
      >
        <TextField source="id" />
        <TextField source="job_title" />
        <TextField source="job_description" />
        <TextField source="in_progress" />
        <DateField source="due_date" />
        <TextField source="username" label="Processor" />
        {permissions === "admin" && <TextField source="balance" />}
        {permissions === "admin" && <TextField source="amount_paid_1" />}
        {permissions === "admin" && <TextField source="amount_paid_2" />}
        {permissions === "admin" && <TextField source="amount_paid_2" />}
        <FunctionField
          label="Full name"
          render={(record) => `${record.first_name} ${record.last_name}`}
        />
        <TextField source="username" />
        <EditButton />
      </Datagrid>
    </List>
  );
};
