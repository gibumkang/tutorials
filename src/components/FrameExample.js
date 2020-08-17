import React from "react";
import { Frame } from "framer";

export const FrameExample = () => {
    return (
        <Frame
            background={"red"}
            radius={30}
            size={150}
            center
            animate={{ rotate: 360 }}
            transition={{ duration: 2 }}
        />
    );
};

export default FrameExample;
