import logo from "@/assets/react.svg";
import styles from "./index.module.scss";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { usePlayground } from "../playground-context";
const Header = () => {
  const { theme, setTheme } = usePlayground();
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
        </div>
      </div>
    </div>
  );
};

export default Header;
