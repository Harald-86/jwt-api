import Heading from "../../layout/Heading";
import DashboardMenu from "./DashboardMenu";
import PostList from "./posts/PostList";

export default function DashboardPage({ children }) {
  return (
    <>
      <Heading title="Dashboard" />
      <DashboardMenu />
      {children ? children : <p>Select a section</p>}
      <PostList />
    </>
  );
}
