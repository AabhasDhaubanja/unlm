import { Carousel } from "react-bootstrap";

const MyCarousel = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={`${process.env.NEXT_PUBLIC_SERVER}/index/carousel_t3.png`}
          alt="Unlm Offcial Image"
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default MyCarousel;