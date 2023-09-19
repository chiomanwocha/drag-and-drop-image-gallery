/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Gallery from "./Gallery";
import NotFound from "./NotFound";

const ProtectedGallery = () => {
  const navigate = useNavigate();
  const storedAuthentication = localStorage.getItem('protected')
  const isAuthenticated = Boolean(storedAuthentication)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, []);

  return isAuthenticated ? <Gallery /> : <NotFound />;
};

export default ProtectedGallery;
