import logo from "@/assets/react.svg";
import styles from "./index.module.scss";
import {
  DownloadOutlined,
  MoonOutlined,
  ShareAltOutlined,
  SunOutlined,
} from "@ant-design/icons";
import { usePlayground } from "../playground-context";
import copy from "copy-to-clipboard";
import { message } from "antd";
import { downloadFiles } from "../../utils/download";
const Header = () => {
  const { theme, setTheme, files } = usePlayground();
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img alt="logo" src={logo} />
        <span>React Playground</span>
        <div className={styles.link}>
          {theme === "light" && (
            <MoonOutlined
              title="切换暗色主题"
              onClick={() => setTheme("dark")}
            />
          )}
          {theme === "dark" && (
            <SunOutlined
              title="切换亮色主题"
              onClick={() => setTheme("light")}
            />
          )}
          <ShareAltOutlined
            style={{ marginLeft: "10px" }}
            title="分享链接"
            onClick={() => {
              copy(window.location.href);
              message.success("分享链接已复制。");
            }}
          />
          <DownloadOutlined
            title="下载代码"
            style={{ marginLeft: "10px" }}
            onClick={async () => {
              await downloadFiles(files);
              message.success("下载完成");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
