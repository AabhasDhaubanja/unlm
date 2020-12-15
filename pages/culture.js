import { Container } from "react-bootstrap";

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
            <p>Land of Buddha. Land of Culture.</p>

            <p>
              The idea for UNML came from the symbol of unalome. It represents
              the path to enlightenment in the Buddhist culture. Life is full of
              twists and turns and that’s what the spirals in the symbol
              symbolise, and the straight line is the moment one reaches peace.
            </p>

            <p>
              Hence the idea for UNLM was born- to connect people through the
              symbol of unalome- through art of lifestyle- wherein one finds
              peace and harmony in chaos- the art of finding comfort.
            </p>

            <p>
              UNML is all about representing lifestyle and culture through
              apparel and accessories.
            </p>
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
