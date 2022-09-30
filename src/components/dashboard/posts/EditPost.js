import DashboardPage from "../DashboardPage";
import Heading from "../../../layout/Heading";
import ValidationError from "../../common/FormError";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useAxios from "../../hooks/useAxios";
import DeletePostButton from "./DeletePostButton";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
});

export default function EditPost() {
  const [post, setPost] = useState(null);
  const [updated, setUpdated] = useState(false);
  const [fetchingPost, setFetchingPost] = useState(true);
  const [updatingPost, setUpdatingPost] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [updateError, setUpdateError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const http = useAxios();

  let { id } = useParams();

  const url = `wp/v2/posts/${id}`;

  useEffect(function () {
    async function getPost() {
      try {
        const response = await http.get(url);
        console.log("response", response.data);
        setPost(response.data);
      } catch (error) {
        console.log(error);
        setFetchError(error.toString());
      } finally {
        setFetchingPost(false);
      }
    }

    getPost();
  }, []);

  async function onSubmit(data) {
    setUpdatingPost(true);
    setUpdateError(null);
    setUpdated(false);

    console.log(data);

    try {
      const response = await http.put(url, data);
      console.log("response", response.data);
      setUpdated(true);
    } catch (error) {
      console.log("error: ", error);
      setUpdateError(error.toString());
    } finally {
      setUpdatingPost(false);
    }
  }

  if (fetchingPost) return <div>Loading....</div>;
  if (fetchError) return <div>Error loading post..</div>;

  return (
    <DashboardPage>
      <Heading title="Edit Post" />

      <form onSubmit={handleSubmit(onSubmit)}>
        {updated && <div className="success">The post was updated</div>}
        {updateError && <ValidationError>{updateError}</ValidationError>}

        <fieldset disabled={updatingPost}>
          <div>
            <input name="title" defaultValue={post.title.rendered} placeholder="Title" {...register("title")} />
            {errors.title && <ValidationError>{errors.title.message}</ValidationError>}
          </div>
          <div>
            <input name="content" defaultValue={post.content.rendered} placeholder="content" {...register("content")} />
          </div>
          <input type="submit" value={updated ? "Oppdatert" : "Oppdater"} />
        </fieldset>
        <DeletePostButton />
      </form>
    </DashboardPage>
  );
}
