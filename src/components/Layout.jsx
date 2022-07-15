import { Layout } from "react-admin";
import MyError from "./Error";

const MyLayout = (props) => <Layout {...props} error={MyError} />;

export default MyLayout;
