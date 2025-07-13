import { useState } from "react";

export default function Accordion({ title, content }: {title: string; content: string }) {
    const [open, setOpen] = useState(false);
    return (
        <div>
            <h2 onClick={() => setOpen(!open)}>{title} <span>{open ? '▲' : '▼'}</span></h2>
            {open && <p>{content}</p>}
        </div>
    );
}