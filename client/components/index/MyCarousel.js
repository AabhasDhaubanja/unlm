import { Carousel } from "react-bootstrap";

const MyCarousel = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={`/index_page/carousel.jpg`}
          alt="Unlm Offcial Image"
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default MyCarousel;
