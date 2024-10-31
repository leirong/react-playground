import { transform } from "@babel/standalone";
import { File, Files } from "../components";
import { PluginObj } from "@babel/core";
import { MAIN_TSX_FILE_NAME } from "../components/playground-context/default";
// import Sass from "sass.js/dist/sass.sync.js";

export const beforeTransformCode = (filename: string, code: string) => {
  const reactRegex = /import\s+React\s/g;
  if (
    (filename.endsWith(".jsx") || filename.endsWith(".tsx")) &&
    !reactRegex.test(code)
  ) {
    return `import React from 'react';\n${code}`;
  }
  return code;
};

export const transformCode = (filename: string, code: string, files: Files) => {
  try {
    const transCode = beforeTransformCode(filename, code);
    const result = transform(transCode, {
      filename,
      presets: ["react", "typescript"],
      plugins: [customResolver(files)],
      retainLines: true, // 保留行号
    });
    return result.code!;
  } catch (error) {
    console.log("编译出错", error);
    return "";
  }
};

const JsJsxTsxTsRegex = /\.(js|jsx|tsx|ts)$/;

export const compile = (files: Files) => {
  const entryFileName = MAIN_TSX_FILE_NAME;
  const file = files[entryFileName];
  if (file?.value) {
    return transformCode(entryFileName, file.value, files);
  }
  return "";
};

function getFileByPath(files: Files, path: string) {
  const fileNames = Object.keys(files);
  const fileName = path.split("./").pop() || "";
  if (!fileName.includes(".")) {
    // 如果没有后缀名
    const jsFileNames = fileNames.filter((name) => JsJsxTsxTsRegex.test(name));
    const realFileName = jsFileNames.find((name) =>
      name.split(".").includes(fileName)
    );
    if (realFileName) {
      return files[realFileName];
    }
  }
  return files[fileName];
}

function css2js(file: File) {
  const randomId = new Date().getTime();
  const iife = `(() => {
    const stylesheet = document.createElement("style");
    stylesheet.setAttribute("type", "text/css");
    stylesheet.setAttribute('id', 'style_${randomId}_${file.name}')
    document.head.appendChild(stylesheet);
    const styles = document.createTextNode(\`${file.value}\`)
    stylesheet.innerHTML = ''
    stylesheet.appendChild(styles)
  })()`;
  const blob = new Blob([iife], {
    type: "application/javascript",
  });
  return URL.createObjectURL(blob);
}

// async function scss2css(file: File): Promise<string> {
//   const sass = new Sass();
//   return new Promise((resolve) => {
//     sass.compile(file.value, function (result) {
//       resolve(result.text);
//     });
//   });
// }

function json2js(file: File) {
  const js = `export default ${file.value}`;
  const blob = new Blob([js], {
    type: "application/javascript",
  });
  return URL.createObjectURL(blob);
}

function customResolver(files: Files): PluginObj {
  return {
    visitor: {
      async ImportDeclaration(path) {
        const modulePath = path.node.source.value;
        if (!modulePath.startsWith(".")) return;
        const file = getFileByPath(files, modulePath);
        if (!file) return;
        if (JsJsxTsxTsRegex.test(file.name) && file.value) {
          const _transformCode = transformCode(file.name, file.value, files);
          if (!_transformCode) return;
          const blob = new Blob([_transformCode], {
            type: "application/javascript",
          });
          path.node.source.value = URL.createObjectURL(blob);
        } else if (file.name.endsWith(".json")) {
          path.node.source.value = json2js(file);
        } else if (file.name.endsWith(".css")) {
          path.node.source.value = css2js(file);
        }
        // else if (file.name.endsWith(".scss")) {
        //   const css = await scss2css(file);
        //   const newFile: File = {
        //     ...file,
        //     name: file.name.replace(".scss", ".css"),
        //     value: css,
        //   };
        //   path.node.source.value = css2js(newFile);
        // }
      },
    },
  };
}
