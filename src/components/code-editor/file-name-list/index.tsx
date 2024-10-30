import { useEffect, useState } from "react";
import { usePlayground } from "../../playground-context";
import FileNameItem from "../file-name-item";
import styles from "./index.module.scss";

export default function FileNameList() {
  const { files, selectedFileName, setSelectedFileName } = usePlayground();

  const [fileNames, setFileNames] = useState<string[]>([]);

  useEffect(() => {
    setFileNames(Object.keys(files));
  }, [files]);

  return (
    <div className={styles["file-name-list"]}>
      {fileNames.map((fileName) => {
        return (
          <FileNameItem
            key={fileName}
            fileName={fileName}
            selectedFileName={selectedFileName}
            setSelectedFileName={setSelectedFileName}
          />
        );
      })}
    </div>
  );
}
