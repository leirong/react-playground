import { createContext, PropsWithChildren, useContext, useState } from "react";
import { getLanguageByFileName } from "../../utils/file";
import { defaultFileName, defaultFiles } from "./default";

export interface File {
  name: string;
  value?: string;
  language: string;
  readonly: boolean;
}

export interface Files {
  [key: string]: File;
}

export interface PlaygroundContextProps {
  files: Files;
  setFiles: (files: Files) => void;
  addFile: (fileName: string) => void;
  removeFile: (fileName: string) => void;
  updateFileName: (prevFileName: string, nextFileName: string) => void;
  selectedFileName: string;
  setSelectedFileName: (fileName: string) => void;
}

export const PlaygroundContext = createContext<PlaygroundContextProps>({
  selectedFileName: defaultFileName,
} as PlaygroundContextProps);

export const PlaygroundProvider = ({ children }: PropsWithChildren) => {
  const [files, setFiles] = useState<Files>(defaultFiles);
  const [selectedFileName, setSelectedFileName] =
    useState<string>(defaultFileName);

  const addFile = (fileName: string) => {
    setFiles((prevFiles) => ({
      ...prevFiles,
      [fileName]: {
        name: fileName,
        value: "",
        language: getLanguageByFileName(fileName),
        readonly: false,
      },
    }));
  };
  const removeFile = (fileName: string) => {
    const { [fileName]: _, ...rest } = files;
    setFiles({ ...rest });
  };

  const updateFileName = (prevFileName: string, nextFileName: string) => {
    if (!files[prevFileName] || !nextFileName) return;
    setFiles((prevFiles) => {
      const { [prevFileName]: value, ...rest } = prevFiles;
      return {
        ...rest,
        [nextFileName]: {
          ...value,
          name: nextFileName,
          language: getLanguageByFileName(nextFileName),
        },
      };
    });
  };
  return (
    <PlaygroundContext.Provider
      value={{
        files,
        setFiles,
        addFile,
        removeFile,
        updateFileName,
        selectedFileName,
        setSelectedFileName,
      }}
    >
      {children}
    </PlaygroundContext.Provider>
  );
};

export const usePlayground = () => {
  return useContext(PlaygroundContext);
};
