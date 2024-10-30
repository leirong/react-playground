import classNames from "classnames";
import styles from "./index.module.scss";
import { PlaygroundContextProps } from "../../playground-context";
export interface FileNameItemProps
  extends Pick<
    PlaygroundContextProps,
    "selectedFileName" | "setSelectedFileName"
  > {
  fileName: string;
}

const FileNameItem = ({
  fileName,
  selectedFileName,
  setSelectedFileName,
}: FileNameItemProps) => {
  return (
    <span
      onClick={() => setSelectedFileName(fileName)}
      className={classNames(styles["file-name-item"], {
        [styles.actived]: selectedFileName === fileName,
      })}
    >
      {fileName}
    </span>
  );
};

export default FileNameItem;
