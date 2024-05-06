import { useState } from "react";
import axios from "axios";
import "./mealPlan.scss";

const MealPlanForm = () => {
  const [formData, setFormData] = useState({
    description: "",
    recipe: "",
    nutritionalInformation: "",
    mealType: "",
    ingredients: "",
    instructions: ""
  });

  // Function to get user ID from local storage
  const getUserIdFromLocalStorage = () => {
    const userId = localStorage.getItem("userId");
    return userId;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = getUserIdFromLocalStorage(); // Get user ID from local storage
    try {
      const response = await axios.post(`http://localhost:8080/users/${userId}/meal-plans`, {
        ...formData,
        userId: userId // Include user ID in the request body
      });
      console.log("Meal plan created successfully:", response.data);
      alert("Meal plan created successfully");
    } catch (error) {
      console.error("Error creating meal plan:", error.response.data);
      alert("An error occurred while creating the meal plan");
    }
  };

  return (
    <div className="meal-plan-form">
      <h2>Create Meal Plan</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="input-field"
        />
        <input
          type="text"
          placeholder="Recipe"
          name="recipe"
          value={formData.recipe}
          onChange={handleChange}
          className="input-field"
        />
        <input
          type="text"
          placeholder="Nutritional Information"
          name="nutritionalInformation"
          value={formData.nutritionalInformation}
          onChange={handleChange}
          className="input-field"
        />
        <select
          name="mealType"
          value={formData.mealType}
          onChange={handleChange}
          className="input-field select-field"
        >
          <option value="">Select Meal Type</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="vegan">Vegan</option>
          <option value="keto">Keto</option>
        </select>
        <textarea
          placeholder="Ingredients"
          name="ingredients"
          value={formData.ingredients}
          onChange={handleChange}
          className="input-field textarea-field"
        ></textarea>
        <textarea
          placeholder="Instructions"
          name="instructions"
          value={formData.instructions}
          onChange={handleChange}
          className="input-field textarea-field"
        ></textarea>
        <button type="submit" className="submit-btn">Create</button>
      </form>
    </div>
  );
};

export default MealPlanForm;