import React from 'react';
import './NavbarWorkout.scss'; 

function NavbarWorkout() {
    return (
        <nav className="navbar">
            <ul>
                <li><a href="/workoutview">workout</a></li>
                <li><a href="/dailyworkoutPlan">Daily Workout</a></li>
                <li><a href="/workout">workout</a></li>
               
            </ul>
        </nav>
    );
}

export default NavbarWorkout;
