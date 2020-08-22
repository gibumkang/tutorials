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
};

const nextVariants = {
    hidden: {
        x: "-100vw",
    },
    visible: {
        x: 0,
        transition: {
            type: "spring",
            stiffness: 120,
        },
    },
};

const Base = ({ addBase, pizza }) => {
    const bases = ["Classic", "Thin & Crispy", "Thick Crust"];

    return (
        <motion.div
            className="base container"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <h3>Step 1: Choose Your Base</h3>
            <ul>
                {bases.map((base) => {
                    let spanClass = pizza.base === base ? "active" : "";
                    return (
                        <motion.li
                            key={base}
                            whileHover={{
                                scale: 1.3,
                                color: "#f8e112",
                                originX: 0,
                            }}
                            transition={{ type: "spring", stiffness: 300 }}
                            onClick={() => addBase(base)}
                        >
                            <span className={spanClass}>{base}</span>
                        </motion.li>
                    );
                })}
            </ul>

            {pizza.base && (
                <motion.div
                    className="next"
                    variant={nextVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <Link to="/toppings">
                        <button>Next</button>
                    </Link>
                </motion.div>
            )}
        </motion.div>
    );
};

export default Base;
