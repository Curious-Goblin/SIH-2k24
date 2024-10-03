export default function Button({ name, onClick, style }: { name: string, style: string, onClick?: (e: any) => Promise<void> | void }) {
    return (
        <div onClick={onClick} className={style}>
            <button >{name}</button>
        </div>
    )
}
