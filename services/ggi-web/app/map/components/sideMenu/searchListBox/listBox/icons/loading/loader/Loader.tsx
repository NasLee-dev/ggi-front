import { keyframes } from '@emotion/react'
import Loader1 from './Loader1'
import Loader2 from './Loader2'
import Loader3 from './Loader3'
import Loader4 from './Loader4'
import Loader5 from './Loader5'
import Loader6 from './Loader6'
import Loader7 from './Loader7'
import { useEffect, useState } from 'react'

export default function Loader() {
  const [currentLoader, setCurrentLoader] = useState(1)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLoader((prevLoader) => {
        if (prevLoader === 7) {
          return 1
        } else {
          return prevLoader + 1
        }
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {currentLoader === 1 && <Loader1 />}
      {currentLoader === 2 && <Loader2 />}
      {currentLoader === 3 && <Loader3 />}
      {currentLoader === 4 && <Loader4 />}
      {currentLoader === 5 && <Loader5 />}
      {currentLoader === 6 && <Loader6 />}
      {currentLoader === 7 && <Loader7 />}
    </div>
  )
}
