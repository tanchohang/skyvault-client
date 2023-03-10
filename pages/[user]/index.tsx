import styles from '../../styles/User.module.css';

interface UserIProps {}
const User = ({}: UserIProps) => {
  return (
    <div className={styles.user}>
      test
      <div className={styles.folder}></div>
    </div>
  );
};
export default User;
