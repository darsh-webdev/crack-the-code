# Namaste React - Episode 08: Let's Get Classy!

## 📚 Topics Learned

- **Nested Routes & Router Variants in React Router**:
  - Defining route hierarchies by nesting routes inside layout components.
  - **`createHashRouter`**: Utilizes the URL hash fragment (`#`) to handle client-side routing without triggering server page reloads.
  - **`createMemoryRouter`**: Stores history in memory rather than reading/writing browser address bar, making it ideal for non-browser testing environments.

- **Class-Based Components in React**:
  - Declared by extending `React.Component`.
  - Initializing component state inside `constructor()` using `this.state = { ... }`.
  - Triggering re-renders and updating state using `this.setState({ ... })`.

- **`super(props)` in Constructor**:
  - Calling `super(props)` as the first line in a child class constructor executes the parent `React.Component` constructor.
  - Ensures `this.props` is correctly bound and accessible throughout the constructor and component lifecycle methods.

- **Class Component Lifecycle Methods**:
  - **Mounting Phase**:
    1. `constructor()` $\rightarrow$ State initialization & binding.
    2. `render()` $\rightarrow$ Returns JSX layout.
    3. React updates DOM nodes and refs.
    4. `componentDidMount()` $\rightarrow$ Called immediately after component is inserted into the DOM (used for API data fetching, subscriptions, DOM setups).
  - **Updating Phase**:
    1. `render()` $\rightarrow$ Re-renders UI on state/props updates.
    2. React updates DOM nodes.
    3. `componentDidUpdate()` $\rightarrow$ Called after component updates in the DOM.
  - **Unmounting Phase**:
    1. `componentWillUnmount()` $\rightarrow$ Called immediately before component removal from the DOM (used for teardown, clearing `setInterval`, removing event listeners, preventing memory leaks).

- **Why `useEffect()` Callback Cannot Be `async`**:
  - `useEffect()` expects its callback to return either `undefined` or a **cleanup function**.
  - An `async` function implicitly returns a `Promise`, which breaks React's expected cleanup return contract.
  - *Correct Pattern for Async Operations in `useEffect`*:
    ```javascript
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchAPI();
                setState(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
        return () => {
            // Cleanup logic
        };
    }, []);
    ```

---

## 🛠️ Code Implementation Highlights

### Project Directory Structure
```text
08-lets-get-classy/
├── index.html
├── styles.css
├── package.json
└── src/
    ├── App.js
    ├── components/
    │   ├── Header.js
    │   ├── Body.js
    │   ├── RestaurantCard.js
    │   ├── RestaurantMenu.js
    │   ├── About.js
    │   ├── User.js
    │   ├── UserClass.js
    │   ├── Contact.js
    │   ├── Error.js
    │   ├── Shimmer.js
    │   └── Footer.js
    └── utils/
        └── constants.js
```

### 1. Functional User Component (`src/components/User.js`)
- Functional component created for comparison:
  ```javascript
  const User = ({ name }) => {
      return (
          <div className="user-card">
              <h2>Name: {name}</h2>
              <h2>Address: Mumbai</h2>
              <h3>Github: @darsh-webdev</h3>
          </div>
      );
  };

  export default User;
  ```

### 2. Class-Based User Component with GitHub API Fetch (`src/components/UserClass.js`)
- Implemented state initialization in constructor, API data fetching in `componentDidMount()`, `componentDidUpdate()`, and cleanup in `componentWillUnmount()`:
  ```javascript
  import React from "react";

  class UserClass extends React.Component {
      constructor(props) {
          super(props);

          this.state = {
              userInfo: {
                  id: 0,
                  name: "default name",
                  location: "default location",
              }
          };
      }

      async componentDidMount() {
          const data = await fetch("https://api.github.com/users/darsh-webdev");
          const json = await data.json();

          this.setState({
              userInfo: json
          });
      }

      componentDidUpdate() {
          console.log("componentDidUpdate called");
      }

      componentWillUnmount() {
          console.log("Component unmounted");
      }

      render() {
          const { name, location, avatar_url } = this.state.userInfo;

          return (
              <div className="user-card">
                  <img src={avatar_url} alt="User Avatar" />
                  <h2>Name: {name}</h2>
                  <h2>Address: {location}</h2>
                  <h3>Github: @darsh-webdev</h3>
              </div>
          );
      }
  }

  export default UserClass;
  ```

### 3. Class-Based Parent Component (`src/components/About.js`)
- Converted `About` component into a class component rendering child `UserClass`:
  ```javascript
  import React from "react";
  import UserClass from "./UserClass";

  class About extends React.Component {
      constructor(props) {
          super(props);
      }

      render() {
          return (
              <div>
                  <h1>About Us</h1>
                  <h2>This is Namaste React Episode - 08</h2>
                  <h2>In this episode we will learn about Class Components in React</h2>
                  <UserClass name={"First "} location={"Mumbai"} />
              </div>
          );
      }
  }

  export default About;
  ```

### 4. User Card Styling (`styles.css`)
- Added CSS styles for `.user-card` container and avatar image:
  ```css
  .user-card {
      padding: 10px;
      border: 1px solid black;
  }

  .user-card>img {
      width: 150px;
      height: 150px;
      object-fit: cover;
  }
  ```