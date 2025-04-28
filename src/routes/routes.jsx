import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

// importing Pages
import App from "../App";
import Recipes from "../pages/Recipes/Recipes";
import SignUp from "../pages/SignUp/SignUp";
import SignIn from "../pages/SignIn/SignIn";
import AddRecipe from "../pages/AddRecipe/AddRecipe";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Recipes />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="add-recipe" element={<AddRecipe />} />
    </Route>
  )
);
