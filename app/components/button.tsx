export default function Button({ name, onClick, style }: { name: string, style: string, onClick: (e: any) => Promise<void> }) {
    return (
        <div className={style}>
            <button onClick={onClick}>{name}</button>
        </div>
    )
}
