import * as React from "react";
import {
  DeleteWithConfirmButton,
  Toolbar,
  Edit,
  SaveButton,
  useRecordContext,
  DeleteButton,
  usePermissions,
} from "react-admin";
import Button from "@mui/material/Button";

export const EditRecordButtons = (props) => {
  const record = useRecordContext();
  const { isLoading, permissions } = usePermissions();

  return (
    <Toolbar>
      <SaveButton />
      {/* <Button color="primary" onClick={null}>
        Custom Action
      </Button> */}
    </Toolbar>
  );
};
