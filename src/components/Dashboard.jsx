import * as React from "react";
import { Card, CardContent, CardHeader } from "@mui/material";
import { UserName } from "../Auth/userAuth";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
  <Card>
    <CardHeader title="Welcome to the administration" />
    <CardContent>
      Welcome{" "}
      <strong>
        <UserName />
      </strong>
    </CardContent>
  </Card>
);
