const DownloadButton = ({ text, onClick }) => {
  const buttonStyle = {
    padding: "10px",
    margin: "10px",
    backgroundColor: "#4CAF50", // Green color, you can change it to your preferred color
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  };
  return (
    <button style={buttonStyle} onClick={onClick}>
      {text}
    </button>
  );
};

export default DownloadButton;
