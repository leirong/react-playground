import { Allotment } from "allotment";
import "allotment/dist/style.css";
import { Header, CodeEditor, Preview, PlaygroundProvider } from "./components";
import "./App.css";

function App() {
  return (
    <div style={{ height: "100vh" }}>
      <PlaygroundProvider>
        <Header />
        <Allotment defaultSizes={[100, 100]}>
          <Allotment.Pane minSize={0}>
            <CodeEditor />
          </Allotment.Pane>
          <Allotment.Pane minSize={0}>
            <Preview />
          </Allotment.Pane>
        </Allotment>
      </PlaygroundProvider>
    </div>
  );
}

export default App;
