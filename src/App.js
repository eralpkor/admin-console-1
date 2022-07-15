import * as React from "react";
import { Admin, Resource, usePermissions } from "react-admin";
import { UserList, EditUser, CreateUser } from "./components/Users";
import { JobList } from "./components/jobs/JobList";
import { EditJob } from "./components/jobs/EditJob";
import { CreateJob } from "./components/jobs/CreateJob";
import { CustomerList } from "./components/Customers/CustomerList";
import { EditCustomer } from "./components/Customers/EditCustomer";
import { CreateCustomer } from "./components/Customers/CreateCustomer";
import PostIcon from "@mui/icons-material/Book";
import UserIcon from "@mui/icons-material/Group";
import Dashboard from "./components/Dashboard";
import { authProvider, httpClient } from "./Auth/authProvider";
import simpleRestProvider from "ra-data-simple-rest";
import LoginPage from "./components/LoginPage";
const dataProvider = simpleRestProvider(
  "http://localhost:5000/api",
  httpClient
);

const App = () => {
  const { isLoading, permissions } = usePermissions();

  console.log("Permissions in app js ", permissions, isLoading);
  if (isLoading) return null;

  return isLoading ? (
    <div>Waiting for permissions</div>
  ) : (
    <Admin
      dataProvider={dataProvider}
      dashboard={Dashboard}
      authProvider={authProvider}
      loginPage={LoginPage}
    >
      <Resource
        name="users"
        list={UserList}
        create={CreateUser}
        edit={EditUser}
        icon={UserIcon}
      />

      <Resource
        name="customers"
        list={CustomerList}
        edit={EditCustomer}
        create={CreateCustomer}
        icon={PostIcon}
      />
      <Resource name="jobs" list={JobList} edit={EditJob} create={CreateJob} />
    </Admin>
  );
};

export default App;

//EOF
