import * as React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  DateInput,
  required,
  SelectInput,
  useRecordContext,
  useGetIdentity,
  minValue,
  number,
  useNotify,
  useRedirect,
} from "react-admin";
import {
  Button,
  Card,
  CardContent,
  Typography,
  TextareaAutosize,
  Box,
  Divider,
} from "@mui/material";
const EditTitle = (props) => {
  const record = useRecordContext();
  const { identity, isLoading: identityLoading } = useGetIdentity();
  if (identityLoading) return <>Loading...</>;
  console.log("Identity ", identity);
  console.log("Edit button click ", record.jobId); // record = job

  return (
    <span>
      You are creating a payment for Job ID: {record ? `"${record.jobId}"` : ""}
    </span>
  );
};

export const PaymentCreate = (props) => {
  const notify = useNotify();
  const redirect = useRedirect();
  const validateAmount = [number(), minValue(0)];

  const record = useRecordContext();
  const { identity, isLoading: identityLoading } = useGetIdentity();
  if (identityLoading) return <>Loading...</>;
  console.log("what is props ", props);

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
        <TextInput disabled source="jobId" label="Job id" />
        <SelectInput
          validate={[required()]}
          source="paymentType"
          label="Payment type"
          defaultValue="CASH"
          choices={[
            { id: "CASH", name: "CASH" },
            { id: "CHECK", name: "CHECK" },
            { id: "CREDIT", name: "CREDIT" },
            { id: "ACH", name: "ACH" },
          ]}
        />
        <TextInput
          source="amountPaid"
          label="Payment"
          validate={validateAmount}
          defaultValue="0"
        />
        <TextInput disabled source="userId" />
        <TextInput disabled source="editedBy" />
      </SimpleForm>
    </Create>
  );
};
