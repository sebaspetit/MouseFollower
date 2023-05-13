import { useEffect, useState } from 'react'
import './index.css'

const FollowMouse = () => {
  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    console.log('effect', { enabled })
    const handleMove = (event) => {
      const { clientX, clientY } = event

      setPosition({ x: clientX, y: clientY })
    }
    if (enabled) {
      window.addEventListener('pointermove', handleMove)
    }
    //cleanup:
    // cuando el componente se desmonta
    // cuiando cambian las dependencias, befero eject

    return () => {
      window.removeEventListener('pointermove', handleMove)
    }
  }, [enabled])

  // [] => only eject when the coumponent mount
  // [enabled] eject when the enabled change and mount the component
  // undefined => eject everytime render the component
  return (
    <>
      <div style={{
        position: 'absolute',
        border: '1px solid #fff',
        backgroundColor: 'rgba(0, 0, 0,5',
        borderRadius: '50%',
        opacity: '0.8',
        pointerEvents: 'none',
        left: -25,
        top: -25,
        width: 40,
        height: 40,
        transform: `translate(${position.x}px, ${position.y}px)`
      }}
      />
      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? 'Disabled' : 'Enabled'} Follow Pointer
      </button>
    </>
  )
}
function App() {
  const [mounted, setMounted] = useState(true)
  return (
    <main>
      <FollowMouse />
    </main>
  )

}

export default App
