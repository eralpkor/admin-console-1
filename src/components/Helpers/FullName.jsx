import { useRecordContext } from "react-admin";

export const FullNameField = (props) => {
  const record = useRecordContext(props);
  console.log("whats is record in function ", record);
  return record ? (
    <span>
      {record.firstName} {record.lastName}
    </span>
  ) : null;
};

FullNameField.defaultProps = { label: "Customer" };
