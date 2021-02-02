const MyVideo = () => {
  return (
    <div className="d-flex justify-content-center py-5 my-5">
      <video
        id="unlmVideo"
        className="d-block"
        style={{ width: "100vw", border: "none", outline: "none" }}
        loop
        autoPlay
        muted
        controls
      >
        <source src={`/index_page/unlm.mp4`} />
      </video>
    </div>
  );
};

export default MyVideo;
