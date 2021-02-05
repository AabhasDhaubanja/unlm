const MenWomenKids = () => {
  let genders = [
    {
      name: (
        <>
          <div className="row justify-content-center">
            <h1>Men</h1>
          </div>
        </>
      ),
      image: "/index/men.jpg",
      key: "men",
    },
    {
      name: (
        <>
          <div className="row justify-content-center">
            <h1>Women</h1>
          </div>
        </>
      ),
      image: "/index/women.jpeg",
      key: "women",
    },
  ];

  return (
    <div className="container-fluid p-5 my-5">
      <div>
        {genders.map((gender) => (
          <div key={gender.key} className="col-6 d-flex justify-content-center">
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
                <div className="row justify-content-center">SHOP NOW</div>
              </div>
            </div>
          </div>
        ))}
        {/* <div className="display-1">SHOP NOW</div> */}
      </div>
    </div>
  );
};

export default MenWomenKids;
