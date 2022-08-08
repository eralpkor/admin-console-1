import * as React from "react";
import {
  usePermissions,
  useRecordContext,
  useNotify,
  useRedirect,
  Edit,
  SimpleForm,
  // TextField,
  TextInput,
  DateInput,
  SelectInput,
  Labeled,
  useGetIdentity,
  useCreate,
  AutocompleteInput,
  ReferenceInput,
  EditButton,
  Datagrid,
  ListBase,
  useCreateTitle,
  Pagination,
  FilterForm,
  Title,
  required,
  useGetList,
  ListContextProvider,
  useList,
} from "react-admin";
import { Button, Card, TextField, TextareaAutosize } from "@mui/material";
import { EditRecordButtons } from "../Buttons/EditRecordButtons";

// Add comment area and button
const AddComment = () => {
  const notify = useNotify();
  const [create, { isLoading, error }] = useCreate();
  const record = useRecordContext();
  const [comment, setComment] = React.useState("");
  const redirect = useRedirect();

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("comment", comment);
    console.log("record ", record);
    const data = { job_id: record.id, comment: comment };
    create("comments", { data: data });
    setComment("");
    notify("Comment added...");
    redirect(`/jobs/${record.id}`);
    // window.location.reload();
  };

  if (error) return <p>ERROR</p>;

  return (
    <>
      <TextareaAutosize
        onChange={handleChange}
        value={comment}
        id="comment"
        name="comment"
        aria-label="minimum height"
        minRows={3}
        placeholder="Please add a comment"
        style={{ width: 400 }}
      />
      <Button disabled={isLoading} onClick={handleSubmit} variant="contained">
        Add Comment
      </Button>
    </>
  );
};

const CommentList = () => {
  const { data, isLoading } = useGetList("comments", { page: 1, perPage: 50 });
  const record = useRecordContext();
  // console.log("whats comments ", record);
  const listContext = useList({ data, isLoading });
  // console.log("whats data ", data, isLoading);
  if (isLoading) return null;
  const filteredComments = data.filter((c, i) => {
    return c.job_id === record.id;
  });
  // console.log("whats length ", filteredComments.length);
  return (
    <div>
      <ListContextProvider value={listContext}>
        <ul style={{ listStyleType: "none", marginLeft: -10 }}>
          {!record.comments ? (
            <span style={{ color: "red" }}>
              No comments, would you like to add one?
            </span>
          ) : (
            record.comments.map((c, i) => {
              return <li key={i}>{c.comment}</li>;
            })
          )}
        </ul>
      </ListContextProvider>
    </div>
  );
};

const PaymentList = () => {
  const { data, isLoading } = useGetList("payments", { page: 1, perPage: 50 });

  const record = useRecordContext();
  if (isLoading) return null;

  return (
    <>
      <ul style={{ listStyleType: "none", marginLeft: -10 }}>
        {!record.payments ? (
          <span style={{ color: "red" }}>
            No comments, would you like to add one?
          </span>
        ) : (
          record.payments.map((c, i) => {
            return <li key={i}>$ {c.amount_paid}</li>;
          })
        )}
      </ul>
    </>
  );
};

// Show JOB title
const EditTitle = () => {
  const record = useRecordContext();
  const { identity, isLoading: identityLoading } = useGetIdentity();
  if (identityLoading) return <>Loading...</>;
  // console.log("Identity ", identity);
  // console.log("Edit title ", record); // record = job

  return <span>Job {record ? `"${record.job_title}"` : ""}</span>;
};

