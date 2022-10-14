import * as React from "react";
import {
  useRecordContext,
  useNotify,
  useRedirect,
  SelectInput,
  useGetIdentity,
  useCreate,
  required,
  useRefresh,
  useGetMany,
  TextField,
} from "react-admin";
import { Button, Card } from "@mui/material";
import { EditRecordButtons } from "../Buttons/EditRecordButtons";
import { FullNameField } from "../Helpers/FullName";
import "./jobEdit.css";
import { ListActionButtons } from "../Buttons/ListActionButtons";

// Add Payment input & button
const AddPayment = (e) => {
  const notify = useNotify();
  const [create, { isLoading, error }] = useCreate();
  const record = useRecordContext();
  const refresh = useRefresh();
  const redirect = useRedirect();
  const { identity, isLoading: identityLoading } = useGetIdentity();

  const [payment, setPayment] = React.useState({
    paymentType: "",
    amountPaid: "",
    jobId: "",
    userId: "",
    adminId: "",
  });
  if (identityLoading) return <>Loading...</>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayment((payment) => ({
      ...payment,
      [name]: value,
    }));
  };

  console.log("whats id shit ", identity.id);
  const handleSubmit = () => {
    const data = {
      paymentType: payment.paymentType || "CASH",
      amountPaid: +payment.amountPaid,
      jobId: record.id,
      userId: identity.id,
      adminId: identity.id,
    };
    create("payment", { data: data });
    setPayment({
      paymentType: "",
      amountPaid: "",
      jobId: "",
      userId: "",
      adminId: "",
    });
    if (!error) {
      notify("Payment added...");
      setTimeout(() => {
        refresh();
      }, 2000);
    }
  };

  if (error) return <span>ERROR</span>;

  return (
    <>
      <SelectInput
        source="paymentType"
        label="Payment type"
        optionValue="name"
        choices={[
          { id: "CASH", name: "CASH" },
          { id: "CHECK", name: "CHECK" },
          { id: "CREDIT", name: "CREDIT" },
          { id: "ACH", name: "ACH" },
        ]}
      />
      <TextField
        onChange={handleChange}
        margin="normal"
        validate={[required()]}
        defaultValue={0}
        id="amountPaid"
        label="Payment"
        name="amountPaid"
      />
      <Button disabled={isLoading} onClick={handleSubmit} variant="contained">
        Add Payment
      </Button>
    </>
  );
};
export const PaymentList = () => {
  const redirect = useRedirect();
  const record = useRecordContext();
  const result = [record.id];
  const { data, isLoading, error } = useGetMany("payment", {
    ids: result,
  });

  if (isLoading) return <>Loading</>;
  if (error) return <>Error </>;
  console.log("payment data ", data, result);

  const renderTableData = (data) => {
    if (!record) return <>Loading</>;

    const handleClick = (i) => {
      redirect(`/payment/${i.target.id}`);
    };

    return data.map((p) => {
      const { id, paymentType, amountPaid, userId } = p;

      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{/* <DateField source="createdAt" /> */}</td>
          <td>{/* <DateField source="updatedAt" /> */}</td>
          <td>$ {amountPaid}</td>
          <td>{paymentType}</td>
          <td>{userId}</td>
          <td>
            <Button id={id} onClick={handleClick}>
              Edit
            </Button>
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      {!data.length ? (
        <span style={{ color: "#DC143C", fontWeight: "700" }}>
          No payment yet
        </span>
      ) : (
        <Card>
          <h3 style={{ color: "#DC143C" }}>Payment/s</h3>
          <table>
            <tbody>
              <tr>
                <th>Amount paid</th>
                <th>Payment type</th>
                <th>Created at</th>
                <th>Updated at</th>
                <th>Edit payment</th>
              </tr>
            </tbody>
            <tbody>{renderTableData(data)}</tbody>
          </table>
        </Card>
      )}
    </>
  );
};

// Add comment area and button
const AddComment = () => {
  const { identity, isLoading: identityLoading } = useGetIdentity();
  const refresh = useRefresh();
  const notify = useNotify();
  const [create, { isLoading, error }] = useCreate();
  const record = useRecordContext();
  const [comment, setComment] = React.useState("");
  if (identityLoading) return <>Loading...</>;
  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("add comment record ", record);
    const data = {
      jobId: record.id,
      editedBy: identity.id,
      comment: comment,
      userId: record.userId,
    };
    create("comment", { data: data });
    setComment("");
    if (error) return <p style={{ color: "" }}>ERROR</p>;
    if (!error) {
      notify("Comment added...");
      setTimeout(() => {
        refresh();
      }, 2000);
    }
  };

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
        style={{ width: 400, marginTop: "2rem" }}
      />
      <Button
        style={{ marginTop: "1rem", marginBottom: "1rem" }}
        disabled={isLoading}
        onClick={handleSubmit}
        variant="contained"
      >
        Add Comment
      </Button>
    </>
  );
};

const CommentList = () => {
  const redirect = useRedirect();
  const record = useRecordContext();
  const result = [record.id];
  const { data, isLoading, error } = useGetMany("comment", {
    ids: result,
  });
  // console.log("result ", result);
  if (isLoading) return <>Loading</>;
  if (error) return <>Error </>;

  // Render table for comment
  const renderTableData = () => {
    if (!record) return <>Loading</>;

    const handleClick = (i) => {
      redirect(`/comment/${i.target.id}`);
    };

    return data.map((c) => {
      const { id, createdAt, username, comment, updatedAt } = c;
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{createdAt}</td>
          <td>{updatedAt}</td>
          <td>{username}</td>
          <td>{comment}</td>
          <td>
            <Button id={id} onClick={handleClick}>
              Edit
            </Button>
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      {!data.length ? (
        <span style={{ color: "#DC143C", fontWeight: "700" }}>
          No work done yet, would you like to add one?
        </span>
      ) : (
        <Card>
          <h3 style={{ color: "#DC143C" }}>Comment/s</h3>
          <table>
            <tbody>
              <tr>
                <th>Created at</th>
                <th>Added by</th>
                <th>Comment</th>
                <th>Edit</th>
              </tr>
            </tbody>
            <tbody>{renderTableData()}</tbody>
          </table>
        </Card>
      )}
    </>
  );
};
