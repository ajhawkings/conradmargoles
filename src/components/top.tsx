import Image from 'next/image'

import styles from '@styles/Top.module.css'

// Back to top button
export default function Top () {
  return <>
    <div className={styles.right}>
      <button
        className={styles.top}
        type="button"
        title="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <Image
          src="/images/handwritten/Arrows Right.png"
          alt="Back to top"
          height="50"
          width="80"
        />
      </button>
    </div>
  </>
}
