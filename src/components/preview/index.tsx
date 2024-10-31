import { useEffect, useRef, useState } from "react";
import { usePlayground } from "../playground-context";
import CompilerWorker from "../../utils/compiler.worker?worker";
// import Editor from "../code-editor/editor";
import iframeRaw from "../../iframe.html?raw";
import { IMPORT_MAP_FILE_NAME } from "../playground-context/default";
import Message from "../message";

const Preview = () => {
  const { files } = usePlayground();
  const [compiledCode, setCompiledCode] = useState<string>("");

  const compilerWorkerRef = useRef<Worker>();

  // useEffect(() => {
  //   const res = compile(files);
  //   setCompiledCode(res);
  // }, [files]);

  useEffect(() => {
    if (!compilerWorkerRef.current) {
      compilerWorkerRef.current = new CompilerWorker();
      compilerWorkerRef.current.addEventListener("message", ({ data }) => {
        // console.log("worker", data);
        if (data.type === "COMPILED_CODE") {
          setCompiledCode(data.data);
        }
      });
    }
  });
  useEffect(() => {
    if (compilerWorkerRef.current) {
      compilerWorkerRef.current.postMessage(files);
    }
  }, [files]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files[IMPORT_MAP_FILE_NAME].value, compiledCode]);

  const [error, setError] = useState<string>("");

  useEffect(() => {
    const callback = (e: MessageEvent) => {
      if (e.data.type === "ERROR") {
        setError(e.data.message);
      }
    };
    window.addEventListener("message", callback);
    return () => {
      window.removeEventListener("message", callback);
    };
  }, []);

  return (
    <div
      style={{
        height: "100%",
      }}
    >
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
      <Message type="error" content={error} />
    </div>
  );
};

export default Preview;
