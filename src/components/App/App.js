import "./App.scss";
import { React, useState } from "react";
import { Route, Routes, Link } from "react-router-dom";
import About from "../About/About";
import Home from "../Home/Home";
import { DndContext } from "@dnd-kit/core";
import { Draggable } from "./Draggable";
import { Droppable } from "./Droppable";

const App = () => {
  const [isDropped, setIsDropped] = useState(false);
  const draggableMarkup = <Draggable>Drag me</Draggable>;

  return (
    <div className="App">
      <div className="header">
        <Link to="/">
          <div className="wrLogo">WordReach</div>
        </Link>
      </div>

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <div className="footer">
        <Link to="/about">About</Link>
      </div>
      <DndContext onDragEnd={handleDragEnd}>
        {!isDropped ? draggableMarkup : null}
        <Droppable>{isDropped ? draggableMarkup : "Drop here"}</Droppable>
      </DndContext>
    </div>
  );

  function handleDragEnd(event) {
    if (event.over && event.over.id === "droppable") {
      setIsDropped(true);
    }
  }
};

export default App;
