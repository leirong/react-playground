import { Allotment } from "allotment"
import "allotment/dist/style.css"
import { Header, CodeEditor, Preview } from "./components"
import "./App.scss"

function App() {
  return (
    <div style={{ height: "100vh" }}>
      <Header />
      <Allotment defaultSizes={[100, 100]}>
        <Allotment.Pane minSize={0}>
          <CodeEditor />
        </Allotment.Pane>
        <Allotment.Pane minSize={0}>
          <Preview />
        </Allotment.Pane>
      </Allotment>
    </div>
  )
}

export default App