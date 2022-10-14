import * as React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  DateInput,
  required,
  SelectInput,
  ReferenceInput,
  useGetIdentity,
  minValue,
  number,
  useRedirect,
  useNotify,
  AutocompleteInput,
} from "react-admin";
import { FullNameField } from "../Helpers/FullName";

export const JobCreate = () => {
  const validateAmount = [number(), minValue(0)];
  const { identity, isLoading: identityLoading } = useGetIdentity();

  if (identityLoading) return <>Loading...</>;

  const inputText = (choice) => `${choice.firstName} ${choice.lastName}`;
  const matchSuggestion = (filter, choice) => {
    return (
      choice.firstName.toLowerCase().includes(filter.toLowerCase()) ||
      choice.lastName.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <Create redirect="list">
      <SimpleForm>
        <TextInput source="title" validate={[required()]} label="Job title" />
        <TextInput
          source="description"
          validate={[required()]}
          label="Description"
          resettable
          multiline
        />
        <DateInput source="dueDate" label="Due Date" validate={[required()]} />
        {/* <FullNameField /> */}

        <ReferenceInput source="customerId" reference="customer">
          <SelectInput optionText={<FullNameField />} />
        </ReferenceInput>
        <ReferenceInput source="userId" reference="user">
          <SelectInput label="Processor" optionText="username" />
        </ReferenceInput>

        <SelectInput
          source="inProgress"
          label="Progress"
          defaultValue="OPEN"
          validate={[required()]}
          choices={[
            { id: "OPEN", name: "Open" },
            { id: "INPROGRESS", name: "In-Progress" },
            { id: "CLOSED", name: "Closed" },
          ]}
        />
        <TextInput source="total" validate={validateAmount} defaultValue="0" />
        <TextInput
          source="amountPaid"
          label="Payment"
          validate={validateAmount}
          defaultValue="0"
        />
        <SelectInput
          source="paymentType"
          validate={[required()]}
          defaultValue="CASH"
          choices={[
            { id: "CASH", name: "Cash" },
            { id: "CREDIT", name: "Credit Card" },
            { id: "CHECK", name: "Check" },
            { id: "ACH", name: "ACH" },
          ]}
        />
        <TextInput source="comment" defaultValue="N/A" />
        <TextInput disabled defaultValue={identity.id} source="adminId" />
      </SimpleForm>
    </Create>
  );
};
