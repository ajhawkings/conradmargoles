import Image from 'next/image'

import styles from '@styles/Top.module.css'

// Back to top button
export default function Top () {
  return <>
    <button 
      className={styles.top}
      type="button" 
      title="Back to top" 
      onClick={() => window.scrollTo(0,0)}
    >
      <Image
        src="/images/handwritten/Arrows Right.png"
        alt="Back to top"
        height="50"
        width="80"
      />
    </button>
  </>
}
