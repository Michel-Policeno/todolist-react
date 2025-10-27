import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const TasksPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
       <Header onSearch={setSearchQuery} />
      <main className="tasks-container">
       <h2>Suas Tarefas</h2>
        <p>Filtro: {searchQuery || "Nenhum"}</p>
      </main>
      <Footer />
    </>
   );
};

export default TasksPage;