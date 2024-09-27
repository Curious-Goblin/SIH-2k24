export default function GoogleButton({ text, onClick }: { text: string, onClick: (e: any) => Promise<void> }) {
    return (
        <button onClick={onClick} className="rounded-md shadow-md w-full py-3">{text}</button>
    )
}