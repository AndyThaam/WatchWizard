import axios from "axios";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { img_300, noPicture } from '../config.js/config.js'
import styles from "./Carousel.module.css";

const handleDragStart = (e) => e.preventDefault();

const FCarousel = ({ id, media_type }) => {
  const [recommend, setRecommend] = useState([]);

  const items = recommend.map((c) => (
    <div className={styles.carouselItem}>
      <img
        src={c.poster_path ? `${img_300}/${c.poster_path}` : noPicture}
        alt={c?.title}
        onDragStart={handleDragStart}
        className={styles.FcarouselItem__img}
      />
      <b className={styles.carouselItem__txt}>{c?.title}</b>
    </div>
  ));

  const responsive = {
    0: {
      items: 3,
    },
    512: {
      items: 5,
    },
    1024: {
      items: 7,
    },
  };

  const fetchRecommend = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/recommendations?api_key=a89d091cb78954f6a26c74461aef889a`
    );


    setRecommend(data.results);
  };

  useEffect(() => {
    fetchRecommend();
    // eslint-disable-next-line
  }, []);

  return (
    <AliceCarousel
    className=''
      mouseTracking
      infinite
      disableDotsControls
      disableButtonsControls
      responsive={responsive}
      items={items}
      autoPlay
    />
  );
};

export default FCarousel;