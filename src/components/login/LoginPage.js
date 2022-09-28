import Heading from "../../layout/Heading";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <>
      <Heading title="Login" />
      <div>
        <p>This is also a paragraph within a div. But displayed on the login page</p>
      </div>
      <LoginForm />
    </>
  );
}
