import React from "react";
import UserClass from "./UserClass";


class About extends React.Component {
    constructor(props) {
        super(props)

        console.log("Parent Constructor");
    }

    componentDidMount() {
        console.log("Parent Component DidMount");
    }

    render() {
        console.log("Parent Render");

        return (
            <div>
                <h1>About Us</h1>
                <h2>This is Namaste React Episode - 08</h2>
                <h2>In this episode we will learn about Class Components in React</h2>
                <UserClass name={"First "} location={"Mumbai"} />
                <UserClass name={"Second "} location={"New York"} />
            </div>
        )
    }
}

/** How the lifescycle works
 * - Parent Constructor
 * - Parent Render
 * 
 *    - Child 1 Constructor
 *    - Child 1 Render
 * 
 *    - Child 2 Constructor
 *    - Child 2 Render
 * 
 *    <DOM UPDATED - IN SINGLE BATCH>
 *    - Child 1 Component DidMount
 *    - Child 2 Component DidMount
 * 
 * - Parent Component DidMount
*/

// const About = () => {
//     return (
//         <div>
//             <h1>About Us</h1>
//             <h2>This is Namaste React Episode - 08</h2>
//             <h2>In this episode we will learn about Class Components in React</h2>
//             <UserClass name={"Darshan (Class)"} location={"Mumbai"} />
//         </div>
//     )
// }

export default About;