import "./DarkMode.css";
import { Bulb } from "react-flaticons";
function DarkMode() {
  const handleDarkMode = () => {
    document.querySelector("body").classList.toggle("dark-mode");
  };
  return (
    <>
      <Bulb className="dark-mode-lamp" onClick={handleDarkMode} />
    </>
  );
}

export default DarkMode;
