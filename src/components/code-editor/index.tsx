import { usePlayground } from "../playground-context";
import Editor from "./editor";
import FileNameList from "./file-name-list";
import { debounce } from "lodash-es";
import styles from "./index.module.scss";

const CodeEditor = () => {
  const { files, setFiles, selectedFileName, theme } = usePlayground();
  const file = files[selectedFileName];

  const handleChange = (value?: string) => {
    setFiles({
      ...files,
      [selectedFileName]: {
        ...file,
        value,
      },
    });
  };
  return (
    <div className={styles["code-editor"]}>
      <FileNameList />
      <Editor
        file={file}
        onChange={debounce(handleChange, 500)}
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
          theme: `vs-${theme}`,
        }}
      />
    </div>
  );
};
export default CodeEditor;
