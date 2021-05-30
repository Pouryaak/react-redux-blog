import "./styles/App.css";
import Homepage from "./components/Homepage";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import { selectSignedIn } from "./features/userSlice";

function App() {
  const isSignedIn = useSelector(selectSignedIn);

  return (
    <div className="app">
      <Navbar />
      <Homepage />
    </div>
  );
}

export default App;
