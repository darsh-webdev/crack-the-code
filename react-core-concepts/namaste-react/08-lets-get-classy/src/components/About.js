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
                <UserClass name={"Darshan (Class)"} location={"Mumbai"} />
            </div>
        )
    }
}

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