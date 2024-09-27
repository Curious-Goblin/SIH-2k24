export default function TextArea({ placeholder, type, label, onChange }: { placeholder: string, type: string, label: string, onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) }) {
    return (
        <div className="pb-4">
            <div className="text-[#696F79] text-sm pb-2">
                {label}
            </div>
            <input
                placeholder={placeholder}
                type={type}
                onChange={onChange}
                className="shadow-md py-4 px-2 outline-none rounded-md w-full placeholder-[#654B3E] text-xs"
            />
        </div>
    )
}