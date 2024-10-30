import appScss from "../../App.scss?raw";
import appTsx from "../../App.tsx?raw";
import mainScss from "../../index.scss?raw";
import mainTsx from "../../main.tsx?raw";
import importMap from "./import-map.json?raw";
import { Files } from ".";
import { getLanguageByFileName } from "../../utils/file";

export const APP_TSX_FILE_NAME = "App.tsx";
export const APP_SCSS_FILE_NAME = "App.scss";
export const MAIN_TSX_FILE_NAME = "main.tsx";
export const MAIN_SCSS_FILE_NAME = "index.scss";
export const IMPORT_MAP_FILE_NAME = "import-map.json";
export const defaultFileName = APP_TSX_FILE_NAME;

export const defaultFiles: Files = {
  [APP_TSX_FILE_NAME]: {
    name: APP_TSX_FILE_NAME,
    value: appTsx,
    language: getLanguageByFileName(APP_TSX_FILE_NAME),
  },
  [APP_SCSS_FILE_NAME]: {
    name: APP_SCSS_FILE_NAME,
    value: appScss,
    language: getLanguageByFileName(APP_SCSS_FILE_NAME),
  },
  [MAIN_TSX_FILE_NAME]: {
    name: MAIN_TSX_FILE_NAME,
    value: mainTsx,
    language: getLanguageByFileName(MAIN_TSX_FILE_NAME),
  },
  [MAIN_SCSS_FILE_NAME]: {
    name: MAIN_SCSS_FILE_NAME,
    value: mainScss,
    language: getLanguageByFileName(MAIN_SCSS_FILE_NAME),
  },
  [IMPORT_MAP_FILE_NAME]: {
    name: IMPORT_MAP_FILE_NAME,
    value: importMap,
    language: getLanguageByFileName(IMPORT_MAP_FILE_NAME),
  },
};
