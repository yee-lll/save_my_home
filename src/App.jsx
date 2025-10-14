import React, { useState } from "react";
import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";
import ChatWelcome from "./components/Chat_welcome.jsx";
import ChatInput from "./components/Chat_input.jsx";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app">
      <Header onToggleSidebar={() => setSidebarOpen((v) => !v)} />
      <div className="main">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <section className="chat">
          <ChatWelcome />
          <ChatInput />
        </section>
      </div>
    </div>
  );
}
