import AssemblyLine from "./AssemblyLine";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <AssemblyLine
        stages={["Idea", "Development", "Process", "Manufacture"]}
      />
    </div>
  );
}
