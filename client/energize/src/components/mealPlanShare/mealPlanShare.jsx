
import { Link } from "react-router-dom";

import Gallery from "../../assets/8.png";
import Videos from "../../assets/9.png";
import Friend from "../../assets/friend.png";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import "./mealPlanShare.scss";
import MyMealPost from "../myMealPost/MyMealPost";

const MealPlanShare = () => {

  const {currentUser} = useContext(AuthContext)
  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <img
            src={currentUser.profilePic}
            alt=""
          />
          <input type="text" placeholder={`What's on your mind ${currentUser.name}?`} />
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input type="file" id="file" style={{display:"none"}} />
            <label htmlFor="file">
            <Link to="/meal-plan/add" className="item">
              <img src={Gallery} alt="" />
              <span>Add MealPlan</span>
            </Link>
            </label>
            <div className="item">
              <img src={Videos} alt="" />
              <span>Add Video</span>
            </div>
            <Link to="/MyMealPost" className="item">
            <div className="item">
              <img src={Videos} alt="" />
              <span>My Meal Plan</span>
            </div>
            </Link>
          </div>
          <div className="right">
            <button>MealPlanShare</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealPlanShare;
