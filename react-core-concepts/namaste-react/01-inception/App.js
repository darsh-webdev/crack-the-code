/* =========================================================
   4. Hello World using React

   React.createElement(type, props, children)
   ========================================================= */

const heading = React.createElement(
    "h1",
    {},
    "Hello World from React!"
);


const root = ReactDOM.createRoot(
    document.getElementById("root")
);

root.render(heading);


/* =========================================================
   5. React Element with an attribute

   HTML equivalent:

   <h1 id="title">
     Hello World!
   </h1>
   ========================================================= */

const title = React.createElement(
    "h1",
    { id: "title" },
    "Hello World with an ID!"
);


/* =========================================================
   6. Nested HTML structure using React.createElement()

   HTML equivalent:

   <div id="parent">
     <div id="child1">
       <h1>Heading 1</h1>
       <h2>Heading 2</h2>
     </div>

     <div id="child2">
       <h1>Heading 1</h1>
       <h2>Heading 2</h2>
     </div>
   </div>
   ========================================================= */

const parent = React.createElement(
    "div",
    { id: "parent" },

    [
        React.createElement(
            "div",
            { id: "child1" },

            [
                React.createElement(
                    "h1",
                    {},
                    "Heading 1"
                ),

                React.createElement(
                    "h2",
                    {},
                    "Heading 2"
                )
            ]
        ),

        React.createElement(
            "div",
            { id: "child2" },

            [
                React.createElement(
                    "h1",
                    {},
                    "Heading 1"
                ),

                React.createElement(
                    "h2",
                    {},
                    "Heading 2"
                )
            ]
        )
    ]
);


/* =========================================================
   7. Render the nested React structure

   Uncomment this and comment out the previous
   root.render(heading) to see the nested structure.
   ========================================================= */

// root.render(parent);