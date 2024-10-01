import AchievmentComponent from "./Achivements";
import OtherUsers from "./OtherUsersComponent";
import ReminderComponent from "./ReminderComonent";

export default function RightBar(){
    return (
        <div className="flex-grow p-4 xl:p-6 2xl:p-8 rounded-md shadow-xl" style={{width:"15%"}}>
           <OtherUsers/>
           <AchievmentComponent/>
           <ReminderComponent/>
        </div>
    )
}