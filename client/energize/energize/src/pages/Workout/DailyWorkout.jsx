import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import './DailyWorkout.scss'; // Import the CSS file

function DailyWorkout() {
    const [workoutPlan, setWorkoutPlan] = useState(null);
    const [error, setError] = useState(null);
    const [updatedExercises, setUpdatedExercises] = useState([]);
    const [weight, setWeight] = useState('');
    const [date, setDate] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                // Fetch userId from local storage
                const userId = localStorage.getItem('userId');
                if (!userId) {
                    throw new Error('User ID not found in local storage');
                }
                const response = await axios.get(`api/workoutplans/${userId}`);
                setWorkoutPlan(response.data);
                setDate(getTodayDate());
                setUpdatedExercises(response.data.exercises);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Error fetching data. Please try again later.');
            }
        }

        fetchData();
    }, []);

    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = `${today.getMonth() + 1}`.padStart(2, '0');
        const day = `${today.getDate()}`.padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleUpdateExercise = async () => {
        try {
            if (!updatedExercises.length || !weight || !date) return;
            // Fetch userId from local storage
            const userId = localStorage.getItem('userId');
            if (!userId) {
                throw new Error('User ID not found in local storage');
            }
            const response = await axios.post('api/dailyworkoutplans', {
                userId: userId,
                title: workoutPlan.title,
                description: workoutPlan.description,
                type: workoutPlan.type,
                difficultyLevel: workoutPlan.difficultyLevel,
                duration: workoutPlan.duration,
                todayDate: date,
                weight: parseFloat(weight),
                dailyexercises: updatedExercises,
            });
            console.log('Exercise saved successfully:', response.data);
            setWeight('');
            setDate(getTodayDate());
        } catch (error) {
            console.error('Error saving exercise:', error);
            if (error.response && error.response.data) {
                console.log('Response data:', error.response.data);
            }
        }
    };

    const handleExerciseChange = (index, field, value) => {
        const newExercises = [...updatedExercises];
        newExercises[index] = { ...newExercises[index], [field]: value };
        setUpdatedExercises(newExercises);
    };

    if (error) {
        return <div>{error}</div>;
    }

    if (!workoutPlan) {
        return <div>Loading...</div>;
    }

    return (
      <div className="container">
        <h1>Daily Workout Plan</h1>
        <h2 className="title">{workoutPlan.title}</h2>
        <p className="description">{workoutPlan.description}</p>
        <p className="type">Type: {workoutPlan.type}</p>
        <p className="difficulty">Difficulty Level: {workoutPlan.difficultyLevel}</p>
        <p className="duration">Duration: {workoutPlan.duration} minutes</p>
        <p className="weight">
          Weight:
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />{' '}
          kg
        </p>
        <p className="date">
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </p>
        <h3 className="exercise-list">Exercises:</h3>
        <ul>
          {updatedExercises.map((exercise, index) => (
            <li className="exercise-item" key={exercise.id}>
              <input
                type="text"
                value={exercise.name}
                onChange={(e) =>
                  handleExerciseChange(index, 'name', e.target.value)
                }
              />
              <input
                type="number"
                value={exercise.sets}
                onChange={(e) =>
                  handleExerciseChange(index, 'sets', parseInt(e.target.value))
                }
              />
              <input
                type="number"
                value={exercise.repetitions}
                onChange={(e) =>
                  handleExerciseChange(index, 'repetitions', parseInt(e.target.value))
                }
              />
              <input
                type="text"
                value={exercise.equipment}
                onChange={(e) =>
                  handleExerciseChange(index, 'equipment', e.target.value)
                }
              />
            </li>
          ))}
        </ul>
        <button onClick={handleUpdateExercise}>Update Plan</button>
      </div>
    );
}

export default DailyWorkout;
