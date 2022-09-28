import { BASE_URL, TOKEN_PATH } from "../../constants/api";
import { useForm } from "react-hook-form";
import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import FormError from "../common/FormError";

const url = BASE_URL + TOKEN_PATH;
/* console.log(url); */

const schema = yup.object({
  brukernavn: yup.string().required("Brukernavn må skrives inn"),
  passord: yup.string().required("Passord må skrives inn"),
});

export default function LoginForm() {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    setSubmitting(true);
    setLoginError(null);

    console.log(data);

    try {
      const response = await axios.post(url, data);
      console.log("response", response.data);
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
          <input name="brukernavn" placeholder="Brukernavn" {...register("brukernavn")} />
          {errors.brukernavn && <FormError>{errors.brukernavn.message}</FormError>}
        </div>

        <div>
          <input name="passord" placeholder="Passord" {...register("passord")} type="password" />
          {errors.passord && <FormError>{errors.passord.message}</FormError>}
        </div>

        <input type="submit" />
      </form>
    </>
  );
}
