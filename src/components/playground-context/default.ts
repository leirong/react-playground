import { Files } from ".";
import { getLanguageByFileName } from "../../utils/file";

export const APP_TSX_FILE_NAME = "App.tsx";
export const APP_SCSS_FILE_NAME = "App.css";
export const MAIN_TSX_FILE_NAME = "main.tsx";
export const MAIN_SCSS_FILE_NAME = "index.css";

export const defaultFileName = MAIN_TSX_FILE_NAME;

export const IMPORT_MAP_FILE_NAME = "import-map.json";
import mainTsx from "../../templates/main.tsx?raw";
import appTsx from "../../templates/App.tsx?raw";
import appcss from "../../templates/App.css?raw";
import importMap from "../../templates/import-map.json?raw";
import { uncompress } from "../../utils/compress";

export const defaultFiles: Files = {
  [MAIN_TSX_FILE_NAME]: {
    name: MAIN_TSX_FILE_NAME,
    value: mainTsx,
    language: getLanguageByFileName(MAIN_TSX_FILE_NAME),
    readonly: true,
  },
  [APP_TSX_FILE_NAME]: {
    name: APP_TSX_FILE_NAME,
    value: appTsx,
    language: getLanguageByFileName(APP_TSX_FILE_NAME),
    readonly: true,
  },
  [APP_SCSS_FILE_NAME]: {
    name: APP_SCSS_FILE_NAME,
    value: appcss,
    language: getLanguageByFileName(APP_SCSS_FILE_NAME),
    readonly: false,
  },
  [IMPORT_MAP_FILE_NAME]: {
    name: IMPORT_MAP_FILE_NAME,
    value: importMap,
    language: getLanguageByFileName(IMPORT_MAP_FILE_NAME),
    readonly: true,
  },
};

export const getDefaultFilesFromUrl = () => {
  try {
    const hash = uncompress(window.location.hash.slice(1));
    const files = JSON.parse(hash);
    return files;
  } catch (error) {
    console.log("error", error);
    return defaultFiles;
  }
};
