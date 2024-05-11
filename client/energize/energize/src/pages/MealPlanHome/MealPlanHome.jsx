import Stories from "../../components/stories/Stories"
import MealPost from "../../components/mealPost/MealPost"
import Share from "../../components/share/Share"
import "./mealPlanHome.scss"
import MealPlanShare from "../../components/mealPlanShare/mealPlanShare"



const MealPlanHome = () => {
    return (
      <div className="MealPlanhome">
        <Stories/>
<MealPlanShare/>
        <MealPost/>
       
      </div>
    )
  }
  
  export default MealPlanHome


