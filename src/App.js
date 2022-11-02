import * as React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  Admin,
  Resource,
  usePermissions,
  useGetIdentity,
  defaultTheme,
  ToggleThemeButton,
} from "react-admin";
import { UserList } from "./components/Users/UserList";
import { EditUser } from "./components/Users/EditUser";
import { CreateUser } from "./components/Users/CreateUser";
import { JobList } from "./components/jobs/JobList";
import { JobEdit } from "./components/jobs/JobEdit";
import { JobCreate } from "./components/jobs/JobCreate";
import { CustomerList } from "./components/Customers/CustomerList";
import { EditCustomer } from "./components/Customers/EditCustomer";
import { CreateCustomer } from "./components/Customers/CreateCustomer";
import UserIcon from "@mui/icons-material/Group";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import WorkIcon from "@mui/icons-material/Work";
import CommentIcon from "@mui/icons-material/Comment";

import Dashboard from "./components/Dashboard";
import { authProvider, httpClient } from "./Auth/authProvider";
import simpleRestProvider from "ra-data-simple-rest";
import LoginPage from "./components/LoginPage";
import { PaymentsList } from "./components/Payments/PaymentsList";
import { PaymentCreate } from "./components/Payments/PaymentCreate";
import { PaymentEdit } from "./components/Payments/PaymentEdit";
import { CommentsList } from "./components/Comments/CommentsList";
import { CommentsEdit } from "./components/Comments/CommentsEdit";
import { CommentCreate } from "./components/Comments/CommentCreate";
import { LogList } from "./components/Logs/LogList";
import { UserJobList } from "./components/jobs/UserJobList";
// const dataProvider = simpleRestProvider(
//   "http://localhost:5000/api",
//   httpClient
// );
import dataProvider from "./DataProvider/dataProvider";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      structuralSharing: false,
    },
    mutations: {
      retryDelay: 10000,
    },
  },
});
const theme = {
  ...defaultTheme,
  palette: {
    mode: "dark", // Switching the dark mode on is a single property value change.
  },
};
// put in Admin
// theme={theme}
const App = () => {
  return (
    <Admin
      dataProvider={dataProvider}
      dashboard={Dashboard}
      authProvider={authProvider}
      loginPage={LoginPage}
    >
      {/*  Restricting Access */}
      {(permissions) => [
        <Resource name="user-job" list={UserJobList} />,
        <Resource
          name="job"
          list={JobList}
          edit={JobEdit}
          create={permissions === "SUPERADMIN" || "ADMIN" ? JobCreate : null}
          icon={WorkIcon}
        />,
        <Resource
          name="comment"
          list={CommentsList}
          edit={CommentsEdit}
          create={CommentCreate}
          icon={CommentIcon}
        />,
        permissions === "SUPERADMIN" ? (
          <Resource
            name="user"
            list={UserList}
            create={CreateUser}
            edit={EditUser}
            icon={UserIcon}
          />
        ) : null,
        permissions === "SUPERADMIN" || "ADMIN" ? (
          <Resource
            name="customer"
            list={CustomerList}
            edit={EditCustomer}
            create={CreateCustomer}
            icon={PersonOutlineIcon}
          />
        ) : null,
        permissions === "SUPERADMIN" || "ADMIN" ? (
          <Resource
            name="payment"
            list={PaymentsList}
            edit={PaymentEdit}
            create={PaymentCreate}
            icon={AttachMoneyIcon}
          />
        ) : null,
        permissions === "SUPERADMIN" ? (
          <Resource name="log" list={LogList} icon={PersonOutlineIcon} />
        ) : null,
      ]}
    </Admin>
  );
};

export default App;

//EOF
