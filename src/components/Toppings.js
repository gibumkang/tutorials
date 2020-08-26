import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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
        },
    },
    exit: {
        x: "-100vh",
        transition: { ease: "easeInOut" },
    },
};

const Toppings = ({ addTopping, pizza }) => {
    let toppings = [
        "mushrooms",
        "peppers",
        "onions",
        "olives",
        "extra cheese",
        "tomatoes",
    ];

    return (
        <motion.div
            className="toppings container"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}
        >
            <h3>Step 2: Choose Toppings</h3>
            <ul>
                {toppings.map((topping) => {
                    let spanClass = pizza.toppings.includes(topping)
                        ? "active"
                        : "";
                    return (
                        <motion.li
                            key={topping}
                            whileHover={{
                                scale: 1.3,
                                color: "#f8e112",
                                originX: 0,
                            }}
                            transition={{ type: "spring", stiffness: 300 }}
                            onClick={() => addTopping(topping)}
                        >
                            <span className={spanClass}>{topping}</span>
                        </motion.li>
                    );
                })}
            </ul>

            <Link to="/order">
                <button>Order</button>
            </Link>
        </motion.div>
    );
};

export default Toppings;
