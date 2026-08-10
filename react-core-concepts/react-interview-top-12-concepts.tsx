/*
===========================================================
React Interview Revision
Based on Akshay Saini's Top React Interview Questions
===========================================================

Topics Covered

1. Virtual DOM
2. Reconciliation
3. React Fiber
4. Keys
5. State vs Props
6. useState()
7. useEffect()
8. Lifting State Up
9. Controlled vs Uncontrolled Components
10. Context API
11. React Performance
12. React Rendering Flow

===========================================================
1. Virtual DOM
===========================================================

✔ Virtual DOM is a lightweight JavaScript object.
✔ React updates the Virtual DOM first.
✔ It compares previous and current Virtual DOM.
✔ Finally updates only changed nodes in the Real DOM.

Real DOM updates are expensive.
Virtual DOM makes them efficient.

===========================================================
2. Reconciliation
===========================================================

Reconciliation = React's diffing algorithm.

Old Virtual DOM
        ↓
Compare
        ↓
New Virtual DOM
        ↓
Find minimal changes
        ↓
Update Real DOM

Know:

✔ Diffing
✔ Tree comparison
✔ Minimal DOM updates

===========================================================
3. React Fiber
===========================================================

React Fiber is React's rendering engine.

Purpose:

✔ Interrupt rendering
✔ Prioritize updates
✔ Better scheduling
✔ Smooth UI

Important:

React 16+ uses Fiber.

===========================================================
4. Keys
===========================================================

Correct

const users = [
  { id: 1, name: "John" },
  { id: 2, name: "Jane" },
];

users.map(user => (
  <li key={user.id}>{user.name}</li>
));

Why?

✔ Helps React identify elements.
✔ Improves reconciliation.
✔ Prevents unnecessary re-renders.

Avoid:

key={index}

unless the list never changes.

===========================================================
5. Props vs State
===========================================================

Props

✔ Passed from parent.
✔ Read-only.
✔ Immutable.

State

✔ Managed inside component.
✔ Mutable using setState().
✔ Triggers re-render.

===========================================================
6. useState()
===========================================================

const [count, setCount] = useState(0);

Know:

✔ State updates are asynchronous.
✔ Never mutate state directly.

❌ Wrong

count++;

✔ Correct

setCount(prev => prev + 1);

===========================================================
7. useEffect()
===========================================================

Runs after render.

useEffect(() => {

}, []);

Dependency Array

[]

→ Run once

[count]

→ Run when count changes

No dependency array

→ Run after every render

Cleanup

useEffect(() => {

    return () => {

    };

}, []);

Used for:

✔ Remove listeners
✔ Clear timers
✔ Abort API requests

===========================================================
8. Lifting State Up
===========================================================

When multiple components need
the same state,

Move the state
to the nearest common parent.

Parent

↓

Child A
Child B

===========================================================
9. Controlled vs Uncontrolled
===========================================================

Controlled

const [name,setName] = useState("");

<input
 value={name}
 onChange={e=>setName(e.target.value)}
/>

✔ React controls input.

-----------------------------------

Uncontrolled

const inputRef = useRef();

<input ref={inputRef}/>

✔ DOM controls input.

===========================================================
10. Context API
===========================================================

Avoids Prop Drilling.

<AuthContext.Provider value={user}>
    <App/>
</AuthContext.Provider>

Consume

const user = useContext(AuthContext);

Use for:

✔ Theme
✔ Auth
✔ Language

Avoid storing
frequently changing large state.

===========================================================
11. React Performance
===========================================================

Know these:

✔ React.memo()

Avoid unnecessary component renders.

-----------------------------------

useMemo()

Memoize expensive calculations.

const total = useMemo(() => {
    return calculateTotal(items);
}, [items]);

-----------------------------------

useCallback()

Memoize functions.

const handleClick = useCallback(() => {

}, []);

-----------------------------------

Code Splitting

const Home = lazy(() => import("./Home"));

<Suspense fallback={<Loader/>}>
    <Home/>
</Suspense>

===========================================================
12. React Rendering Flow
===========================================================

State Update

↓

Render Phase

↓

Virtual DOM

↓

Diffing

↓

Commit Phase

↓

Real DOM Updated

===========================================================
Frequently Asked Interview Questions
===========================================================

✔ Why React is fast?

Virtual DOM + Reconciliation + Fiber

-----------------------------------

✔ Why Keys?

Identify list items efficiently.

-----------------------------------

✔ Why useEffect cleanup?

Prevent memory leaks.

-----------------------------------

✔ Difference:

useMemo vs useCallback

useMemo
→ Memoizes VALUE

useCallback
→ Memoizes FUNCTION

-----------------------------------

✔ Props vs State

Props
→ Parent controlled

State
→ Component controlled

-----------------------------------

✔ Controlled vs Uncontrolled

Controlled
→ React controls input

Uncontrolled
→ DOM controls input

-----------------------------------

✔ React.memo()

Skips unnecessary renders
when props don't change.

===========================================================
Interview Checklist
===========================================================

✓ Virtual DOM

✓ Reconciliation

✓ Fiber

✓ Keys

✓ Props vs State

✓ useState

✓ useEffect

✓ Cleanup

✓ Lifting State

✓ Context API

✓ Controlled Components

✓ Uncontrolled Components

✓ React.memo

✓ useMemo

✓ useCallback

✓ Code Splitting

✓ Lazy Loading

=========================================================== */
