import { useNavigate } from "react-router-dom";
import "../styles/notfound.css";
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="container-wrapper">
      <p>Page not found</p>
      <p className="redirect" onClick={() => navigate("/image-gallery")}>
        Go to home
      </p>
    </div>
  );
};

export default NotFound;
