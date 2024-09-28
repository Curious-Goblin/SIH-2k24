import SearchSvg from "../svg/searchSvg";

export default function SearchBarComponent() {
    return (
        <div className="flex items-center shadow-lg rounded-lg my-3 px-5 py-4" style={{ width: '65%' }}>
            <div className="mr-4">
                <SearchSvg />
            </div>
            <input
                type="text"
                placeholder="Search Topic"
                className="flex-grow outline-none"
            />
        </div>
    );
}
