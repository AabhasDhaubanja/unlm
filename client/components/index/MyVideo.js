const MyVideo = () => {
  return (
    <div className="d-flex justify-content-center">
      <video
        id="unlmVideo"
        className="d-block"
        style={{ width: "100vw", border: "none", outline: "none" }}
        loop
        autoPlay
        muted
        controls
      >
        <source src={`${process.env.NEXT_PUBLIC_SERVER}/index/unlm.mp4`} />
      </video>
    </div>
  );
};

export default MyVideo;
