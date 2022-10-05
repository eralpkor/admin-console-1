import * as React from "react";
import {
  usePermissions,
  useRecordContext,
  useNotify,
  useRedirect,
  Edit,
  SimpleForm,
  TextInput,
  DateInput,
  SelectInput,
  Labeled,
  useGetIdentity,
  AutocompleteInput,
  ReferenceInput,
  EditButton,
  required,
  useGetOne,
} from "react-admin";
import StickyFooter from "../Helpers/NoAcess";

const EditTitle = () => {
  const record = useRecordContext();
  const { identity, isLoading: identityLoading } = useGetIdentity();
  if (identityLoading) return <>Loading...</>;

  return (
    <span>
      Job {record ? `"Editing payment for job id ${record.jobId}"` : ""}
    </span>
  );
};

export const PaymentEdit = ({ record }) => {
  const { isLoading, permissions } = usePermissions();
  // const record = useRecordContext();
  const notify = useNotify();
  const redirect = useRedirect();
  const { identity, isLoading: identityLoading } = useGetIdentity();
  if (identityLoading) return <>Loading...</>;
  // if (!record) return <>Loading...</>;
  if (isLoading) return null;
  if (permissions === "user") {
    return <StickyFooter />;
  }
  const onError = (error) => {
    notify(`Could not load list: ${error.message}`, { type: "warning" });
    redirect("/dashboard");
  };
  const id = identity.id;
  // const UserIdentity = () => {
  //   const { identity, isLoading: identityLoading } = useGetIdentity();
  //   const [id, setId] = React.useState({
  //     editedBy: "",
  //   });
  //   if (identityLoading) return <>Loading...</>;
  // };
  const Payments = ({ record, identity }) => {
    console.log("whats identity ", identity);
    // const { data, error } = useGetOne("user", { id: identity.id });
    // if (error) {
    //   return <p>ERROR</p>;
    // }
    // console.log("whats user ", data);
    // return <p>{user.id}</p>;
  };
  // const postDefaultValue = () => ({ editedBy: id });
  return (
    <Edit redirect="edit" title={<EditTitle />} queryOptions={{ onError }}>
      <SimpleForm>
        <TextInput disabled source="id" label="Payment ID" />
        <TextInput disabled source="jobId" label="Job ID" />
        <SelectInput
          source="paymentType"
          validate={[required()]}
          defaultValue="CASH"
          choices={[
            { id: "CASH", name: "CASH" },
            { id: "CREDIT", name: "CREDIT" },
            { id: "CHECK", name: "CHECK" },
            { id: "ACH", name: "ACH" },
          ]}
        />
        <TextInput source="amountPaid" />
        <TextInput disabled source="userId" />
        <Payments />
        <TextInput disabled source="editedBy" defaultValue={identity.id} />
      </SimpleForm>
    </Edit>
  );
};
