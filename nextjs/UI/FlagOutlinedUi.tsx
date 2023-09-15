import classNames from 'classnames';

import styles from '../styles/FlagOutlined.module.css';

export const FlagOutlinedUi = ({ isActive = false }: { isActive?: boolean }) => {
  return <span className={classNames(styles.root, isActive && styles.active)}></span>;
};
