import * as React from "react";
import { Admin, EditGuesser, Resource, usePermissions } from "react-admin";
import { UserList } from "./components/Users/UserList";
import { EditUser } from "./components/Users/EditUser";
import { CreateUser } from "./components/Users/CreateUser";
import { JobList } from "./components/jobs/JobList";
import { JobEdit } from "./components/jobs/JobEdit";
import { JobCreate } from "./components/jobs/JobCreate";
import { CustomerList } from "./components/Customers/CustomerList";
import { EditCustomer } from "./components/Customers/EditCustomer";
import { CreateCustomer } from "./components/Customers/CreateCustomer";
import PostIcon from "@mui/icons-material/Book";
import UserIcon from "@mui/icons-material/Group";
import Dashboard from "./components/Dashboard";
import { authProvider, httpClient } from "./Auth/authProvider";
import simpleRestProvider from "ra-data-simple-rest";
import LoginPage from "./components/LoginPage";
import { MyLayout } from "./MyLayout";
import { AccountsCreate } from "./components/Accounts/AccountCreate";
import { AccountsList } from "./components/Accounts/AccountsList";
import { AccountEdit } from "./components/Accounts/AccountEdit";
const dataProvider = simpleRestProvider(
  "http://localhost:5000/api",
  httpClient
);

const App = () => {
  const { isLoading, permissions } = usePermissions();

  if (isLoading) return null;

  return isLoading ? (
    <div>Waiting for permissions</div>
  ) : (
    <Admin
      dataProvider={dataProvider}
      dashboard={Dashboard}
      authProvider={authProvider}
      loginPage={LoginPage}
      layout={MyLayout}
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
      {/* <Resource name="jobs" edit={EditGuesser} /> */}
      <Resource name="jobs" list={JobList} edit={JobEdit} create={JobCreate} />
      <Resource
        name="accounts"
        list={AccountsList}
        create={AccountsCreate}
        edit={AccountEdit}
      />
    </Admin>
  );
};

export default App;

//EOF
