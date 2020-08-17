import styled from "styled-components";
import { motion } from "framer-motion";

const COLLAPSED_WIDTH = "80px";
const EXPANDED_WIDTH = "200px";

export const AvatarVariants = {
    expanded: {
        scale: 1.5,
        x: 13,
        y: 13,
    },
    collapsed: {
        width: "50px",
        scale: 1,
        x: 0,
        y: 0,
    },
};

export const MenuLabelVariants = {
    expanded: {
        opacity: 1,
        display: "flex",
    },
    collapsed: {
        opacity: 0,
        transitionEnd: {
            display: "none",
        },
    },
};

export const Avatar = styled(motion.img)`
    position: relative;
`;

export const SidebarVariants = {
    expanded: () => ({
        width: EXPANDED_WIDTH,
        transition: {
            when: "beforeChildren",
        },
    }),
    collapsed: () => ({
        width: COLLAPSED_WIDTH,
        transition: {
            when: "afterChildren",
        },
    }),
};

export const Container = styled.div`
    display: flex;
    min-height: 100vh;
    min-width: 0;
    font-family: sans-serif;
`;

export const Sidebar = styled(motion.div)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    min-width: 0;
    border-right: solid 1px #3c4245;
    background-color: #98d788;
    padding: 10px;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
    padding: 10px;
    background-color: #88afd7;
`;

export const CollapseBtn = styled.button`
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    min-width: 0;
    align-items: center;
    justify-content: center;
    width: auto;
    white-space: nowrap;
    align-self: flex-end;
`;

export const Menu = styled.ul`
    list-style: none;
    padding: 0;

    & > * + * {
        margin-top: 5px;
    }
`;

export const MenuItem = styled.li``;

export const MenuLabel = styled(motion.span)``;
