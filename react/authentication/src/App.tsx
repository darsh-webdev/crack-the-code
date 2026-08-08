/*
  Problem Statement: Build a simple user authentication system using React Context
  API. The goal is to understand how to create context, provide context and consume
  context with your components, as well as manage basic authentication state globally.
*/

import { UserProvider } from "./contexts/userContext";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import "./App.css";

function App() {
  return (
    <UserProvider>
      <h1>Authentication using React Context</h1>
      <div className="app">
        <Navbar />
        <Dashboard />
      </div>
    </UserProvider>
  );
}

export default App;
