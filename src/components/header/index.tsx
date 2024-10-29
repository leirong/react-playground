import logo from "@/assets/react.svg"
import styles from "./index.module.scss"
const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img alt="logo" src={logo} />
        <span>React Playground</span>
      </div>
    </div>
  )
}

export default Header
