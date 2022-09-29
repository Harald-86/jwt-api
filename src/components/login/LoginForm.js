import { BASE_URL, TOKEN_PATH } from "../../constants/api";
import { useForm } from "react-hook-form";
import { useState, useContext } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import FormError from "../common/FormError";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const url = BASE_URL + TOKEN_PATH;
/* console.log(url); */

const schema = yup.object({
  username: yup.string().required("Brukernavn må skrives inn"),
  password: yup.string().required("Passord må skrives inn"),
});

export default function LoginForm() {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const history = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [auth, setAuth] = useContext(AuthContext);

  async function onSubmit(data) {
    setSubmitting(true);
    setLoginError(null);

    console.log(data);

    try {
      const response = await axios.post(url, data);
      console.log("response", response.data);
      setAuth(response.data);
      history("/dashboard");
    } catch (error) {
      console.log("error", error);
      setLoginError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {loginError && <FormError>{loginError}</FormError>}

        <div>
          <input name="username" placeholder="Brukernavn" {...register("username")} />
          {errors.brukernavn && <FormError>{errors.brukernavn.message}</FormError>}
        </div>

        <div>
          <input name="password" placeholder="Passord" {...register("password")} type="password" />
          {errors.passord && <FormError>{errors.passord.message}</FormError>}
        </div>

        <input type="submit" />
      </form>
    </>
  );
}
