import "./Loading.css";
import { BeatLoader } from "react-spinners";
function Loading({ loading, className }) {
  return (
    <div className="sweet-loading">
      <BeatLoader
        className={`loading ${className}`}
        color={"#123abc"}
        loading={loading}
      />
    </div>
  );
}

export default Loading;
