import { useEffect, useState } from "react";
import { usePlayground } from "../../playground-context";
import FileNameItem from "../file-name-item";
import styles from "./index.module.scss";

export default function FileNameList() {
  const {
    files,
    selectedFileName,
    setSelectedFileName,
    updateFileName,
    addFile,
    removeFile,
  } = usePlayground();

  const [fileNames, setFileNames] = useState<string[]>([]);

  const [creating, setCreating] = useState(false);

  useEffect(() => {
    setFileNames(Object.keys(files));
  }, [files]);

  const handleAddFile = () => {
    const newFileName = `Com${fileNames.length + 1}.tsx`;
    addFile(newFileName);
    setCreating(true);
  };

  return (
    <div className={styles["file-name-list"]}>
      {fileNames.map((fileName, index) => {
        return (
          <FileNameItem
            index={index}
            fileNames={fileNames}
            key={fileName}
            fileName={fileName}
            selectedFileName={selectedFileName}
            setSelectedFileName={setSelectedFileName}
            updateFileName={updateFileName}
            isCreating={creating}
            removeFile={removeFile}
            readonly={files[fileName]?.readonly}
          />
        );
      })}
      <span className={styles["add-file"]} onClick={handleAddFile}>
        +
      </span>
    </div>
  );
}
