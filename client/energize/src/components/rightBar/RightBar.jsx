import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./rightBar.scss";

const RightBar = () => {
  const [users, setUsers] = useState([]);
  const [followingUsers, setFollowingUsers] = useState(new Set());

  useEffect(() => {
    axios.get('http://localhost:3060/api/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });

    const storedFollowing = JSON.parse(localStorage.getItem('followingUsers'));
    if (storedFollowing) {
      setFollowingUsers(new Set(storedFollowing));
    }
  }, []); 

  const handleFollow = (followerId, followeeId) => {
    axios.post('http://localhost:3060/api/follow/follow-user', { followerId, followeeId })
      .then(response => {
        console.log('Follow successful:', response);
        const updatedFollowing = new Set([...followingUsers, followeeId]);
        setFollowingUsers(updatedFollowing);
        localStorage.setItem('followingUsers', JSON.stringify([...updatedFollowing]));
      })
      .catch(error => {
        console.error('Error following user:', error);
      });
  };

  const handleUnfollow = (followerId, followeeId) => {
    axios.post('http://localhost:3060/api/follow/unfollow-user', { followerId, followeeId })
      .then(response => {
        console.log('Unfollow successful:', response);
        const updatedFollowing = new Set(followingUsers);
        updatedFollowing.delete(followeeId);
        setFollowingUsers(updatedFollowing);
        localStorage.setItem('followingUsers', JSON.stringify([...updatedFollowing]));
      })
      .catch(error => {
        console.error('Error unfollowing user:', error);
      });
  };

  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <span>Friend Suggestions For You</span>
          {users.map(user => (
            <div className="user" key={user.id}>
              <div className="userInfo">
                <img
                  src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                />
                <span>{user.username}</span>
              </div>
              <div className="buttons">
                {followingUsers.has(user.id) ? (
                  <button>Followed</button>
                ) : (
                  <button onClick={() => handleFollow('loggedInUserId', user.id)}>Follow</button>
                )}
                <button onClick={() => handleUnfollow('loggedInUserId', user.id)}>Unfollow</button>
              </div>
            </div>
          ))}
        </div>
        {/* Latest activities */}
      </div>
    </div>
  );
};

export default RightBar;
