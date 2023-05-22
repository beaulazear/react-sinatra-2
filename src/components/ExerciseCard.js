import React, { useState } from "react";

export default function ExerciseCard({ exercise, removeExerciseThenUpdate, updateExercise }) {

    const [exerciseName, setExerciseName] = useState(exercise.name)
    const [exerciseDesc, setExerciseDesc] = useState(exercise.description)

    function handleExerciseName(e) {
        setExerciseName(e.target.value)
    }
    function handleExerciseDesc(e) {
        setExerciseDesc(e.target.value)
    }

    function removeExercise() {
        fetch(`http://localhost:9292/exercises/${exercise.id}`, {
            method: "DELETE",
        })
            .then((r) => r.json())
            .then((d) => removeExerciseThenUpdate(d))
    }

    function updateExerciseSubmit(e) {
        e.preventDefault()

        fetch(`http://localhost:9292/exercises/${exercise.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: exerciseName,
                description: exerciseDesc,
            }),
        })
        .then((r) => r.json())
        .then((d) => {
            updateExercise(d)
            setExerciseDesc('')
            setExerciseName('')
        })
    }

    if (!exercise) return <h2>...loading</h2>

    return (
        <div className="exerciseCard">
            <div className="cardTextArea">
            <h2>{exercise.name}</h2>
            <p>{exercise.description}</p>
            <form id="newExerciseForm" onSubmit={updateExerciseSubmit}>
                <h3>Update Exercise:</h3>
                <label>Name</label>
                <input id="nameInput" type="text" placeholder="Exercise Name" value={exerciseName} onChange={handleExerciseName}></input>
                <br></br>
                <label>Description</label>
                <textarea rows={8} cols={40} id="descriptionInput" type="text" placeholder="Exercise Description" value={exerciseDesc} onChange={handleExerciseDesc}></textarea>
                <br></br>
                <button type="submit">Submit</button>
            </form>
            <p>Visit the Workouts page to see past workouts, and add new ones!</p>
            <button className="button-18" onClick={removeExercise}>Remove exercise</button>
            </div>
        </div>
    )
}