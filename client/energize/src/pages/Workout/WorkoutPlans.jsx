import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./WorkoutPlans.scss";

function WorkoutPlans() {
    const [workoutPlans, setWorkoutPlans] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchWorkoutPlans() {
            try {
                const response = await axios.get('http://localhost:8056/workoutplans');
                setWorkoutPlans(response.data);
            } catch (error) {
                console.error('Error fetching workout plans:', error);
                setError('Error fetching workout plans. Please try again later.');
            }
        }

        fetchWorkoutPlans();
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="workout-plans-container">
            <h2>Workout Plans</h2>
            <div className="workout-plans">
                {workoutPlans.map((plan) => (
                    <div key={plan.id} className="workout-plan-card">
                        <h3>{plan.title}</h3>
                        <p>{plan.description}</p>
                        <p>Type: {plan.type}</p>
                        <p>Difficulty Level: {plan.difficultyLevel}</p>
                        <p>Duration: {plan.duration} minutes</p>
                        {/* Add more details as needed */}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default WorkoutPlans;
