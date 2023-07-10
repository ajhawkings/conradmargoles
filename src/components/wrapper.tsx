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
            src="/images/handwritten/CAArchitects_Logo.png"
            alt="Conrad Margoles Architects logo"
            width="300"
            height="100"
            className={styles.logo}
          />
        </Link>
        {(width < 1000) &&
          <button className={styles.menu} onClick={() => setExpanded(!expanded)}>
            <Image
              src="/images/handwritten/Burger Menu.png"
              alt="Burger menu"
              width="80"
              height="80"
            />
          </button>
        }
        {(width > 1000 || expanded) &&
          <div className={styles.menuItems}>
            {menuItems.map((item) => (
              <Link
                className={styles.menuItem}
                href={`/${item.toLowerCase()}`} 
                key={item} 
                onClick={() => setExpanded(false)}
              >
                <Image
                  src={`/images/handwritten/${item}.png`}
                  alt={item}
                  width="0"
                  height="0"
                  sizes="100vw"
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
