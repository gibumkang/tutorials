import React, { useState } from "react";
import "./App.css";
import {
    Container,
    Sidebar,
    Content,
    CollapseBtn,
    SidebarVariants,
    AvatarVariants,
    Menu,
    MenuItem,
    MenuLabel,
    MenuLabelVariants,
    Avatar,
} from "../components/styles";

function App() {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };
    return (
        <Container>
            <Sidebar
                initial={isSidebarCollapsed ? "collapsed" : "expanded"}
                animate={isSidebarCollapsed ? "collapsed" : "expanded"}
                variants={SidebarVariants}
            >
                <Avatar
                    initial={isSidebarCollapsed ? "collapsed" : "expanded"}
                    animate={isSidebarCollapsed ? "collapsed" : "expanded"}
                    variants={AvatarVariants}
                    src="https://via.placeholder.com/50x50"
                />
                <Menu>
                    <MenuItem>
                        <MenuLabel variants={MenuLabelVariants}>Home</MenuLabel>
                    </MenuItem>
                    <MenuItem>
                        <MenuLabel variants={MenuLabelVariants}>
                            Dashboard
                        </MenuLabel>
                    </MenuItem>
                    <MenuItem>
                        <MenuLabel variants={MenuLabelVariants}>
                            Messages
                        </MenuLabel>
                    </MenuItem>
                </Menu>
                <CollapseBtn onClick={toggleSidebar}>
                    {isSidebarCollapsed ? "Show" : "Hide"}
                </CollapseBtn>
            </Sidebar>
            <Content>Content</Content>
        </Container>
    );
}

export default App;
