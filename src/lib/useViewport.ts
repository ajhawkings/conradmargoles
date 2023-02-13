import { useEffect, useState } from 'react'

export default function useViewport() {
  const [viewport, setViewport] = useState([0,0])

  useEffect(() => {
    const handleResize = () => setViewport([window.innerWidth, window.innerHeight])

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return viewport
}