import { ReactNode, useState } from 'react'
import useViewport from '@lib/useViewport'

import Image from 'next/image'
import Link from 'next/link'

import styles from '@styles/Wrapper.module.css'

export default function Wrapper ({ children }: { children: ReactNode }) {
  const menuItems = ['Portfolio', 'Studio', 'Contact']
  
  const [expanded, setExpanded] = useState(false)

  const [width] = useViewport()

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <Link href="/">
          <Image
            src="/images/handwritten/CAArchitects_LogoBlack.png"
            alt="Conrad Margoles Architects logo"
            width="250"
            height="80"
          />
        </Link>
        {(width < 1000) &&
          <button className={styles.menu} onClick={() => setExpanded(!expanded)}>
            <svg viewBox="0 0 100 80" width="40" height="40">
              <rect width="100" height="5"></rect>
              <rect y="30" width="100" height="5"></rect>
              <rect y="60" width="100" height="5"></rect>
            </svg>
          </button>
        }
        {(width > 1000 || expanded) &&
          <div className={styles.menuItems}>
            {menuItems.map((item) => (
              <Link href={`/${item.toLowerCase()}`} key={item} onClick={() => setExpanded(false)}>
                <Image
                  src={`/images/handwritten/${item}${width < 1000 ? 'Center' : ''}.png`}
                  alt={item}
                  width="100"
                  height="25"
                  className={styles.image}
                />
              </Link>
            ))}
          </div>
        }
      </nav>
      <main className={styles.main}>
        {children}
      </main>
    </div>
  )
}
