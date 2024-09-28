import AchievmentComponent from "./Achivements";
import OtherUsers from "./OtherUsersComponent";
import ReminderComponent from "./ReminderComonent";

export default function RightBar(){
    return (
        <div className="w-full h-full flex-grow p-8 rounded-md shadow-xl">
           <OtherUsers/>
           <AchievmentComponent/>
           <ReminderComponent/>
        </div>
    )
}