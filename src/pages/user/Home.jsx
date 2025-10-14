import React, { useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import ChatWelcome from "../../components/ChatWelcome";
import ChatInput from "../../components/ChatInput";

export default function Home() {
    const [open, setOpen] = useState(false);


    return (
        <>
            <Header onToggleSidebar={() => setOpen(v => !v)} />
            <main className="app-main">
                <Sidebar open={open} onClose={() => setOpen(false)} />
                <section className="chat">
                    <ChatWelcome />
                    <ChatInput />
                </section>

                <div className={`user-overlay ${open ? "show" : ""}`} onClick={() => setOpen(false)} />
            </main>
        </>
    );
}
