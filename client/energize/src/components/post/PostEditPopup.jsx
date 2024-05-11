// PostEditPopup.jsx
import React, { useState } from "react";
import axios from "axios";

const PostEditPopup = ({ postId, initialDesc, onCancel, onSave }) => {
  const [editedDesc, setEditedDesc] = useState(initialDesc);

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:8082/api/posts/${postId}`, { desc: editedDesc });
      onSave(editedDesc);
    } catch (error) {
      console.error("Error editing post:", error);
      
    }
  };

  return (
    <div className="post-edit-popup">
      <textarea
        className="edit-textarea"
        value={editedDesc}
        onChange={(e) => setEditedDesc(e.target.value)}
      />
      <div className="edit-popup-buttons">
        <button onClick={handleSave}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default PostEditPopup;
