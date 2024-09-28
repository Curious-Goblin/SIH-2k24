import Button from "./button";

const UserDetails = ["sourabh", "aryan", "sanket", "pranav", "rohit", "nishikant"];

function getRandomLightColor() {
    const colors = [
        "#FDE68A", "#FCD34D", "#FCA5A5", "#F9A8D4", "#A5B4FC", "#6EE7B7", "#A7F3D0", "#D1FAE5", "#E5E7EB"
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

export default function OtherUsers() {
    return (
        <div className="">
            <div className="text-[#654B3E] text-lg font-bold mb-4">
                Other Users Online
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {UserDetails.map((user, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-center w-16 h-16 rounded-full text-white text-2xl font-semibold"
                        style={{ backgroundColor: getRandomLightColor() }}
                    >
                        {user[0].toUpperCase()}
                    </div>
                ))}
            </div>
            <div className="flex justify-center">
            <Button
                name="Combat"
                style="border-2 border-red-900 inline-flex justify-center text-xl mt-7 py-3 px-12 font-medium text-[#654B3E] rounded-md"
            />
            </div>
        </div>
    );
}
