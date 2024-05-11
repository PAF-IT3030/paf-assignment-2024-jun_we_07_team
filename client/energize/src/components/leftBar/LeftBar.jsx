import "./leftBar.scss";
import Friends from "../../assets/followers.png";
import Groups from "../../assets/workout.png";
import Market from "../../assets/meal.png";
import Watch from "../../assets/recipe.png";
import Memories from "../../assets/nutrition.png";
import Events from "../../assets/calander.png";
import Gaming from "../../assets/7.png";
import Gallery from "../../assets/8.png";
import Videos from "../../assets/9.png";
import Messages from "../../assets/10.png";
import Tutorials from "../../assets/11.png";
import Courses from "../../assets/calander.png";
import Fund from "../../assets/13.png";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

const LeftBar = () => {

  const { currentUser } = useContext(AuthContext);

  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <div className="user">
            <img
              src={currentUser.profilePic}
              alt=""
            />
            <span>{currentUser.name}</span>
          </div>
          <Link to="/workout" className="item">
          <div className="item">
            <img src={Groups} alt="" />
            <span>Workout Plan</span>
          </div>
          </Link>

          <Link to="/mealPlanHome" className="item">
            <img src={Market} alt="" />
            <span>Meal Plan</span>
          </Link>
          <div className="item">
            <img src={Watch} alt="" />
            <span>Recipes</span>
          </div>
          <div className="item">
            <img src={Memories} alt="" />
            <span>Nutritional</span>
          </div>
        </div>
        <hr />
       
      </div>
    </div>
  );
};

export default LeftBar;