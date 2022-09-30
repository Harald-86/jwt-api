import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";

export default function DeletePostButton({ id }) {
  const [error, setError] = useState(null);

  const http = useAxios();
  const history = useNavigate();

  const url = `/wp/v2/posts/${id}`;

  async function handleDelete() {
    const confirmDelete = window.confirm("Er du sikker på at du vil slette denne posten? ");
    if (confirmDelete) {
      try {
        await http.delete(url);
        history("/dashboard/posts");
      } catch (error) {
        console.log("error: ", error);
        setError(error);
      }
    }
  }

  return (
    <>
      <input type="button" value="slett" className="delete_post" onClick={handleDelete} />

      {error ? "Error" : " "}
    </>
  );
}

DeletePostButton.propTypes = {
  id: PropTypes.number.isRequired,
};
