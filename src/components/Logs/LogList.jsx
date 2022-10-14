import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  usePermissions,
  useNotify,
  useRedirect,
  Pagination,
  DateField,
  useListContext,
} from "react-admin";
import { Button, Toolbar } from "@mui/material";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";

import StickyFooter from "../Helpers/NoAcess";
// const PostPagination = (props) => (
//   <Pagination rowsPerPageOptions={[10, 25, 50, 100]} {...props} />
// );

const PostPagination = () => {
  const { page, hasPreviousPage, hasNextPage, setPage } = useListContext();
  if (!hasPreviousPage && !hasNextPage) return null;
  return (
    <Toolbar>
      {hasPreviousPage && (
        <Button
          key="previous"
          onClick={() => setPage(page - 1)}
          startIcon={<ChevronLeft />}
        >
          Previous
        </Button>
      )}
      {hasNextPage && (
        <Button
          key="next"
          onClick={() => setPage(page + 1)}
          startIcon={<ChevronRight />}
        >
          Next
        </Button>
      )}
    </Toolbar>
  );
};
export const LogList = (props) => {
  const { isLoading, permissions } = usePermissions();
  const notify = useNotify();
  const redirect = useRedirect();

  if (!permissions === "SUPERADMIN") {
    return <StickyFooter />;
  }
  if (isLoading) return null;

  // if error redirect to dashboard
  const onError = (error) => {
    notify(`Could not load list: ${error.message}`, { type: "warning" });
    redirect("/dashboard");
  };

  return (
    <List {...props} queryOptions={{ onError }}>
      <Datagrid>
        <TextField source="id" />
        <DateField source="createdAt" />
        <TextField source="userId" />
        <TextField source="log" />
      </Datagrid>
    </List>
  );
};
