import "./post.scss";
import { useState, useEffect, useContext } from "react";
import Comments from "../comments/Comments";
import { Link } from "react-router-dom";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import axios from "axios";
import { AuthContext } from "../../context/authContext";

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(11); // Default like count
  const [showOptions, setShowOptions] = useState(false); // State to manage visibility of options popup
  const { currentUser } = useContext(AuthContext);
  const [editMode, setEditMode] = useState(false); // State for edit mode
  const [editedDesc, setEditedDesc] = useState(post.desc); // State for edited description

  useEffect(() => {
    // Fetch comments
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/api/comments/${post.id}`);
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, [post.id]);

  useEffect(() => {
    // Check localStorage for user's like status
    const likedStatus = localStorage.getItem(`post_${post.id}_liked`);
    if (likedStatus === "true") {
      setLiked(true);
      setLikeCount(12); // Set like count to 12 if liked
    } else {
      setLiked(false);
      setLikeCount(11); // Set like count to 11 if not liked
    }
  }, [post.id]);

  const handleLikeClick = () => {
    // Toggle like status
    const newLiked = !liked;
    setLiked(newLiked);
    // Update localStorage with new like status
    localStorage.setItem(`post_${post.id}_liked`, newLiked.toString());
    // Update like count
    setLikeCount(newLiked ? 12 : 11); // Toggle between 11 and 12
  };

  const handleCommentClick = () => {
    setCommentOpen(!commentOpen);
  };

  const handleEditPost = async () => {    
    try {
      const t=await axios.put(`http://localhost:8082/api/posts/${post.id}`, { description: editedDesc });  
      console.log(t);    
      setEditMode(false); 
    } catch (error) {
      console.error("Error editing post:", error);      
    }
  };
  

  const handleDeletePost = () => {
    // Handle post deletion. still under development
  };

  const toggleOptionsPopup = () => {
    setShowOptions(!showOptions);
  };

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={post.profilePic} alt="" />
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.name}</span>
              </Link>
              <span className="date">{post.date}</span>
            </div>
          </div>
          {post.name === localStorage.getItem("username") && (
            <div className="more-options" onClick={toggleOptionsPopup}>
              <MoreHorizIcon style={{ cursor: "pointer" }} />
              {showOptions && (
                <div className="options-popup">
                  {editMode ? (
                    <div>
                      <button onClick={handleEditPost}>Save</button>
                      <button onClick={() => setEditMode(false)}>Cancel</button>
                    </div>
                  ) : (
                    <div onClick={() => setEditMode(true)} style={{ cursor: "pointer" }}>
                      Edit
                    </div>
                  )}
                  <hr />
                  <div onClick={handleDeletePost} style={{ cursor: "pointer" }}>Delete</div>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="content">
          {editMode ? (
            <textarea
              className="edit-textarea"
              value={editedDesc}
              onChange={(e) => setEditedDesc(e.target.value)}
            />
          ) : (
            <p>{post.desc}</p>
          )}
          <div className="media-container">
            {post.type === "video" ? (
              <video controls className="media">
                <source src={post.media} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img src={post.media} alt="" className="media" />
            )}
          </div>
        </div>
        <div className="info">
          <div className="item" onClick={handleLikeClick}>
            {liked ? <FavoriteOutlinedIcon style={{ color: "red" }} /> : <FavoriteBorderOutlinedIcon />}
            {likeCount} Likes
          </div>
          <div className="item" onClick={handleCommentClick}>
            <TextsmsOutlinedIcon />
            {comments.length} Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentOpen && <Comments postId={post.id} />}
      </div>
    </div>
  );
};

export default Post;
