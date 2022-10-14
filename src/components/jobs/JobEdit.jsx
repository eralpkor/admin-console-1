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
  DateField,
  ReferenceInput,
  Datagrid,
  required,
  NumberField,
  ReferenceManyField,
  TextField,
  ReferenceField,
  Pagination,
} from "react-admin";
import { Link } from "react-router-dom";
import { Button, Card, CardContent, Typography, Divider } from "@mui/material";
import { EditRecordButtons } from "../Buttons/EditRecordButtons";
import { FullNameField } from "../Helpers/FullName";
import "./jobEdit.css";
import { ListActionButtons } from "../Buttons/JobActionButtons";
// Show JOB title
const EditTitle = () => {
  const record = useRecordContext();
  const { identity, isLoading: identityLoading } = useGetIdentity();
  if (identityLoading) return <>Loading...</>;

  return <span>You're editing Job {record ? `"${record.title}"` : ""}</span>;
};

// Add new Comment button
const CreateCommentButton = () => {
  const record = useRecordContext();
  const { identity, isLoading: identityLoading } = useGetIdentity();
  if (identityLoading) return <>Loading...</>;

  return (
    <Button
      sx={{ marginTop: "1rem" }}
      variant="contained"
      component={Link}
      to={{
        pathname: "/comment/create",
      }}
      state={{
        record: {
          jobId: record.id,
          editedBy: identity.id,
          userId: identity.id,
        },
      }}
    >
      Create a new comment for this job
    </Button>
  );
};

// Add new payment button
const CreatePaymentButton = () => {
  const record = useRecordContext();
  const { identity, isLoading: identityLoading } = useGetIdentity();
  if (identityLoading) return <>Loading...</>;

  return (
    <Button
      sx={{ marginTop: "1rem" }}
      variant="contained"
      component={Link}
      to={{
        pathname: "/payment/create",
      }}
      state={{
        record: {
          jobId: record.id,
          editedBy: identity.id,
          userId: identity.id,
        },
      }}
    >
      Create a new payment for this job
    </Button>
  );
};

export const JobEdit = (props) => {
  const record = useRecordContext();
  const { isLoading, permissions } = usePermissions();
  const notify = useNotify();
  const redirect = useRedirect();
  const { identity, isLoading: identityLoading } = useGetIdentity();
  if (identityLoading) return <>Loading...</>;
  if (isLoading) return null;
  const onError = (error) => {
    notify(`Could not load list: ${error.message}`, { type: "warning" });
    redirect("/dashboard");
  };

  return permissions === "USER" ? (
    // user inputs
    <Edit {...props} title={<EditTitle />} queryOptions={{ onError }}>
      <SimpleForm warnWhenUnsavedChanges toolbar={<EditRecordButtons />}>
        <TextInput disabled source="id" label="Job ID" />
        <TextInput disabled source="title" label="Job Title" />
        <TextInput
          disabled
          source="description"
          label="Description"
          multiline={true}
          fullWidth
        />
        <Labeled label="Due date">
          <DateField disabled source="dueDate" label="Due Date" />
        </Labeled>

        <TextInput disabled source="processor" />
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

        <ReferenceInput source="customerId" reference="customer">
          <SelectInput disabled optionText={<FullNameField />} />
        </ReferenceInput>

        <Labeled label="Admin">
          <TextInput disabled source={identity.username} />
        </Labeled>
        {/* Comments  */}
        <Divider />
        <Card>
          <h3 style={{ color: "#DC143C" }}>Comment/s</h3>

          <ReferenceManyField
            reference="comment"
            label="Comment"
            target="jobId"
            perPage={100}
          >
            <Datagrid rowClick="edit">
              <DateField source="createdAt" sortByOrder="DESC" />
              <DateField source="updatedAt" />
              <TextField source="comment" />

              <TextField label="Processor" source="userId" />
              <TextField source="editedBy" />
              <NumberField source="jobId" />
            </Datagrid>
          </ReferenceManyField>
          <CreateCommentButton />
        </Card>
      </SimpleForm>
    </Edit>
  ) : (
    // Admin inputs
    <Edit title={<EditTitle />} queryOptions={{ onError }}>
      <SimpleForm toolbar={<EditRecordButtons />}>
        <Card variant="outlined" sx={{ maxWidth: 345 }}>
          {/* <CardActionArea> */}
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              <TextInput disabled source="id" label="Job ID" />
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <Labeled label="Created at">
                <DateField source="createdAt" label="Created at" />
              </Labeled>
              <span> / </span>
              <Labeled label="Edited at">
                <DateField source="updatedAt" label="Updated at" />
              </Labeled>
            </Typography>
          </CardContent>
          {/* </CardActionArea> */}
        </Card>

        <TextInput source="title" label="Job Title" />
        <TextInput
          source="description"
          label="Description"
          multiline
          resettable
          fullWidth
        />
        <DateInput source="dueDate" label="Due Date" />

        <ReferenceInput
          label="User"
          source="userId"
          reference="user"
          validate={[required()]}
        >
          <SelectInput optionText="username" />
        </ReferenceInput>
        <ReferenceInput source="customerId" reference="customer">
          <SelectInput optionText={<FullNameField />} />
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

        <TextInput
          label="Total $"
          source="total"
          format={(v) => "$" + v.toFixed(2)}
        />
        <Labeled label="Balance">
          <NumberField
            sx={{ fontSize: "1.5rem" }}
            source="balance"
            options={{
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 2,
            }}
          />
        </Labeled>
        {/* Payment list */}
        <Card>
          <h3 style={{ color: "#DC143C" }}>Payment/s</h3>
          <ReferenceManyField
            pagination={<Pagination />}
            reference="payment"
            label="Payment"
            target="jobId"
            perPage={25}
          >
            <Datagrid rowClick="edit">
              <DateField source="createdAt" sortByOrder="ASC" />
              <DateField source="updatedAt" />
              {/*         */}
              <TextField source="editedBy" label="Admin" />
              <ReferenceField label="Added by" source="userId" reference="user">
                <TextField source="username" />
              </ReferenceField>
              <TextField source="paymentType" />
              <NumberField
                sx={{ fontSize: "0.8rem" }}
                source="amountPaid"
                options={{
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 2,
                }}
              />
            </Datagrid>
          </ReferenceManyField>
          {/* Payment add  */}
          <CreatePaymentButton />
        </Card>
        {/* Comment list  */}
        <Divider />
        <Card>
          <h3 style={{ color: "#DC143C" }}>Comment/s</h3>
          <ReferenceManyField
            pagination={<Pagination />}
            reference="comment"
            label="Comment"
            target="jobId"
            perPage={25}
          >
            <Datagrid rowClick="edit">
              <DateField source="createdAt" sortByOrder="ASC" />
              <DateField source="updatedAt" />
              <TextField source="comment" />

              {/* <TextField source="editedBy" /> */}
              <TextField source="admin" label="Added by" />
            </Datagrid>
          </ReferenceManyField>
          <CreateCommentButton />
        </Card>
        <Divider sx={{ marginTop: "1rem" }} />
        <Labeled label="Admin">
          <TextField disabled source="adminId" defaultValue={identity.id} />
        </Labeled>
      </SimpleForm>
    </Edit>
  );
};

// EOF
