import React from 'react';
import styles from './index.less';
import Footer from './Footer';
import withRouter from 'umi/withRouter';


function Layout({ children, location }) {
  return (
    <div className={styles.layout}>
      <div className={styles.content}>
        {children}
      </div>
      <Footer className={styles.footer} />
    </div>
  );
}

export default withRouter(Layout);
