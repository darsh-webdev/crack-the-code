/* Problem Statement: Create a class-based React component that displays 
a user's image, name and a button to toggle visibility of their bio. */

import { Component } from "react";
import "./App.css";

const user = {
  name: "Jane Doe",
  bio: "Frontend developer who loves React and coffee ☕️",
  image: "https://do6gp1uxl3luu.cloudfront.net/question-webp/dummyUser.jpg",
};

class App extends Component {
  state = {
    isBioVisible: false,
  };

  toggleBio = () => {
    this.setState({
      isBioVisible: !this.state.isBioVisible,
    });
  };

  render() {
    return (
      <div>
        <h1>User Profile Card</h1>
        <div className="user-profile">
          <img src={user.image} className="profile-img" />
          <h2>{user.name}</h2>
          <button onClick={this.toggleBio}>
            {this.state.isBioVisible ? "Hide Bio" : "Show Bio"}
          </button>

          {this.state.isBioVisible && <p>{user.bio}</p>}
        </div>
      </div>
    );
  }
}

export default App;
