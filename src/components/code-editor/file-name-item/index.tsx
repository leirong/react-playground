import classNames from "classnames";
import styles from "./index.module.scss";
import { PlaygroundContextProps } from "../../playground-context";
import { useEffect, useRef, useState } from "react";
import { MAIN_TSX_FILE_NAME } from "../../playground-context/default";
import { Popconfirm } from "antd";
export interface FileNameItemProps
  extends Pick<
    PlaygroundContextProps,
    "selectedFileName" | "setSelectedFileName" | "updateFileName" | "removeFile"
  > {
  fileName: string;
  index: number;
  fileNames: string[];
  isCreating: boolean;
  readonly: boolean;
}

const FileNameItem = ({
  index,
  fileNames,
  fileName,
  selectedFileName,
  setSelectedFileName,
  updateFileName,
  removeFile,
  isCreating,
  readonly,
}: FileNameItemProps) => {
  const [editing, setEditing] = useState(false);
  const [creating, setCreating] = useState(
    index === fileNames.length - 1 && isCreating
  );

  const inputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState(fileName);

  const handleDoubleCick = () => {
    setEditing(true);
    setTimeout(() => {
      inputRef?.current?.focus();
    }, 0);
  };

  useEffect(() => {
    if (creating) {
      inputRef?.current?.focus();
    }
  }, [creating]);
  const handleChange = (e: { target: { value: string } }) => {
    setName(e.target.value);
  };

  const handleBlur = () => {
    setEditing(false);
    setCreating(false);
    updateFileName(fileName, name);
    setSelectedFileName(name);
  };

  const onRemove = (
    e: React.MouseEvent<HTMLElement, MouseEvent> | undefined
  ) => {
    e?.stopPropagation();
    console.log("remove fileName", fileName);
    removeFile(fileName);
    setSelectedFileName(MAIN_TSX_FILE_NAME);
  };

  return editing || creating ? (
    <input
      className={classNames(styles["file-name-input"])}
      ref={inputRef}
      value={name}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  ) : (
    <>
      <span
        onDoubleClick={handleDoubleCick}
        onClick={() => setSelectedFileName(fileName)}
        className={classNames(styles["file-name-item"], {
          [styles.actived]: selectedFileName === fileName,
        })}
      >
        {fileName}
      </span>
      {!readonly && (
        <Popconfirm
          title="确认删除该文件吗？"
          okText="确定"
          cancelText="取消"
          onConfirm={onRemove}
        >
          <span style={{ marginLeft: 5, display: "flex" }}>
            <svg width="12" height="12" viewBox="0 0 24 24">
              <line stroke="#999" x1="18" y1="6" x2="6" y2="18"></line>
              <line stroke="#999" x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </span>
        </Popconfirm>
      )}
    </>
  );
};

export default FileNameItem;
