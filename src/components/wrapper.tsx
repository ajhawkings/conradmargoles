import { ReactNode, useState } from 'react'
import useViewport from '@lib/useViewport'

import ExportedImage from 'next-image-export-optimizer'
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
          <ExportedImage
            src="/images/handwritten/CAArchitects_Logo.png"
            alt="Conrad Margoles Architects logo"
            width="300"
            height="100"
            className={styles.logo}
            placeholder='empty'
          />
        </Link>
        {(width <= 1000) &&
          <button className={styles.menu} onClick={() => setExpanded(!expanded)}>
            <ExportedImage
              src="/images/handwritten/Burger Menu.png"
              alt="Burger menu"
              width="90"
              height="90"
              placeholder='empty'
            />
          </button>
        }
        {(width >= 1001 || expanded) &&
          <div className={styles.menuItems}>
            {menuItems.map((item) => (
              <Link
                className={styles.menuItem}
                href={`/${item.toLowerCase()}`} 
                key={item} 
                onClick={() => setExpanded(false)}
              >
                <ExportedImage
                  src={`/images/handwritten/${item}.png`}
                  alt={item}
                  width="0"
                  height="0"
                  sizes="100vw"
                  className={styles.image}
                  placeholder='empty'
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
