import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './UserWorkoutPlains.scss';

function UserWorkoutPlains() {
  const [workoutPlan, setWorkoutPlan] = useState({
    userId: "", // Initialize userId as empty string
    title: "",
    description: "",
    type: "",
    difficultyLevel: "",
    duration: 0,
    creationDate: new Date(),
    lastUpdated: new Date(),
    exercises: [],
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch userId from local storage when component mounts
    const userId = localStorage.getItem('userId');
    if (userId) {
      setWorkoutPlan(prevState => ({ ...prevState, userId: userId }));
    }

    async function fetchData() {
      try {
        const response = await axios.get(`api/workoutplans/${userId}`);
        setWorkoutPlan(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again later.');
      }
    }

    fetchData();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setWorkoutPlan({ ...workoutPlan, [name]: value });
  };

  const handleExerciseChange = (index, event) => {
    const newExercises = [...workoutPlan.exercises];
    const { name, value } = event.target;
    newExercises[index] = {
      ...newExercises[index],
      [name]: value
    };
    setWorkoutPlan({ ...workoutPlan, exercises: newExercises });
  };

  const addExercise = () => {
    setWorkoutPlan({
      ...workoutPlan,
      exercises: [
        ...workoutPlan.exercises,
        { name: "", sets: 0, repetitions: 0, equipment: "" },
      ],
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(`api/workoutplans/${workoutPlan.userId}`, workoutPlan);
      console.log('Workout plan updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating workout plan:', error);
      if (error.response && error.response.data) {
        console.log('Response data:', error.response.data);
      }
      setError('Error updating workout plan. Please try again later.');
    }
  };

  return (
    <div className="container">
      <h2>Create/Update Workout Plan</h2>
      {error && <div>{error}</div>}
      <form className="form-container" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Workout Plan Title"
          value={workoutPlan.title}
          onChange={handleInputChange}
        />
        <textarea
          className="description-input"
          name="description"
          placeholder="Workout Plan Description"
          value={workoutPlan.description}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="type"
          placeholder="Type"
          value={workoutPlan.type}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="difficultyLevel"
          placeholder="Difficulty Level"
          value={workoutPlan.difficultyLevel}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="duration"
          placeholder="Duration (minutes)"
          value={workoutPlan.duration}
          onChange={handleInputChange}
        />
        {workoutPlan.exercises.map((exercise, index) => (
          <div className="exercise-container" key={index}>
            <div className="exercise-input">
              <input
                type="text"
                name="name"
                placeholder="Exercise Name"
                value={exercise.name}
                onChange={(e) => handleExerciseChange(index, e)}
              />
              <input
                type="number"
                name="sets"
                placeholder="Sets"
                value={exercise.sets}
                onChange={(e) => handleExerciseChange(index, e)}
              />
              <input
                type="number"
                name="repetitions"
                placeholder="Repetitions"
                value={exercise.repetitions}
                onChange={(e) => handleExerciseChange(index, e)}
              />
              <input
                type="text"
                name="equipment"
                placeholder="Equipment"
                value={exercise.equipment}
                onChange={(e) => handleExerciseChange(index, e)}
              />
            </div>
          </div>
        ))}
        <button type="button" onClick={addExercise}>
          Add Exercise
        </button>
        <button type="submit">Save Workout Plan</button>
      </form>
    </div>
  );
}

export default UserWorkoutPlains;
