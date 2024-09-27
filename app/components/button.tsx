export default function Button({ name, onClick }: { name: string, onClick: (e: any) => Promise<void> }) {
    return (
        <div className="rounded-md bg-[#654B3E] text-white font-medium flex justify-center py-3">
            <button onClick={onClick}>{name}</button>
        </div>
    )
}
