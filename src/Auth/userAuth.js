import { useState, useEffect } from "react";
import { useGetIdentity } from "react-admin";

// import { Loading, Error } from "./MyComponents";

export const UserName = ({ userId }) => {
  const { identity, isLoading, error } = useGetIdentity();

  if (isLoading) return <div>Loading</div>;
  if (error) return <div>error;</div>;
  if (!identity) return <div>NOT found</div>;
  return <>{identity.fullName}</>;
};
