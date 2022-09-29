import { Link } from "react-router-dom";
import Heading from "../../../layout/Heading";
import DashboardPage from "../DashboardPage";

export default function PostPage() {
  return (
    <DashboardPage>
      <Heading size="3" title="Posts" />
      <p>
        <Link to="/dashboard/posts/add">Add post</Link>
      </p>
      <p>List posts here</p>
    </DashboardPage>
  );
}
