import styles from './Error.module.css';

import { IoClose } from "react-icons/io5";

function Error({error,setError,closeError}) {
    
  return (
    <div className={styles.errorContainer}>
        <button onClick={closeError}><IoClose /></button>
        {error && <p>Error: {error}</p>}
    </div>
  )
}

export default Error