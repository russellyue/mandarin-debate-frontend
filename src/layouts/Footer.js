
import styles from './Footer.less';


function Footer({ children, location }) {
    const russellLink = "https://russellyue.github.io";
    return (
        <div className={styles.footer}>
            Copyright © 2018 <a href={russellLink} target="_blank">Russell.Yue</a> All rights reserved
        </div>
    );
}

export default Footer;