// Add Payment input & button
const AddPayment = (e) => {
  const notify = useNotify();
  const [create, { isLoading, error }] = useCreate();
  const record = useRecordContext();
  const redirect = useRedirect();
  const [payment, setPayment] = React.useState({
    payment_type: "",
    check_number: "",
    amount_paid: "",
    account_id: record.id,
  });

  const handleChange = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setPayment((payment) => ({
      ...payment,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("comment", payment);
    console.log("record ", record);
    const data = {
      payment_type: payment.payment_type,
      check_number: payment.check_number,
      amount_paid: +payment.amount_paid,
      account_id: record.id,
    };
    create("payments", { data: data });
    console.log("What is payment data ", data);
    setPayment({
      payment_type: "",
      check_number: "",
      amount_paid: "",
      account_id: record.id,
    });
    if (!error) {
      notify("Payment added...");
      // redirect(`/accounts/${record.id}`);
      window.location.reload();
    }
  };

  if (error) return <p>ERROR</p>;
  return (
    <>
      <TextField
        onChange={handleChange}
        margin="normal"
        validate={[required()]}
        required
        id="payment_type"
        label="Payment type"
        name="payment_type"
        autoFocus
      />
      <TextField
        onChange={handleChange}
        margin="normal"
        validate={[required()]}
        required
        id="check_number"
        label="Check number"
        name="check_number"
      />
      <TextField
        onChange={handleChange}
        margin="normal"
        validate={[required()]}
        required
        id="amount_paid"
        label="Payment"
        name="amount_paid"
      />
      <Button disabled={isLoading} onClick={handleSubmit} variant="contained">
        Add Payment
      </Button>
    </>
  );
};

export const JobEdit = () => {
  const { isLoading, permissions } = usePermissions();
  const notify = useNotify();
  const redirect = useRedirect();
  const { identity, isLoading: identityLoading } = useGetIdentity();
  if (identityLoading) return <>Loading...</>;

  // console.log("What is user permission ", permissions);
  if (isLoading) return null;
  const onError = (error) => {
    notify(`Could not load list: ${error.message}`, { type: "warning" });
    redirect("/dashboard");
  };

  // mutationOptions={{ onSuccess }}
  return permissions === "user" ? (
    // user inputs
    <Edit title={<EditTitle />} queryOptions={{ onError }}>
      <SimpleForm warnWhenUnsavedChanges toolbar={<EditRecordButtons />}>
        <TextInput disabled source="id" label="Job ID" />
        <TextInput disabled source="job_title" label="Job Title" />
        <TextInput
          disabled
          source="job_description"
          label="Description"
          multiline={true}
          fullWidth
        />
        <TextInput disabled source="due_date" label="Due Date" />
        <ReferenceInput source="assigned_to" reference="users">
          <SelectInput disabled label="Processor" optionText="username" />
        </ReferenceInput>
        <SelectInput
          source="in_progress"
          label="Progress"
          choices={[
            { id: "open", name: "Open" },
            { id: "in-progress", name: "In-Progress" },
            { id: "closed", name: "Closed" },
          ]}
        />
        <TextInput disabled source="first_name" />
        <TextInput disabled source="last_name" />
        <Labeled label="Username">
          <TextInput disabled source={identity.username} />
        </Labeled>
        <CommentList />
        <AddComment />
      </SimpleForm>
    </Edit>
  ) : (
    // Admin inputs
    <Edit title={<EditTitle />} queryOptions={{ onError }}>
      <SimpleForm toolbar={<EditRecordButtons />}>
        <TextInput disabled source="id" label="Job ID" />
        <TextInput source="job_title" label="Job Title" />
        <TextInput
          source="job_description"
          label="Description"
          multiline={true}
          fullWidth
        />
        <DateInput source="due_date" label="Due Date" />
        <ReferenceInput source="assigned_to" reference="users">
          <SelectInput label="Processor" optionText="username" />
        </ReferenceInput>
        <SelectInput
          source="in_progress"
          label="Progress"
          choices={[
            { id: "open", name: "Open" },
            { id: "in-progress", name: "In-Progress" },
            { id: "closed", name: "Closed" },
          ]}
        />
        <TextInput source="total" />
        <TextInput disabled source="balance" label="Balance $" />
        <p>All payments for this job</p>
        <PaymentList />
        <AddPayment />
        <TextInput disabled source="first_name" />
        <TextInput disabled source="last_name" />
        <TextInput disabled source="created_at" label="Created at" />
        <TextInput disabled source="updated_at" label="Updated at" />
        <Labeled label="Username">
          <TextInput disabled source={identity.username} />
        </Labeled>
        <CommentList />
        <AddComment />
      </SimpleForm>
    </Edit>
  );
};
