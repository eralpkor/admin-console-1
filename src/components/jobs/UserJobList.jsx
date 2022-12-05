import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  usePermissions,
  useNotify,
  useRedirect,
  useGetIdentity,
  NumberField,
  ReferenceManyField,
} from "react-admin";
import { BulkActionButtons } from "../Buttons/BulkActionButtons";
import { ListActionButtons } from "../Buttons/JobActionButtons";
import { FullNameField } from "../Helpers/FullName";

const date = new Date();
let hours = date.getHours();
let status =
  hours < 12 ? "Morning" : hours <= 18 && hours >= 12 ? "Afternoon" : "Evening";

export const UserJobList = (props) => {
  // const { identity, error } = useGetIdentity();
  const user = JSON.parse(localStorage.getItem("auth"));

  const { isLoading, permissions } = usePermissions();
  const notify = useNotify();
  const redirect = useRedirect();
  if (isLoading) return null;
  const onError = (error) => {
    notify(`Could not load list: ${error.message}`, { type: "warning" });
    redirect("/dashboard");
  };

  return (
    <div>
      <h3 style={{ color: "crimson" }}>
        Good {status} {user.firstName}!
      </h3>
      <List
        filter={{ userId: user.id }}
        perPage={50}
        queryOptions={{ onError }}
      >
        <Datagrid rowClick={(id) => `/job/${id}`}>
          <TextField source="id" />
          <DateField source="createdAt" sortByOrder="DESC" />
          <TextField source="title" />
          <TextField maxWidth={250} source="description" />
          {/* Customer name */}
          <FullNameField />
          <TextField source="inProgress" />
          <DateField source="dueDate" />
          <TextField source="username" label="Processor" />
        </Datagrid>
      </List>
    </div>
  );
};
