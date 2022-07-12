import * as React from "react";
import {
  Admin,
  Resource,
  CustomRoutes,
  Authenticated,
  usePermissions,
} from "react-admin";
import { Route } from "react-router-dom";
import { UserList, EditUser, CreateUser } from "./components/Users";
import {
  CustomerList,
  EditCustomer,
  CreateCustomer,
} from "./components/CustomerList";
import { JobList, EditJob, CreateJob } from "./components/JobList";
import PostIcon from "@mui/icons-material/Book";
import UserIcon from "@mui/icons-material/Group";
import Dashboard from "./components/Dashboard";
import { authProvider, httpClient } from "./Auth/authProvider";
import simpleRestProvider from "ra-data-simple-rest";
import LoginPage from "./components/LoginPage";
import SignUp from "./components/SignUp";
const dataProvider = simpleRestProvider(
  "http://localhost:5000/api",
  httpClient
);
// import dataProvider from "./DataProvider/dataProvider";

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

// const App = () => (
//   <Admin authProvider={authProvider}>
//       <CustomRoutes>
//           <Route path="/foo" element={<Authenticated><Foo /></Authenticated>} />
//           <Route path="/bar" element={<Authenticated><Bar /></Authenticated>} />
//           <Route path="/anoonymous" element={<Baz />} />
//       </CustomRoutes>
//   </Admin>
// );
{
  /* {permissions == "admin" && (
        <>
          <Resource
            name="users"
            list={UserList}
            create={CreateUser}
            edit={EditUser}
            icon={UserIcon}
          />
        </>
      )} */
}
