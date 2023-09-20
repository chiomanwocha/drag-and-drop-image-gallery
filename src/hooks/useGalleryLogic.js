import { useEffect, useState } from "react";
import { swap, move } from "react-grid-dnd";
import { useMediaQuery } from "react-responsive";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";
import galleryDetails from "../mock";
import { useNavigate } from "react-router-dom";

const useGalleryLogic = () => {
  const { isLoading } = useAuth0();
  const [displayLoader, setDisplayLoader] = useState(true);
  const [searchKey, setSearchKey] = useState("");

  const storedUserType = localStorage.getItem("user-type");

  const [items, setItems] = useState({ boxes: galleryDetails });

  useEffect(() => {
    const searchResult = galleryDetails.filter((item) =>
      item.tag.includes(searchKey.toLowerCase())
    );
    setItems({ boxes: searchResult });

    const timeoutId = setTimeout(() => {
      setDisplayLoader(false);
    }, 1500);
    return () => clearTimeout(timeoutId);
  }, [searchKey, storedUserType]);

  function onChange(sourceId, sourceIndex, targetIndex, targetId) {
    if (targetId) {
      const result = move(
        items[sourceId],
        items[targetId],
        sourceIndex,
        targetIndex
      );
      return setItems({
        ...items,
        [sourceId]: result[0],
        [targetId]: result[1],
      });
    }

    const result = swap(items[sourceId], sourceIndex, targetIndex);
    return setItems({
      ...items,
      [sourceId]: result,
    });
  }

  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isDesktop = useMediaQuery({ minWidth: 1024 });

  let boxesPerRow;
  if (isMobile) {
    boxesPerRow = 2;
  } else if (isTablet) {
    boxesPerRow = 3;
  } else if (isDesktop) {
    boxesPerRow = 4;
  }

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/')
    toast.success("Logout succesfully");
    localStorage.removeItem("user-type");
    localStorage.removeItem("protected");
  };

  const onGuestDrag = () => {
    toast.info("Login to drag and drop");
  };

  return {
    items,
    userType: storedUserType,
    isLoading,
    searchKey,
    boxesPerRow,
    displayLoader,
    onChange,
    onGuestDrag,
    setSearchKey,
    handleLogout,
  };
};

export default useGalleryLogic;
