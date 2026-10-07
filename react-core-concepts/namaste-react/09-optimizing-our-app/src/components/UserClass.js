import React from "react";

class UserClass extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            userInfo: {
                id: 0,
                name: "default name",
                location: "default location",
            }
        }
    }

    async componentDidMount() {
        const data = await fetch("https://api.github.com/users/darsh-webdev");
        const json = await data.json();

        this.setState({
            userInfo: json
        })
    }

    componentDidUpdate() {
        // it is called every time after the component is rendered (in case of state change)
        console.log("componentDidUpdate called")
    }

    componentWillUnmount() {
        // It is called when the component is about to be unmounted (deleted from the DOM)
        // It is used to clear setInterval, listeners, etc.
        // For example: If you start a timer in componentDidMount, you should clear it in componentWillUnmount
        console.log("Component unmounted")
    }

    render() {
        const { name, location, avatar_url } = this.state.userInfo

        return (
            <div className="user-card">
                <img src={avatar_url} alt=""></img>
                <h2>Name: {name}</h2>
                <h2>Address: {location}</h2>
                <h3>Github: @darsh-webdev</h3>
            </div>
        )
    }
}

export default UserClass;