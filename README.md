## How to hook React with Firebase

This is based off of the tutorial on Udemy. Find the final app [here](https://react-firebase-udemy-tutorial.web.app/new/1).

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

Refer to the useFormValidation.js file to see how we are handling entries for multiple input fields in one handler and one state,
as opposed to several different states. The steps are to (1) Create a default state (2) Deconstruct the functions & variables (3) Call the custom hook (4) Pass the default state and call the main function to run.

### import/export index.js files to avoid importing like 'name/name.js'

Refer to the index.js file within the firebase folder to see a better alternative.

### The customHook pattern in this video is THE BEST!

Refer to Login.js or CreateLink.js to implement this amazing pattern that is ideal for forms. In this example, we have it execute error handling, onChange, onBlur, and so much more. Lastly, it will initialize whatever action you direct it to so forms can serve different purposes.

### withRouter from react-router-dom and history

Wrapping the component towards the bottom on the line with export default

### Updating firebase

```react
//this is the pattern to utilize to update anything on firebase
voteRef.get().then((doc) => {
    if (doc.exists) {
        const previousVotes = doc.data().votes;
        const vote = {
            votedBy: {
                id: user.uid,
                name: user.displayName,
            },
        };
        const updatedVotes = [...previousVotes, vote];
        voteRef.update({ votes: updatedVotes });
    }
});
```

### Sort method is utilized to sort the upvotes for top votes

```reactjs
const topLinks = links.slice().sort((l1, l2) => l2.votes.length - l1.votes.length);
```

[This](https://www.w3schools.com/js/js_array_sort.asp) is a good reference as to how the sort() method operates. In a nutshell, sort() is great for organizing strings in alphabetical order. It can be used to sort numbers as well, but requires the pattern above.

### SearchLinks

This component an excellent way to filter based on several different arguments such as name, description, and url.
