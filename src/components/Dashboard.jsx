import * as React from "react";
import {
  useGetIdentity,
  useGetMany,
  useGetList,
  List,
  Datagrid,
  TextField,
  useNotify,
  useAuthenticated,
  usePermissions,
  EmailField,
  useRedirect,
} from "react-admin";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@mui/material";
import { UserName } from "../Auth/userAuth";

const date = new Date();
let hours = date.getHours();
let status =
  hours < 12 ? "Morning" : hours <= 18 && hours >= 12 ? "Afternoon" : "Evening";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  // const { identity, isLoading, error } = useGetIdentity();
  // const { identity } = useGetIdentity();
  // const { data, refetch } = useGetMany("user-job", { userId: [1] });
  const { data, total, isLoading, error } = useGetList("user-job", {
    filter: { userId: auth.id },
  });
  if (isLoading) return <div>Loading</div>;
  if (error) return <div>error;</div>;

  return (
    <Card>
      <CardHeader title="Welcome to the administration" />
      <CardContent>
        Welcome{" "}
        <strong>
          <UserName />
        </strong>
        <span id="day-message">, Good {status}.</span>
        <Link
          to="/user-job"
          sx={{
            textDecoration: "none",
          }}
        >
          <span>
            {" "}
            <strong>
              {data.length ? ` You have ${data.length} jobs` : " "}
            </strong>
          </span>
        </Link>
      </CardContent>
    </Card>
  );
};
