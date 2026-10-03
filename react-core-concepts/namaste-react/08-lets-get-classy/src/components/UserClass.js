import React from "react";

class UserClass extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            count: 0,
            count2: 1,
        }

        console.log(this.props.name + "Child Constructor");
    }

    componentDidMount() {
        console.log(this.props.name + "Child Component DidMount");
    }

    render() {
        const { name, location } = this.props

        console.log(this.props.name + "Child Render");

        return (
            <div className="user-card">
                <h1>Count: {this.state.count}</h1>
                <h1>Count2: {this.state.count2}</h1>
                <button onClick={() => this.setState({ count: this.state.count + 1, count2: this.state.count2 + 1 })}>
                    Increase Count
                </button>
                <h2>Name: {name}</h2>
                <h2>Address: {location}</h2>
                <h3>Github: @darsh-webdev</h3>
            </div>
        )
    }
}

export default UserClass;