import "./styles/main.scss";
import "./styles/reset.css";
import Navbar from "./components/Navbar";
import Body from "./components/Body";
import Form from './components/AddTaskForm';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Body />
      <Form />
    </div>
  );
}

export default App;
