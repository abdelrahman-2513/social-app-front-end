import "./Loading.css";
import { BeatLoader } from "react-spinners";
function Loading({ loading }) {
  return (
    <div className="sweet-loading">
      <BeatLoader className="loading" color={"#123abc"} loading={loading} />
    </div>
  );
}

export default Loading;
