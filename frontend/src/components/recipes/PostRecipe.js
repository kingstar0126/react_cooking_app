import classes from "./PostRecipe.module.css";
import { Fragment, useState, useEffect } from "react";
import SingleIngredient from "./SingleIngredient";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../layout/Spinner";
import UploadFile from "../layout/UploadFile";
import { useSelector, useDispatch } from "react-redux";
import {
  createRecipe,
  reset,
  getSingleRecipe,
  updateRes,
} from "../../features/recipes/recipeSlice";
import { FaPlusCircle } from "react-icons/fa";

const PostRecipe = () => {
  const params = useParams();
  const { recipeId } = params;
  const [products, setProducts] = useState([]);
  const [item, setItem] = useState("");
  const [volume, setVolume] = useState("");
  const [type, setType] = useState("грама");
  const [fileNames, setFilenames] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { recipe, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.recipe
  );

  // useEffect(() => {
  //   if (recipeId !== undefined) {
  //     dispatch(getSingleRecipe(recipeId));
  //   }
  // }, [dispatch, recipeId]);

  const [formData, setFormData] = useState({
    title: "",
    products: [],
    preparation: "",
    suitableFor: "",
    photos: [],
  });

  const { title, preparation, suitableFor } = formData;

  const onItemAdd = (e) => {
    setItem(e.target.value);
  };

  const onVolumeAdd = (e) => {
    setVolume(Number(e.target.value));
  };

  const onSelectType = (e) => {
    setType(e.target.value);
  };

  const onMutate = (e) => {
    if (e.target.name === "suitableFor") {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: Number(e.target.value),
      }));
    }

    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onProductsUpdate = (updatedProducts) => {
    setProducts((prevState) => [...prevState, updatedProducts]);
  };

  const onProductAdd = (e) => {
    e.preventDefault();

    const newProduct = {
      item,
      volume,
      type,
    };

    setProducts((prevState) => [...prevState, newProduct]);
    setFormData((prevState) => ({
      ...prevState,
      products: products,
    }));
    setItem("");
    setType("грама");
    setVolume("");
  };
  
  const onFilenameSet = (picName) => {
    console.log(picName)
    setFilenames((prevState) => [...prevState, picName])
    console.log(fileNames)
    setFormData((prevState) => ({
      ...prevState,
      photos: fileNames
    }));
  }
  // const onFileUpload = (e) => {
  //   setUploadPhotos((prevState) => [...prevState, e.target.files[0]]);
  //   setFilename(e.target.files[0].name);
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     photos: uploadedPhotos,
  //   }));
  // };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    // if (isSuccess) {
    //   dispatch(reset());
    //   navigate("/recepti");
    // }
    dispatch(reset());
  }, [message, isError, isSuccess, navigate, dispatch]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const recipe = {
      title,
      products,
      preparation,
      suitableFor,
      photos: fileNames,
    };
    
    dispatch(createRecipe(recipe));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Fragment>
      <main className={classes.main}>
        <section className={classes.background}>
          <section className={classes.content}>
            <div className={classes.title}>
              <h1>Здравей, {user.name}</h1>
              <h2>Добави своята страхотна рецепта!</h2>
              <div className={classes.line}></div>
            </div>
            <div className={classes.form}>
              <form className={classes.formInside} onSubmit={onSubmit}>
                <input
                  className={`${classes.inpitOpacity} ${classes.inputField}`}
                  type="text"
                  placeholder="Мусака с тиквички..."
                  name="title"
                  id="title"
                  value={title}
                  onChange={onMutate}
                  required
                />
                <p className={classes.para}>Съставки:</p>
                {products.length > 0
                  ? products.map((product) => (
                      <SingleIngredient
                        product={product}
                        key={product.item}
                        products={products}
                        onProductsUpdate={onProductsUpdate}
                      />
                    ))
                  : null}
                <article className={classes.ingredient}>
                  <input
                    className={`${classes.inpitOpacity} ${classes.inputField}`}
                    type="text"
                    placeholder="Морков, домат, лук, червен пипер..."
                    name="product"
                    id="product"
                    value={item}
                    onChange={onItemAdd}
                    required
                  />
                  <input
                    className={`${classes.inpitOpacity} ${classes.inputField}`}
                    type="text"
                    placeholder="количество..."
                    name="quantity"
                    id="quantity"
                    value={volume}
                    onChange={onVolumeAdd}
                  />
                  <select
                    onChange={onSelectType}
                    value={type}
                    name="ingredient-type"
                    id="kilo"
                  >
                    <option value="грама">грама</option>
                    <option value="мл.">мл.</option>
                    <option value="брой(я).">брой(я)</option>
                    <option value="на вкус">На вкус</option>
                  </select>
                  <button
                    className={classes.addIngredient}
                    onClick={onProductAdd}
                  >
                    <FaPlusCircle />
                  </button>
                </article>

                <p className={classes.para}>
                  Добави стъпките за приготвянето на твоя шедьовър
                </p>
                <textarea
                  className={classes.inpitOpacity}
                  name="preparation"
                  id="preparation"
                  cols="10"
                  rows="4"
                  value={preparation}
                  onChange={onMutate}
                  required
                ></textarea>

                {/* <p className={classes.para}>Добави категории</p>
                <article className={classes.categories}>
                  <ul className={classes.checkboxItems}>
                    <li className={classes.checkbox}>
                      <input type="checkbox" name="item" required />
                    </li>
                  </ul>
                </article> */}

                <div className={classes.suitable}>
                  <p className={classes.para}>
                    Подходяща за
                    <span className={`${classes.para} ${classes.spanText}`}>
                      <select
                        name="suitableFor"
                        id="suitable"
                        onChange={onMutate}
                        value={suitableFor}
                        required
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="4">4</option>
                        <option value="6">6</option>
                      </select>
                    </span>
                    човека.
                  </p>
                </div>
                <UploadFile onUploadClick={onFilenameSet}/>
                {/* <div>
                  <label className={classes.para} htmlFor="image">
                    Качи снимки
                  </label>
                  <input
                    // className={classes.fileUp}
                    // className={`${classes.inpitOpacity} ${classes.inputField}`}
                    type="file"
                    name="image"
                    id="image"
                    onChange={onFileUpload}
                    required
                  />
                </div> */}

                <button className={classes.buttonMain}>ДОБАВИ РЕЦЕПТА</button>
              </form>
            </div>
          </section>
        </section>
      </main>
    </Fragment>
  );
};

export default PostRecipe;
