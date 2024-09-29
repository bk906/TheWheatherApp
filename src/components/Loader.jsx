import BeatLoader from "react-spinners/BeatLoader";
import styles from './Loader.module.css';
function Loader() {
    return (
        <>
            <div className={styles.loader}>
                <BeatLoader color="#fff" />
            </div>
        </>
    )
}

export default Loader