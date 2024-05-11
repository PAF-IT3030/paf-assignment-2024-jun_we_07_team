import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './workout.scss';

function Workout() {
  const [workoutPlan, setWorkoutPlan] = useState({
    userId: "", // Initialize userId as empty string
    title: "",
    description: "",
    type: "",
    difficultyLevel: "",
    duration: "",
    creationDate: new Date(),
    lastUpdated: new Date(),
    exercises: [],
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Fetch userId from local storage when component mounts
    const userId = localStorage.getItem('userId');
    if (userId) {
      setWorkoutPlan(prevState => ({ ...prevState, userId: userId }));
    }
  }, []); // Run this effect only once when component mounts

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!workoutPlan.title.trim()) {
      newErrors.title = 'Title is required';
      isValid = false;
    }

    if (!workoutPlan.description.trim()) {
      newErrors.description = 'Description is required';
      isValid = false;
    }

    if (!workoutPlan.type.trim()) {
      newErrors.type = 'Type is required';
      isValid = false;
    }

    if (!workoutPlan.difficultyLevel.trim()) {
      newErrors.difficultyLevel = 'Difficulty Level is required';
      isValid = false;
    }

    if (!workoutPlan.duration) {
      newErrors.duration = 'Duration is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

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
    
    if (validateForm()) {
      console.log('Submitting workout plan:', workoutPlan);

      axios.post('api/workoutplans', workoutPlan)
        .then((response) => {
          console.log('Workout plan created successfully:', response.data);
          alert("Workout plan created successfully");
        })
        .catch((error) => {
          console.error('Error creating workout plan:', error);
          if (error.response && error.response.data) {
            console.log('Response data:', error.response.data);
          }
        });
    }
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
        {errors.title && <div className="error">{errors.title}</div>}
        <textarea
          className="description-input"
          name="description"
          placeholder="Workout Plan Description"
          value={workoutPlan.description}
          onChange={handleInputChange}
        />
        {errors.description && <div className="error">{errors.description}</div>}
        <input
          type="text"
          name="type"
          placeholder="Type"
          value={workoutPlan.type}
          onChange={handleInputChange}
        />
        {errors.type && <div className="error">{errors.type}</div>}
        <input
          type="text"
          name="difficultyLevel"
          placeholder="Difficulty Level"
          value={workoutPlan.difficultyLevel}
          onChange={handleInputChange}
        />
        {errors.difficultyLevel && <div className="error">{errors.difficultyLevel}</div>}
        <input
          type="number"
          name="duration"
          placeholder="Duration (minutes)"
          value={workoutPlan.duration}
          onChange={handleInputChange}
        />
        {errors.duration && <div className="error">{errors.duration}</div>}
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
