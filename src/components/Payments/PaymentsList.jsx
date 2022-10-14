import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  usePermissions,
  useNotify,
  useRedirect,
  NumberField,
  DateField,
} from "react-admin";
import { ListActionButtons } from "../Buttons/PaymentActionButtons";
import { BulkActionButtons } from "../Buttons/BulkActionButtons";

import StickyFooter from "../Helpers/NoAcess";

export const PaymentsList = () => {
  const { isLoading, permissions } = usePermissions();
  const notify = useNotify();
  const redirect = useRedirect();

  if (isLoading) return null;
  if (permissions === "USER") {
    return <StickyFooter />;
  }
  // if error redirect to dashboard
  const onError = (error) => {
    notify(`Could not load list: ${error.message}`, { type: "warning" });
    redirect("/dashboard");
  };
  return (
    <List
      perPage={25}
      queryOptions={{ onError }}
      actions={<ListActionButtons />}
    >
      <Datagrid
        bulkActionButtons={permissions !== "USER" && <BulkActionButtons />}
      >
        <TextField source="id" />
        <DateField source="createdAt" />
        <DateField source="updatedAt" />
        <TextField source="paymentType" />
        <NumberField
          source="amountPaid"
          options={{
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 2,
          }}
        />

        <TextField source="title" />
        <TextField label="Job id" source="jobId" />
        <TextField source="editedBy" />
        <EditButton />
      </Datagrid>
    </List>
  );
};
