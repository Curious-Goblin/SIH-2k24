import SearchSvg from "../svg/searchSvg";

export default function SearchBarComponent() {
    return (
        <div className="flex items-center px-3 py-2 md:px-5 md:py-4 w-full md:w-3/4">
            <div className="mr-2">
                <SearchSvg />
            </div>
            <input
                type="text"
                placeholder="Search Topic"
                className="flex-grow outline-none text-sm md:text-base"
            />
        </div>
    );
}
