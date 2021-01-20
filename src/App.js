import React, {useRef, useEffect} from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import { createSlides } from './utils/slides';

function App() {
    const primaryRef = useRef();
    const secondaryRef = useRef();

    useEffect(() => {
        primaryRef.current.sync(secondaryRef.current.splide);
    }, [])

    function renderSlides() {
		return createSlides().map( slide => (
			<SplideSlide key={ slide.src }>
				<img src={ slide.src } alt={ slide.alt } />
			</SplideSlide>
		))
	};

    const primaryOptions = {
        type      : 'loop',
        perPage   : 1,
        perMove   : 1,
        gap       : '1rem',
        pagination: false,
    };

    const secondaryOptions = {
        type        : 'slide',
        rewind      : true,
        gap         : '1rem',
        pagination  : false,
        fixedWidth  : 110,
        fixedHeight : 70,
        cover       : true,
        focus       : 'center',
        isNavigation: true,
        updateOnMove: true,
    };

    return (
        <>
            <div className="wrapper">
				<h2>Thumbnail Slider</h2>

				<Splide options={ primaryOptions } ref={ primaryRef }>
					{ renderSlides() }
				</Splide>

				<Splide options={ secondaryOptions } ref={ secondaryRef }>
					{ renderSlides() }
				</Splide>
			</div>
            {/* Basic Slider
            <Splide
                options={{
                    rewind: true,
                    perPage: 2,
                    perMove: 1,
                    gap: '1rem',
                }}
                onMoved={(splide, newIndex) => {console.log('moved', newIndex)}}
            >
                { createSlides().map(slide => (
                    <SplideSlide key={slide.src}>
                        <img src={slide.src} alt={slide.alt} />
                    </SplideSlide>
                ))}
            </Splide>
            <br/><br/>
            Autoplay Slider
            <Splide
                options={{
                    type: 'loop',
                    autoplay: true,
                    pauseOnHover: true,
                    resetProgress: false,
                    arrows: 'slider',
                    perPage: 1,
                    perMove: 1,
                    gap: '1rem',
                }}
                hasSliderWrapper
                hasAutoplayControls
                hasAutoplayProgress
                onMoved={(splide, newIndex) => {console.log('moved', newIndex)}}
            >
                { createSlides().map(slide => (
                    <SplideSlide key={slide.src}>
                        <img src={slide.src} alt={slide.alt} />
                    </SplideSlide>
                ))}
            </Splide> */}
        </>
    );
}

export default App;
