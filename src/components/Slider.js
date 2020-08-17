import React from "react";
import { Frame, useMotionValue, useTransform } from "framer";

export function Slider({ min = 0, max = 1, value = 0, onChange }) {
    const position = useMotionValue(value * 130);
    const newValue = useTransform(position, [0, 130], [min, max]);
    return (
        <Frame
            center
            name={"Rail"}
            width={130}
            height={6}
            radius={3}
            background={"rgba(255,255,255,.2)"}
        >
            <Frame
                name={"Fill"}
                width={position}
                height={6}
                radius={3}
                background={"#fff"}
            />
            <Frame
                name={"Knob"}
                size={40}
                center={"y"}
                radius={"50%"}
                background={"#fff"}
                shadow={"0 2px 8px 1px rgba(0,0,0,.2)"}
                left={-20}
                drag={"x"}
                x={position}
                dragConstraints={{ left: 0, right: 130 }}
                dragElastic={0}
                dragMomentum={false}
                onDrag={function () {
                    if (onChange) onChange(newValue.get());
                }}
            />
        </Frame>
    );
}

export default Slider;
