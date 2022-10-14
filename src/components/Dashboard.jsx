import * as React from "react";
import { Card, CardContent, CardHeader } from "@mui/material";
import { UserName } from "../Auth/userAuth";

const date = new Date();
let hours = date.getHours();
let status =
  hours < 12 ? "Morning" : hours <= 18 && hours >= 12 ? "Afternoon" : "Night";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
  <Card>
    <CardHeader title="Welcome to the administration" />
    <CardContent>
      Welcome{" "}
      <strong>
        <UserName />
      </strong>
      <span id="day-message">, Good {status}.</span>
    </CardContent>
  </Card>
);
