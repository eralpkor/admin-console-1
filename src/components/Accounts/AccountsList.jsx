import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  useAuthenticated,
  usePermissions,
  useRecordContext,
  useNotify,
  useRedirect,
  FunctionField,
  useGetIdentity,
} from "react-admin";
import { ListActionButtons } from "../Buttons/ListActionButtons";
import { BulkActionButtons } from "../Buttons/BulkActionButtons";

import StickyFooter from "../Helpers/NoAcess";

export const AccountsList = () => {
  const { isLoading, permissions } = usePermissions();
  const record = useRecordContext();
  const redirect = useRedirect();
  const notify = useNotify();
  const { identity, isLoading: identityLoading } = useGetIdentity();
  const onError = (error) => {
    notify(`Could not load list: ${error.message}`, { type: "warning" });
    redirect("/dashboard");
  };

  if (isLoading) return null;
  if (identityLoading) return <>Loading...</>;
  if (permissions !== "superAdmin") {
    return <StickyFooter />;
  }
  return (
    <List actions={<ListActionButtons />} queryOptions={{ onError }}>
      <Datagrid
        bulkActionButtons={
          permissions === "superAdmin" && <BulkActionButtons />
        }
        rowClick="edit"
      >
        <TextField source="id" label="Account id" />
        <TextField source="job_id" label="Job id" />
        <TextField source="total" />
        <TextField source="balance" />
        <TextField source="created_at" />
        <TextField source="updated_at" />
        <TextField source="job_title" />
        {/* <FunctionField
          label="Full name"
          render={(record) => `${record.job_title} ${record.last_name}`}
        /> */}
        <EditButton />
      </Datagrid>
    </List>
  );
};
