import User from "./User";
import UserClass from "./UserClass";

const About = () => {
    return (
        <div>
            <h1>About Us</h1>
            <h2>This is Namaste React Episode - 08</h2>
            <h2>In this episode we will learn about Class Components in React</h2>
            <User name={"Darshan (Functional)"} location={"Mumbai"} />
            <UserClass name={"Darshan (Class)"} location={"Mumbai"} />
        </div>
    )
}

export default About;