import React from "react";
import { GridContextProvider, GridDropZone, GridItem } from "react-grid-dnd";
import "../styles/gallery.css";
import search from "../assets/search.svg";
import Loader from "./Loader";
import useGalleryLogic from "../hooks/useGalleryLogic";

const Gallery = () => {
  const {
    items,
    isLoading,
    searchKey,
    boxesPerRow,
    displayLoader,
    onChange,
    setSearchKey,
    handleLogout,
  } = useGalleryLogic();
  return (
    <div className="gallery-wrapper">
      <div className="gallery-header">
        <p>HNGx</p>
        <div className="user-section">
          <p>Hello, there! &#x1F44B;</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <div className="gallery-subheader">
        <p className="title">welcome to our cultural heritage gallery &#128248;</p>
        <div className="gallery-search">
          <input
            placeholder="Search by continent"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
          />
          <img src={search} alt="search icon" />
        </div>
        <p className="description">&#x1F680; You can arrange the items as you like using <span>drag</span> and <span>drop</span></p>
      </div>
      {isLoading || displayLoader ? (
        <Loader />
      ) : (
        <>
          {items.boxes.length > 0 ? (
            <GridContextProvider onChange={onChange}>
              <div className="container">
                <GridDropZone
                  className="dropzone left"
                  id="boxes"
                  boxesPerRow={boxesPerRow}
                  rowHeight={200}
                >
                  {items.boxes.map((item) => (
                    <GridItem key={item.url}>
                      <div className="grid-item">
                        <div
                          className="grid-item-content"
                          style={{
                            backgroundImage: `url(${item.url})`,
                            backgroundSize: "cover",
                          }}
                        >
                          <p className="image-tag">{item.tag}</p>
                        </div>
                      </div>
                    </GridItem>
                  ))}
                </GridDropZone>
              </div>
            </GridContextProvider>
          ) : (
            <div className="empty-state">
              <p>Nothing to display.</p>
              <p className="sad-face-emoji">&#128549;</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Gallery;
