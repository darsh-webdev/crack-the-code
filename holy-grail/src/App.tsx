/*
Problem Statement: The Holy Grall layout is a classic web page structure 
that has been a common layout pattern since the early days of web design. 
It consists of a full-width header at the top, a full-width footer at the bottom, 
and a three-column content area in the center: a fixed-width left sidebar 
(commonly used for navigation), a flexible main content area in the center, 
and a fixed-width right sidebar (often used for ads or additional content).

In this challenge, you will build a reusable HolyGrailLayout component using React
functional components and CSS. The component must follow semantic HTML5 structure.
*/

import "./App.css";

function App() {
  return (
    <div className="container">
      <header>Header</header>
      <div className="columns">
        <nav>Navigation</nav>
        <main>
          Main
          <h2>(Holy Grail CSS Layout)</h2>
        </main>
        <aside>Sidebar</aside>
      </div>
      <footer>Footer</footer>
    </div>
  );
}

export default App;
