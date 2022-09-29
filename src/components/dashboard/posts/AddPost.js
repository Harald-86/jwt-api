import Heading from "../../../layout/Heading";
import DashboardPage from "../DashboardPage";
import MediaDropdown from "../media/MediaDropdown";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useAxios from "../../hooks/useAxios";
import ValidationError from "../../common/FormError";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
});

export default function AddPost() {
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);

  const history = useNavigate();
  const http = useAxios();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    setSubmitting(true);
    setServerError(null);

    data.status = "publish";

    if (data.featured_media === "") {
      data.featured_media = null;
    }

    console.log(data);

    try {
      const response = await http.post("/wp/v2/posts", data);
      console.log("response", response.data);
      history("/dashboard/posts");
    } catch (error) {
      console.log(error);
      setServerError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <DashboardPage>
      <Heading title="Add post" />
      <form onSubmit={handleSubmit(onSubmit)}>
        {serverError && <ValidationError>{serverError}</ValidationError>}
        <fieldset disabled={submitting}>
          <div>
            <input name="title" placeholder="Tittel" {...register("title")} />
            {errors.title && <ValidationError>{errors.title.message}</ValidationError>}
          </div>
          <div>
            <textarea name="content" placeholder="Innhold" {...register("content")} />
          </div>
          <div>
            <MediaDropdown register={register} />
          </div>
          <input type="submit" value={submitting ? "Submitting..." : "Submit"} />
        </fieldset>
      </form>
    </DashboardPage>
  );
}
