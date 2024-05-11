import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WorkoutView.scss'; // Import the CSS file
import { Link } from 'react-router-dom';
function WorkoutView() {
  const [workoutPlan, setWorkoutPlan] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch userId from local storage
        const userId = localStorage.getItem('userId');
        if (!userId) {
          throw new Error('User ID not found in local storage');
        }
        const response = await axios.get(`http://localhost:8056/workoutplans/${userId}`);
        setWorkoutPlan(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again later.');
      }
    }

    fetchData();
  }, []);


  const handleDelete = async () => {
    try {
      // Fetch userId from local storage
      const userId = localStorage.getItem('userId');
      if (!userId) {
        throw new Error('User ID not found in local storage');
      }
      await axios.delete(`api/workoutplans/${workoutPlan.id}`);
      // Redirect to another page or show a success message
    } catch (error) {
      console.error('Error deleting workout plan:', error);
      // Handle error (e.g., show an error message)
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!workoutPlan) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h2>Workout Plan</h2>
      <p>Title: {workoutPlan.title}</p>
      <p>Description: {workoutPlan.description}</p>
      <p>Type: {workoutPlan.type}</p>
      <p>Difficulty Level: {workoutPlan.difficultyLevel}</p>
      <p>Duration: {workoutPlan.duration} minutes</p>
      <h3>Exercises:</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Sets</th>
            <th>Repetitions</th>
            <th>Equipment</th>
          </tr>
        </thead>
        <tbody>
          {workoutPlan.exercises.map((exercise, index) => (
            <tr key={index}>
              <td>{exercise.name}</td>
              <td>{exercise.sets}</td>
              <td>{exercise.repetitions}</td>
              <td>{exercise.equipment}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="button-container">
       <Link to="/updateworkoutPlan"><button> Update</button></Link>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}

export default WorkoutView;
