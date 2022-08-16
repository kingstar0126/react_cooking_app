import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { uploadNewPhoto } from "../../features/recipes/recipeSlice";

const UploadFile = (props) => {
  const [uploadedPhotos, setUploadPhotos] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { recipe, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.recipe
  );

  const onFileUpload = (e) => {
    setUploadPhotos(e.target.files[0]);

    props.onUploadClick(e.target.files[0].name);
  };

  const onImageUpload = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", uploadedPhotos);
    console.log(formData.values);
    dispatch(uploadNewPhoto(formData));
    if (isSuccess) {
      navigate("/");
    }
    if (isError) {
      console.log(message);
    }
  };

  return (
    <div>
      <form onSubmit={onImageUpload}>
        <label htmlFor="image">Качи снимки</label>
        <input
          type="file"
          accept=".png, .jpg, .jpeg"
          name="photo"
          id="photo"
          onChange={onFileUpload}
          required
        />
        <button>ДОБАВИ</button>
      </form>
    </div>
  );
};

export default UploadFile;
