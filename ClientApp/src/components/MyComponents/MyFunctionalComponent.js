// eslint-disable-next-line
import React, { useEffect, useState } from 'react';

const MyFunctionalComponent = (props) => {
    function componentMount() {
        alert("Component rendered");
    }

    function componentUnmount() {
        alert("Leaving the component");
    }

    useEffect(() => {
        componentMount();
        return () => {
            componentUnmount();
        }
    }, []);

    const [age, setAge] = useState(20);

    const onChangeAgeInput = (event) => {
        alert("Age has changed");
        setAge(parseInt(event.target.value));
    };

    const showDetails = (telephone) => {
        alert(`Name: ${props.name ? props.name : "John"} | Age: ${age} | Telephone: ${telephone}`);
    };

    return (
        <div>
            <h1>My  Functional Component</h1>
            <h2>Properties</h2>
            <p>Name: {props.name ? props.name : "John"}</p>
            <hr />
            <h2>State</h2>
            <p>Age:</p>
            <input type="number" value={age} onChange={onChangeAgeInput} />
            <button onClick={() => setAge(age + 1)}>+</button>
            <button onClick={() => setAge(age - 1)}>-</button>
            <hr />
            <h2>Event handling</h2>
            <button onClick={showDetails.bind(this, 123456789)}>Show details</button>
        </div>
    );
}

export default MyFunctionalComponent;