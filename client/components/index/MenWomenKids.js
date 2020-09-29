import { Container, Row, Col } from "react-bootstrap";

const MenWomenKids = () => {
  let genders = [
    {
      name: (
        <>
          <Row className="d-flex justify-content-center">
            <h1>Men</h1>
          </Row>
        </>
      ),
      image: "/index/men.jpg",
      key: "men",
    },
    {
      name: (
        <>
          <Row className="d-flex justify-content-center">
            <h1>Women</h1>
          </Row>
        </>
      ),
      image: "/index/women.jpeg",
      key: "women",
    },
  ];

  return (
    <Container className="p-5 my-5" fluid>
      <Row>
        {genders.map((gender) => (
          <Col
            key={gender.key}
            xs={6}
            className="d-flex justify-content-center"
          >
            <div
              style={{
                background: `url("${process.env.NEXT_PUBLIC_SERVER}${gender.image}")`,
                backgroundSize: "cover",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                height: "600px",
              }}
            >
              <div>
                <span style={{ fontWeight: "900", textTransform: "uppercase" }}>
                  {gender.name}
                </span>
                <Row className="d-flex justify-content-center">SHOP NOW</Row>
              </div>
            </div>
          </Col>
        ))}
        {/* <div className="display-1">SHOP NOW</div> */}
      </Row>
    </Container>
  );
};

export default MenWomenKids;
