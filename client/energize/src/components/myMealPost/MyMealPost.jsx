import React, { useState, useEffect } from "react";
import axios from "axios";
import "./myMealPost.scss";

const MyMealPost = ({ post }) => {
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null); 
  const [mealTypes, setMealTypes] = useState([]); 
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      fetchMeals();
      fetchMealTypes(); 
    }
  }, [userId]);

  const fetchMeals = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/users/${userId}/meal-plans`);
      setMeals(response.data);
    } catch (error) {
      console.error("Error fetching meals:", error);
    }
  };

  const fetchMealTypes = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/meal-types`);
      setMealTypes(response.data);
    } catch (error) {
      console.error("Error fetching meal types:", error);
    }
  };

  const updateMeal = (mealId) => {
    const mealToUpdate = meals.find(meal => meal.id === mealId);
    setSelectedMeal(mealToUpdate);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!selectedMeal) return;

    try {
      await axios.put(`http://localhost:8080/users/${userId}/meal-plans/${selectedMeal.id}`, selectedMeal);
 
      fetchMeals();
      setSelectedMeal(null);
    } catch (error) {
      console.error("Error updating meal:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSelectedMeal(prevMeal => ({
      ...prevMeal,
      [name]: value
    }));
  };

  const deleteMeal = async (mealId) => {
    if (window.confirm('Are you sure you want to delete this meal?')) {
      try {
        await axios.delete(`http://localhost:8080/users/${userId}/meal-plans/${mealId}`);
        setMeals(prevMeals => prevMeals.filter(meal => meal.id !== mealId));
      } catch (error) {
        console.error("Error deleting meal:", error);
      }
    }
  };

  return (
    <div className="mealPost">
      <div className="container">
        <div className="content">
          {/* Update Form */}
          {selectedMeal && (
            <form onSubmit={handleFormSubmit}>
              <div>
                <label>Description:</label>
                <input type="text" name="description" value={selectedMeal.description} onChange={handleInputChange} />
              </div>
              <div>
                <label>Recipe:</label>
                <input type="text" name="recipe" value={selectedMeal.recipe} onChange={handleInputChange} />
              </div>
              <div>
                <label>Nutritional Information:</label>
                <input type="text" name="nutritionalInformation" value={selectedMeal.nutritionalInformation} onChange={handleInputChange} />
              </div>
              <div>
                <label>Meal Type:</label>
                <select name="mealType" value={selectedMeal.mealType} onChange={handleInputChange}>
                  <option value="">Select Meal Type</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="keto">Keto</option>
                  {mealTypes.map((type) => (
                    <option key={type.id} value={type.name}>{type.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label>Ingredients:</label>
                <input type="text" name="ingredients" value={selectedMeal.ingredients} onChange={handleInputChange} />
              </div>
              <div>
                <label>Instructions:</label>
                <input type="text" name="instructions" value={selectedMeal.instructions} onChange={handleInputChange} />
              </div>
          
              <button type="submit">Update Meal</button>
            </form>
          )}

          {/* Meal Plan List */}
          {meals.map((meal) => (
            <div key={meal.id} className="meal">
              <h2>{meal.description}</h2>
              <p>Recipe: {meal.recipe}</p>
              <p>Nutritional Information: {meal.nutritionalInformation}</p>
              <p>Meal Type: {meal.mealType}</p>
              <p>Ingredients: {meal.ingredients}</p>
              <p>Instructions: {meal.instructions}</p>
              <p>Created At: {meal.createdAt}</p>
            
              <div className="actions">
                <button onClick={() => updateMeal(meal.id)}>Update</button>
                <button onClick={() => deleteMeal(meal.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyMealPost;