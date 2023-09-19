/* eslint-disable react-hooks/exhaustive-deps */
import { toast } from "react-toastify";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";

const useLoginLogic = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const validateUser = () => {
    if (
      userDetails.email === "user@example.com" &&
      userDetails.password === "1Password"
    ) {
      toast.success("Login successfully");
      localStorage.setItem("protected", true);
      navigate("/image-gallery");
    } else if (
      userDetails.email === "user@example.com" &&
      userDetails.password !== "1Password"
    ) {
      toast.error("Incorrect login credentials");
    } else {
      toast.error("User with this email doesn't exist");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      toast.success("Login successfully");
      navigate("/image-gallery");
      localStorage.setItem("protected", true);
    }
  }, [isAuthenticated]);

  return {
    userDetails,
    showPassword,
    validateUser,
    setUserDetails,
    setShowPassword,
    loginWithRedirect,
  };
};

export default useLoginLogic;
