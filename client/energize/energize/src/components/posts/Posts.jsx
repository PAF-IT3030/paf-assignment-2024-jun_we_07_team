import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment"; // Import moment library for date formatting
import Post from "../post/Post";
import "./posts.scss";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:8082/api/posts");
        const sortedPosts = response.data.posts.sort((a, b) => new Date(b.date) - new Date(a.date));
        setPosts(sortedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="posts">
      {posts.map((post) => (
        <Post
          key={post.id}
          post={{
            id: post.id,
            name: post.userId, // Assuming userId represents the name
            profilePic: "", // Add the profile pic URL if available
            desc: post.description,
            media: post.url,
            type: post.url.endsWith(".mp4") ? "video" : "image", // Check if the URL ends with .mp4 to determine if it's a video
            date: moment(post.date).fromNow(), // Format the date using moment
          }}
        />
      ))}
    </div>
  );
};

export default Posts;
