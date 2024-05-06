import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker'; // Import DatePicker
import 'react-datepicker/dist/react-datepicker.css'; // Import CSS for DatePicker
import './workout.scss'; // Import the CSS file

function Workout() {
  const [workoutPlan, setWorkoutPlan] = useState({
    userId: "202426001", // Change this to a valid Long value
    title: "",
    description: "",
    type: "",
    difficultyLevel: "",
    duration: 0,
    creationDate: new Date(), // Set the creation date
    lastUpdated: new Date(), // Set the last updated date
    exercises: [],
  });

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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitting workout plan:', workoutPlan);

    // Log the data being sent
    axios.post('http://localhost:8056/workoutplans', workoutPlan)
      .then((response) => {
        console.log('Workout plan created successfully:', response.data);
        // Handle success (e.g., show a success message)
      })
      .catch((error) => {
        console.error('Error creating workout plan:', error);
        if (error.response && error.response.data) {
          console.log('Response data:', error.response.data);
          // Log the error response data if available
        }
        // Handle error (e.g., show an error message)
      });
  };

  return (
    <div className="container">
      <h2>Create Workout Plan</h2>   
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

export default Workout;