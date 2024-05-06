import React, { useState } from "react";
import axios from "axios";
import "./share.scss";
import Gallery from "../../assets/8.png";
import Videos from "../../assets/9.png";

const Share = ({ userId }) => {
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [message, setMessage] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setImageUrl(objectUrl);
    }
  };

  const handleShareClick = async () => {
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("description", description);
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:8082/api/posts/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setMessage("Post uploaded successfully");
        setDescription("");
        setFile(null);
        setImageUrl(null);
      }
    } catch (error) {
      console.error("Error uploading post:", error);
      setMessage("Failed to upload post");
    }
  };

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <input
            type="text"
            placeholder="What's on your mind?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        {imageUrl && (
          <div className="preview">
            <img
              src={imageUrl}
              alt="Preview"
              style={{ width: "200px", height: "auto" }}
            />
          </div>
        )}
        {message && (
          <div
            className={
              message === "Post uploaded successfully"
                ? "success-message"
                : "error-message"
            }
          >
            {message}
          </div>
        )}
        <hr />
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <label htmlFor="file">
              <div className="item">
                <img src={Gallery} alt="Add Image" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <img src={Videos} alt="Add Video" />
              <span>Add Video</span>
            </div>
          </div>
          <div className="right">
            <button onClick={handleShareClick}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
