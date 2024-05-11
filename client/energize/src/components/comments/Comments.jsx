// Comments.jsx

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import ConfirmationModal from "./ConfirmationModal";
import { AuthContext } from "../../context/authContext";
import "./comments.scss";

const Comments = ({ postId }) => {
  const { currentUser } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedCommentId, setEditedCommentId] = useState(null);
  const [editedCommentText, setEditedCommentText] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/api/comments/${postId}`);
        setComments(response.data); // Assuming the response contains the comments array directly
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, [postId]);

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await axios.post(`http://localhost:8082/api/comments/${postId}`, {
        uid: localStorage.getItem("userId"),          
        uname: localStorage.getItem("username"),          
        text: newCommentText,     
      });
     
      setComments([...comments, response.data]); 
      setNewCommentText(""); 
    } catch (error) {
      console.error("Error submitting comment:", error);
      setError("Failed to submit comment");
    }
  };

  const handleEditComment = (commentId, initialText) => {
    setEditedCommentId(commentId);
    setEditedCommentText(initialText);
    setEditMode(true);
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const comment = comments.find((comment) => comment.id === commentId);
      if (comment.uid === localStorage.getItem("userId")) {
        setCommentToDelete(commentId);
        setShowModal(true);
      } else {
        // Display an error message or handle unauthorized deletion here
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      setError("Failed to delete comment");
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:8082/api/comments/${commentToDelete}/${localStorage.getItem("userId")}`);
      setComments(comments.filter((comment) => comment.id !== commentToDelete));
      setShowModal(false);
    } catch (error) {
      console.error("Error deleting comment:", error);
      setError("Failed to delete comment");
    }
  };

  const handleCancelDelete = () => {
    setShowModal(false);
  };

  const handleConfirmEdit = async () => {
    try {
      let updatedComment = null;
      
      if (!editedCommentId) {
        // Creating a new comment
        const response = await axios.post(`http://localhost:8082/api/comments/${postId}`, {
          uid: localStorage.getItem("userId"),
          uname: localStorage.getItem("username"),
          text: editedCommentText,
        });
        updatedComment = response.data;
        setComments([...comments, updatedComment]); // Add the new comment to the existing comments
      } else {
        // Updating an existing comment
        const response = await axios.put(`http://localhost:8082/api/comments/${editedCommentId}/${localStorage.getItem("userId")}`, {
          uid: localStorage.getItem("userId"),
          uname: localStorage.getItem("username"),
          text: editedCommentText,
        });
        updatedComment = response.data;
        setComments(comments.map(comment => (comment.id === updatedComment.id ? updatedComment : comment))); // Update the comments state by replacing the edited comment with the updated one
      }
      
      setEditMode(false);
      setEditedCommentId(null);
      setEditedCommentText("");
    } catch (error) {
      console.error("Error editing comment:", error);
      setError("Failed to edit comment");
    }
  };
  
  

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedCommentId(null);
    setEditedCommentText("");
  };

  return (
    <div className="comments">
      <form className="write" onSubmit={handleCommentSubmit}>
        <img src={localStorage.getItem("profile")} alt="" />
        
        <input
          type="text"
          value={newCommentText}
          onChange={(event) => setNewCommentText(event.target.value)}
          placeholder={`${localStorage.getItem("username")} Write a comment`}

        />
        <button type="submit">Send</button>
      </form>
      {comments.map((comment, index) => (
        <div key={comment.id}>
          <div className="comment">
          <img
              src={currentUser.profilePic}
              alt=""
            />
            <div className="info">
              <span>{comment.uname}</span>
              {editMode && editedCommentId === comment.id ? (
                <input
                  type="text"
                  value={editedCommentText}
                  onChange={(event) => setEditedCommentText(event.target.value)}
                />
              ) : (
                <p>{comment.text}</p>
              )}
            </div>
            <span className="date">{comment.date}</span>
            {comment.uid === localStorage.getItem("userId") && (
              <div className="buttons">
                {!editMode || (editMode && editedCommentId !== comment.id) ? (
                  <span onClick={() => handleEditComment(comment.id, comment.text)}>Edit</span>
                ) : (
                  <>
                    <span onClick={handleConfirmEdit}>Save</span>
                    <span onClick={handleCancelEdit}>Cancel</span>
                  </>
                )}
                <span onClick={() => handleDeleteComment(comment.id)}>Delete</span>
              </div>
            )}
          </div>
        </div>
      ))}
      {showModal && (
        <ConfirmationModal
          message="Are you sure you want to delete this comment?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default Comments;
