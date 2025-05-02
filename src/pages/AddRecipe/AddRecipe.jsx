import { useRef, useState } from "react";
import styles from "./AddRecipe.module.css";
import { addDoc, collection } from "firebase/firestore";
import { database } from "../../fireBaseConfig";

const AddRecipe = () => {
  const [recipeDetails, setRecipeDetails] = useState({
    title: "",
    ingredients: [""],
    instructions: "",
    image: null,
    previewUrl: null,
  });
  const fileInputRef = useRef(null);
  //   retriving input value
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (e.target.type === "file") return;
    setRecipeDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };
  //   add input fields for ingredients
  const addIngredient = () => {
    if (
      recipeDetails.ingredients[recipeDetails.ingredients.length - 1] !== ""
    ) {
      setRecipeDetails((prevDetails) => ({
        ...prevDetails,
        ingredients: [...recipeDetails.ingredients, ""],
      }));
    } else {
      alert("please fill out the current ingredient input first");
    }
  };
  //   retrive the ingredients from the form
  const handleIngredientsChange = (index, value) => {
    const updatedIngredients = [...recipeDetails.ingredients];
    updatedIngredients[index] = value;
    setRecipeDetails((prevDetails) => ({
      ...prevDetails,
      ingredients: updatedIngredients,
    }));
  };
  //    create fuction for retieving image from the form
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const previewUrl = URL.createObjectURL(file);
      setRecipeDetails((prevDetails) => ({
        ...prevDetails,
        image: file,
        previewUrl: previewUrl,
      }));
      console.log("file", file);
    } else {
      setRecipeDetails((prevDetails) => ({
        ...prevDetails,
        image: null,
        previewUrl: null,
      }));
      console.log("please upload a valid image");
    }
  };
  //   Removing the selected Image
  const handleRemoveImage = () => {
    setRecipeDetails((prevDetails) => ({
      ...prevDetails,
      image: null,
      previewUrl: null,
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  //   uploading the image the to cloudinary istorage
  const uploadImage = async () => {
    const formData = new FormData();

    formData.append("file", recipeDetails.image);
    formData.append("upload_preset", "upload_preset");
    formData.append("cloud_name", "dgfy4osmh");
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dgfy4osmh/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      console.log("image url", data.secure_url);
      console.log("Public ID", data.public_id);

      setRecipeDetails((prevDetails) => ({
        ...prevDetails,
        previewUrl: data.secure_url,
      }));

      alert("image was uploaded");
      return data.secure_url;
    } catch (error) {
      alert("failed to upload the image");
      console.log(error.message);
      return null;
    }
  };
  //    save data to firestore
  const saveDataToFirestore = async (recipe) => {
    try {
      const docRef = await addDoc(collection(database, "recipes"), recipe);
      console.log("document has been added with the id:", docRef.id);
    } catch (error) {
      console.log(error.message, "failed to store the document");
    }
  };

  //   handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const imageUrl = await uploadImage();

      const recipeData = {
        ...recipeDetails,
        image: imageUrl,
      };
      console.log("recipe data:", recipeData);
      await saveDataToFirestore(recipeData);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className={styles.addRecipeContainer}>
      <form className={styles.addRecipeForm} onSubmit={handleSubmit}>
        {/* title */}
        <label htmlFor="title" className={styles.lable}>
          Recipe Name
        </label>
        <input
          type="text"
          name="title"
          id="title"
          className={styles.input}
          placeholder="enter recipe name"
          required
          onChange={handleChange}
        />
        {/* ingridiens */}
        <label htmlFor="ingredients" className={styles.lable}>
          Ingrediens
        </label>
        <div className={styles.ingredientsSection} id="ingredents-section">
          {recipeDetails.ingredients.map((ingredients, index) => (
            <div className={styles.ingredientRow} key={index}>
              <input
                type="text"
                className={styles.input}
                placeholder={`Ingredient ${index + 1}`}
                name={`Ingredient ${index + 1}`}
                onChange={(e) => handleIngredientsChange(index, e.target.value)}
              />
            </div>
          ))}
          <button
            className={styles.addIngredientButton}
            onClick={addIngredient}
          >
            +
          </button>
        </div>
        {/* instructions */}
        <label htmlFor="instructions" className={styles.lable}>
          instructions
        </label>
        <textarea
          name="instructions"
          id="instructions"
          rows={5}
          className={styles.textarea}
          placeholder="Enter instructions step by step"
          required
          onChange={handleChange}
        ></textarea>
        {/* imageUpload */}
        <label htmlFor="image" className={styles.lable}>
          Upload an image
        </label>
        <input
          type="file"
          id="image"
          name="image"
          className={styles.fileInput}
          accept=".jpg, .png, .jpeg"
          onChange={handleImageChange}
          ref={fileInputRef}
        />
        {recipeDetails.previewUrl && (
          <div className={styles.imagePreviewContainer}>
            <img
              src={recipeDetails.previewUrl}
              alt="recipe image preview"
              className={styles.imagePreview}
            />
            <button
              className={styles.removeImageButton}
              onClick={handleRemoveImage}
            >
              Revome Image
            </button>
          </div>
        )}
        {/* submitbutton */}
        <button className={styles.submitButton}>Submiot Recipe</button>
      </form>
    </div>
  );
};

export default AddRecipe;
