import React, { useState } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';
import './CarouselContainer.css'

const items = [
    {
      src: '/carousel/carousel1.jpg',
      altText: 'Slide 1',
    //   caption: 'Slide 1',
    //   header: 'Slide 1 Header',
      key: '1',
    },
    {
      src: '/carousel/carousel2.jpg',
      altText: 'Slide 2',
    //   caption: 'Slide 2',
    //   header: 'Slide 2 Header',
      key: '2'
    },
    {
      src: '/carousel/carousel3.jpg',
      altText: 'Slide 3',
    //   caption: 'Slide 3',
    //   header: 'Slide 3 Header',
      key: '3'
    },
    {
        src: '/carousel/carousel4.jpg',
        altText: 'Slide 4',
        // caption: 'Slide 4',
        // header: 'Slide 4 Header',
        key: '4'
    }
  ];

const CarouselContainer = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        className="carouselItem"
        key={item.src}
      >
        <img src={item.src} alt={item.altText} />
        <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
      </CarouselItem>
    );
  });

  return (
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
      className="carouselStyle"
    >
      <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
      {slides}
      <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
      <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
    </Carousel>
  );
}

export default CarouselContainer;