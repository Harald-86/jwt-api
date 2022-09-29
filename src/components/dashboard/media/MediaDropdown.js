import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import useAxios from "../../hooks/useAxios";

export default function MediaDropdown({ register }) {
  const [media, setMedia] = useState([]);
  const http = useAxios();

  useEffect(function () {
    async function getMedia() {
      try {
        const response = await http.get("wp/v2/media");
        console.log(response.data);
        setMedia(response.data);
      } catch (error) {
        console.log("this is the fubar", error);
      }
    }

    getMedia();
  }, []);

  return (
    <select name="featured_media" ref={register}>
      <option value="">Select Media</option>
      {media.map((media) => {
        return (
          <option key={media.id} value={media.id}>
            {media.title.rendered}
          </option>
        );
      })}
    </select>
  );
}

MediaDropdown.propTypes = {
  register: PropTypes.func,
};
MediaDropdown.defaultProps = {
  register: () => {},
};
