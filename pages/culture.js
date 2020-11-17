import { Container, Row, Col } from "react-bootstrap";

const Culture = () => {
  const cultures = [
    {
      url: "1.jpeg",
    },
    {
      url: "2.jpeg",
    },
    {
      url: "3.jpeg",
    },
    {
      url: "4.jpeg",
    },
  ];
  return (
    <Container className="py-5 my-5">
      <div className="cultureGridContainer">
        <div
          id="cultureGridText"
          className="cultureGridItem"
          style={{
            padding: 40,
          }}
        >
          <h2 className="pb-4">
            CULTURE OF <b>U</b>
          </h2>
          <span>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </span>
        </div>
        {cultures.map((culture) => (
          <div
            key={culture.url}
            className="cultureGridItem"
            style={{
              background: `url("${process.env.NEXT_PUBLIC_SERVER}/culture_page/${culture.url}")`,
              backgroundSize: "cover",
            }}
          ></div>
        ))}
      </div>
    </Container>
  );
};

export default Culture;
