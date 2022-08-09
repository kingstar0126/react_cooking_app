import spinner from "../../assets/spinner.gif";

function Spinner() {
  return (
    <div>
      <img
        width={180}
        src={spinner}
        alt="Loading..."
      />
    </div>
  );
}

export default Spinner;
