const Loading = () => {
  return (
    <div
      style={{
        height: "60vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="spinner-border text-dark" role="status">
        <span className="visually-hidden"> </span>
      </div>
    </div>
  );
};

export default Loading;
