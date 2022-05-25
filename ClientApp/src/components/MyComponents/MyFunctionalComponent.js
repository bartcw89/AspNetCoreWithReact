import React, { useEffect, useState, useRef } from 'react';

const MyFunctionalComponent = props => {
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

    /* EVENT HANDLING */
    const onChangeAgeInput = event => {
        alert("Age has changed");
        setAge(parseInt(event.target.value));
    };

    const showDetails = telephone => {
        alert(`Name: ${props.name ? props.name : "John"} | Age: ${age} | Telephone: ${telephone}`);
    };

    /* CONDITIONAL RENDERING */
    let joanAge = () => {
        if (age > 25)
            return <p>John is older than 25</p>;
        else
            return <p>John is 25 or younger</p>;
    };

    /* ITERATION */
    let users = [
        { name: 'John', age: 20 },
        { name: 'Adam', age: 32 },
        { name: 'Frank', age: 28 },
        { name: 'Patel', age: 40 }
    ];

    /* FORM */
    const [userName, setUserName] = useState("David");
    const handleUserNameChange = event => setUserName(event.target.value);
    const handleSubmit = event => alert("Form submitted. Value: " + userName);

    /* EXAMPLE 1 */
    let userList = users.map(user => <li key={user.name}>Name: {user.name} - Age: {user.age}</li>);

    /* REFERENCE */
    const inputRefName = useRef(null);
    const inputRefTel = useRef(null);
    const clearRefFields = () => {
        inputRefName.current.value = "";
        inputRefTel.current.value = "";
        inputRefName.current.focus();
    }

    return (<>
        <h1>My Functional Component</h1>
        {/* PROPERTIES */}
        <h2>Properties</h2>
        <p>Name: {props.name ? props.name : "John"}</p>
        <hr />

        {/* STATE */}
        <h2>State</h2>
        <p>Age:</p>
        <input type="number" value={age} onChange={onChangeAgeInput} />
        <button onClick={() => setAge(age + 1)}>+</button>
        <button onClick={() => setAge(age - 1)}>-</button>
        <hr />

        {/* EVENT HANDLING */}
        <h2>Event handling</h2>
        <button onClick={showDetails.bind(this, 123456789)}>Show details</button>
        <hr />

        {/* CONDITIONAL RENDERING */}
        <h2>Conditional Rendering</h2>

        {/* EXAMPLE 1 - IF/ELSE */}
        {joanAge()}

        {/* EXAMPLE 2 - TERNARY OPERATOR */}
        <p>{age > 25 ? 'John is older than 25' : 'John is 25 or younger'}</p>

        {/* EXCAMPLE 3 - SHORT-CIRCUIT OPERATOR */}
        {age > 25 && <p>John is older than 25</p>}
        {age <= 25 && <p>John is 25 or younger</p>}

        {/* EXAMPLE 4 - IMEDIATELY INVOKED FUNCTION */}
        {
            (() => {
                switch (age) {
                    case 25: return <p>John is 25</p>;
                    default: return <p>John is not 25</p>;
                }
            })()
        }
        <hr />

        {/* ITERATION */}
        <h2>Iteration</h2>

        <ul>
            {/* EXAMPLE 1 */}
            {userList}
            <br />
            {/* EXAMPLE 2 */}
            {users.map(user => <li key={user.name}>Name: {user.name} - Age: {user.age}</li>)}
        </ul>
        <hr />

        {/* FORM */}
        <h2>Form</h2>
        <form onSubmit={handleSubmit}>
            <label>Name:
                <input type="text" value={userName} onChange={handleUserNameChange} />
            </label>
            <input type="submit" value="Submit" />
        </form>
        <hr />

        {/* REFERENCE */}
        <h2>References</h2>
        <label>Name:
            <input type="text" ref={inputRefName} />
        </label>
        <label>Telephone:
            <input type="text" ref={inputRefTel} />
        </label>
        <button onClick={clearRefFields.bind(this)}>Clear fields</button>
    </>);
}

export default MyFunctionalComponent;