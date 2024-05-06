import { useContext } from "react";
import "./stories.scss"
import { AuthContext } from "../../context/authContext"
import fes from "./asset/workout.jpg";
import play from "./asset/play.jpeg";
import run from "./asset/run.jpg";
import jim from "./asset/interior.jpg";
import work from "./asset/jim.jpg";

const Stories = ({pos}) => {

  const {currentUser} = useContext(AuthContext)

  //TEMPORARY
  const stories = [
    {
     
      img: play,
    },
    {
     
      img: fes,
    },
    {
     
      img: run,
    },
    {
     
      img: jim,
    },
    {
     
      img: work,
    },
  ];

  return (
    <div className="stories">
      
      {stories.map(story=>(
        <div className="story" key={story.id}>
          <img src={story.img} alt="" />
          <span>{story.name}</span>
        </div>
      ))}
    </div>
  )
}

export default Stories