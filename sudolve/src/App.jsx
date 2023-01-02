import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navbar from "./components/Navbar";
import PlayArea from "./components/PlayArea";

function App() {
  return (
    <div className="App">
      <Navbar />
      <PlayArea />
    </div>
  );
}

export default App;
