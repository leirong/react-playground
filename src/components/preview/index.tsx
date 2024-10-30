import { useEffect, useState } from "react";
import { usePlayground } from "../playground-context";
import { compile } from "../../utils/babel";
import Editor from "../code-editor/editor";
import iframeRaw from "../../iframe.html?raw";
import { IMPORT_MAP_FILE_NAME } from "../playground-context/default";

const Preview = () => {
  const { selectedFileName, files } = usePlayground();
  const [compiledCode, setCompiledCode] = useState<string>("");

  useEffect(() => {
    const res = compile(selectedFileName, files);
    setCompiledCode(res);
  }, [files, selectedFileName]);

  const getIframeUrl = () => {
    const res = iframeRaw
      .replace(
        '<script type="importmap"></script>',
        `<script type="importmap">${files[IMPORT_MAP_FILE_NAME].value}</script>`
      )
      .replace(
        '<script type="module" id="appSrc"></script>',
        `<script type="module" id="appSrc">${compiledCode}</script>`
      );
    return URL.createObjectURL(new Blob([res], { type: "text/html" }));
  };

  const [iframeUrl, setIframeUrl] = useState(getIframeUrl());

  useEffect(() => {
    setIframeUrl(getIframeUrl());
  }, [files[IMPORT_MAP_FILE_NAME].value, compiledCode]);

  return (
    <div style={{ height: "100%" }}>
      <iframe
        src={iframeUrl}
        style={{
          width: "100%",
          height: "100%",
          padding: 0,
          border: "none",
        }}
      />
      {/* <Editor
        file={{
          name: "dist.js",
          value: compiledCode,
          language: "javascript",
        }}
      /> */}
    </div>
  );
};

export default Preview;
