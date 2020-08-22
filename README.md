### Framer Motion Tutorial

Taught by The Net Ninja [here](https://www.youtube.com/watch?v=lfR2X-jsy8A&list=PL4cUxeGkcC9iHDnQfTHEVVceOEBsOf07i&index=2).

### beforeChildren transition

This allows the current animation to fully complete before the children animation takes place. On the Order.js file, you will see a when transition declared in the containerVariants:

```
const containerVariants = {
    hidden: {
        x: "100vw",
        opacity: 0,
    },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            type: "spring",
            delay: 0.5,
            when: "beforeChildren",
        },
    },
};
const childVariants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
    },
};
```

This allows the 'You ordered a pizza with:' line to only animate once the 'Thank you for your order :)' animation has completely finished. That is because childVariants is a child of containerVariants:

```
    <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
    >
        <h2>Thank you for your order :)</h2>
        <motion.p variants={childVariants}>
            //...
        </motion.p>
        <motion.div variants={childVariants}>
            //...
        </motion.div>
    </motion.div>
```

Alternatively, using afterChildren will allow the child animation to complete before the parent animation takes place.

### Tips about Variants

Variants make it easier to animate your components by storing multiple key value declarations into a single object (See same example above ie containerVariants). When you have a variant declared, use it in your component as a string, like so:

```
        <motion.div
            className="toppings container"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            //...
        </motion.div>
```

**TIP:** If one or more component uses the same variant, you only need to declare your initial/animate properties once. The rest of the components only require the variants declaration.

### Stagger Children

This is another property that can be declared within a parent variant. The children will adopt the same animation with a delay based on the value of the StaggerChildren property (See the same containerVariants example above).

### Keyframes

Regular initial/animate declarations can control 2 animations (start and end). Keyframes allow you to do much more. They are added as arrays:

```
    //standard 2 way animation
    const buttonVariants = {
        start: {
            scale: 1
        }
    }
    //keyframe animation
    const buttonVariants = {
        start: {
            scale: [1, 1.5, 1, 3.0, 1]
        }
    }
```

### Yoyo (Persistent Animation)

A transition property that adds repeating images declaratively as opposed to imperatively:

```
    //keyframe animation
    const buttonVariants = {
        start: {
            scale: [1, 1.5, 1, 1.5]
        }
    }
    //yoyo animation with the same effect
    const buttonVariants = {
        start: {
            scale: 1.5 //No need to specify 1 since that is the default
            transition: {
                yoyo: 2 //for infnitie, use Infinity
            }
        }
    }
```

### AnimatePresence and exit attribute for exit animations

Animating exit transitions actually require an extra step. Load AnimatePresnce from 'framer-motion' and wrap your component with <AnimatePresence> tags. Make sure the component within it has an exit attribute. Framer will know to look for the exit attribute when the component exits the DOM, whether from the DOM directly or from a rerender:

```
    import {motion, AnimatePresence} from 'framer-motion';
    const [showTitle, setShowTitle] = React.useState(true);
    setTimeout(() => {
        setShowTitle(false)
    }, 1000)
    <AnimatePresence>
        {showTitle && (
            <h1 exit={{ y: 1000}}>Hello World!</h1>
        )}
    </AnimatePresence>
```

After 1 sec from the setTimeout, the h1 will animate out of the screen vertically because of the exit attribute + AnimatePresence tag. Adding animation to page transitions can be done by wrapping the <Switch> tags with <AnimatePresence>. Make sure the <Switch> tag contains the following attributes (location and key) in order for framer to detect the changes. Finally, the animating components must also have an exit attribute:

```
    const HomeVariants = {
        hidden: {
            opacity: 0
        },
        visible: {
            opacity: 1
        },
        exit: {
            x: -100
        }
    }
    <AnimatePresence>
        <Switch location={location} key={location.key}>
            <Route path='/home'>
                <Home
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={HomeVariants}
                />
            </Route>
            //...
        </Switch>
    </AnimatePresence>
```
