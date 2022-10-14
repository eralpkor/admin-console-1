import { useParams } from "react-router-dom";
import { useGetOne, useRedirect, Title } from "react-admin";
import { Card, Stack, Typography } from "@mui/material";

/**
 * Fetch a book from the API and display it
 */
export const JobShow = () => {
  const { id } = useParams(); // this component is rendered in the /books/:id path
  const redirect = useRedirect();
  const { data, isLoading } = useGetOne(
    "jobs",
    { id },
    // redirect to the list if the book is not found
    { onError: () => redirect("/jobs") }
  );
  if (isLoading) {
    return <>Loading...</>;
  }
  console.log("whats data ", data);
  return (
    <div>
      <Title title="Job Show" />
      <Card>
        <Stack spacing={1}>
          <div>
            <Typography variant="caption" display="block">
              Title
            </Typography>
            <Typography variant="body2">{data.job_title}</Typography>
          </div>
          <div>
            <Typography variant="caption" display="block">
              {" "}
              Date
            </Typography>
            <Typography variant="body2">
              {new Date(data.created_at).toDateString()}
            </Typography>
          </div>
        </Stack>
      </Card>
    </div>
  );
};
