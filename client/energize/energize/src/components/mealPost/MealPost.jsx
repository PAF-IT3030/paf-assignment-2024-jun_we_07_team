import React, { useState, useEffect } from "react";
import axios from "axios";
import "./mealPost.scss";

const MealPost = ({ post }) => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    try {
      const response = await axios.get("http://localhost:8080/meal-plans");
      setMeals(response.data);
    } catch (error) {
      console.error("Error fetching meals:", error);
    }
  };

  return (
    <div className="mealPost">
      <div className="container">
        <div className="content">
          {meals.map((meal) => (
            <div key={meal.id} className="meal">
              <h2>{meal.description}</h2>
              <p>Recipe: {meal.recipe}</p>
              <p>Nutritional Information: {meal.nutritionalInformation}</p>
              <p>Meal Type: {meal.mealType}</p>
              <p>Ingredients: {meal.ingredients}</p>
              <p>Instructions: {meal.instructions}</p>
              <p>Created At: {meal.createdAt}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MealPost;
