import React from "react";
import { useState } from "react";

export default function WorkoutCard({ exercise, handleWorkoutSubmit, addWorkout }) {

    const [reps, setReps] = useState(0)
    const [weight, setWeight] = useState(0)
    const [selectValue, setSelectValue] = useState('')
    const lastTenWorkouts = exercise.workouts.slice(-10)
    const lastTwoWorkouts = exercise.workouts.slice(-2)
    const selectOptions = [2, 10, "All"]

    function handleSelectChange(e) {
        console.log(e.target.value)
        setSelectValue(e.target.value)
    }

    function handleSetReps(e) {
        setReps(e.target.value)
    }

    function handleSetWeight(e) {
        setWeight(e.target.value)
    }

    const newWorkout = {
        reps: reps,
        weight: weight,
        exercise_id: exercise.id
    }

    function handleWorkoutSubmit(e) {
        e.preventDefault()

        fetch("http://localhost:9292/workouts", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newWorkout)
        })
            .then((r) => r.json())
            .then((d) => {
                addWorkout(d)
                setReps('')
                setWeight('')
            })
    }
    return (
        <div className="workoutCardDiv">
            <div className="cardTextArea">
                <form onSubmit={handleWorkoutSubmit} className="newWorkoutForm">
                    <h2>{exercise.name}</h2>
                    <h3>Add New Workout:</h3>
                    <div>Please use only whole numbers for input!</div>
                    <label>Reps</label>
                    <input id="reps" type="text" placeholder="Reps" value={reps} onChange={handleSetReps}></input>
                    <br></br>
                    <label>Weight in lbs</label>
                    <input id="weight" type="text" placeholder="Weight (lbs)" value={weight} onChange={handleSetWeight}></input>
                    <br></br>
                    <button type="submit">Submit</button>
                </form>
                <br></br>
                <select onChange={handleSelectChange}>
                    <option>Please choose an option</option>
                    {selectOptions.map((option, index) => {
                        return <option key={index} >
                            {option}
                        </option>
                    })}
                </select>
                {selectValue == 10 ? (
                    <ul id="exerciseNewWorkoutUl">
                        {lastTenWorkouts.map((workout) => (
                            <div key={workout.id}>
                                <li>{workout.reps} reps at {workout.weight} lbs on {new Date(workout.created_at).toDateString()}</li>
                            </div>
                        ))}
                    </ul>
                ) : selectValue == 2 ? (
                    <ul id="exerciseNewWorkoutUl">
                        {lastTwoWorkouts.map((workout) => (
                            <div key={workout.id}>
                                <li>{workout.reps} reps at {workout.weight} lbs on {new Date(workout.created_at).toDateString()}</li>
                            </div>
                        ))}
                    </ul>
                ) : selectValue == "All" ? (
                    <ul id="exerciseNewWorkoutUl">
                        {exercise.workouts.map((workout) => (
                            <div key={workout.id}>
                                <li>{workout.reps} reps at {workout.weight} lbs on {new Date(workout.created_at).toDateString()}</li>
                            </div>
                        ))}
                    </ul>
                ) : <div>Select an option above to view past workouts!</div>}
            </div>
        </div>
    )
}