import Editor from "../editor"
import FileNameList from "../file-name-list"
import styles from "./index.module.scss"

const CodeEditor = () => {
  const value = `export default function App() {
    return <div>xxx</div>
}`
  return (
    <div className={styles["code-editor"]}>
      <FileNameList />
      <Editor
        file={{
          name: "test.tsx",
          value,
          language: "typescript",
        }}
        onChange={(value) => console.log(value)}
        options={{
          fontSize: 14,
          scrollBeyondLastLine: false,
          minimap: {
            enabled: false,
          },
          scrollbar: {
            verticalScrollbarSize: 6,
            horizontalScrollbarSize: 6,
          },
        }}
      />
    </div>
  )
}
export default CodeEditor
