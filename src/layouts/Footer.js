
import styles from './Footer.less';


function Footer({ children, location }) {
    const russellFbLink = "https://www.facebook.com/profile.php?id=100009563812929";
    return (
        <div className={styles.footer}>
            Copyright © 2018 <a href={russellFbLink} target="_blank">Russell.Yue</a> All rights reserved
        </div>
    );
}

export default Footer;
