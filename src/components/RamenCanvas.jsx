import React, { useEffect, useRef } from 'react'
import Experience from '../Experience/Experience.js'

export default function RamenCanvas() {
    const canvasRef = useRef(null)

    useEffect(() => {
        if (!canvasRef.current) return
        const experience = new Experience(canvasRef.current)

        return () => {
            // Cleanup experience if destroyed
            if (experience && typeof experience.destroy === 'function') {
                experience.destroy()
            }
        }
    }, [])

    return <canvas ref={canvasRef} className="webgl" />
}
