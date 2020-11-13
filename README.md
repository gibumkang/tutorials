## How to hook React with Firebase

This is based off of the tutorial off Udemy.

#### Build out NavLinks from 'react-router-dom' for routing

This is done on the Header.js file for this project. Adding routes are pretty self-explanatory and done in this fashion:

```reactjs
import {NavLink, Switch} from 'react-router-dom';
//...

<NavLink to="/">Home</NavLink>
<NavLink to="/top">Top</NavLink>
```

#### Updating true/false states with setters

Whenever you have a situation where you need to update state based on the opposite state...Use the prev pattern, which becomes available only in setters.

```reactjs
//not recommended
<button onClick={() => setLogin(!login)}>

//prev pattern, recommended
<button onClick={() => setLogin(prevLogin => !prevLogin)}>
```

#### useFormValidation is a custom hook

Refer to the useFormValidation.js file to see how we are handling entries for multiple input fields in one handler and one state, as opposed to several different states.
