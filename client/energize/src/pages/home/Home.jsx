import Stories from "../../components/stories/Stories";
import Posts from "../../components/posts/Posts";
import Share from "../../components/share/Share";
import "./home.scss";

const Home = () => {
  
  const userId = "user001"; 

  return (
    <div className="home">
      <Stories />
      {/* Pass the userId as a prop to the Share component */}
      <Share userId={localStorage.getItem("username")} />
      <Posts />
    </div>
  );
};

export default Home;
