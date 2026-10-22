import React, { useState, useEffect } from 'react'
import RamenCanvas from './components/RamenCanvas.jsx'
import HudHeader from './components/HudHeader.jsx'
import AboutModal from './components/AboutModal.jsx'
import LoadingScreen from './components/LoadingScreen.jsx'
import HudFooter from './components/HudFooter.jsx'
import Experience from './Experience/Experience.js'
import './style.css'

export default function App() {
    const [isAboutOpen, setIsAboutOpen] = useState(false)

    useEffect(() => {
        const handleOpenModal = () => setIsAboutOpen(true)
        window.addEventListener('openAboutModal', handleOpenModal)
        return () => window.removeEventListener('openAboutModal', handleOpenModal)
    }, [])

    const handleStart = () => {
        const experience = new Experience()
        if (experience && experience.preLoader) {
            experience.preLoader.startExperience()
        }
    }

    const handleOpenAbout = () => {
        setIsAboutOpen(true)
        // Also trigger camera to focus on About Me in 3D world
        const experience = new Experience()
        if (experience && experience.controller && experience.controller.camControls) {
            experience.controller.camControls.toAboutMe()
            if (experience.controller.bigScreenTransition && experience.materials && experience.controller.sajjadTextures) {
                experience.controller.bigScreenTransition(
                    experience.materials.bigScreenMaterial,
                    experience.controller.sajjadTextures.about,
                    0.2
                )
            }
        }
    }

    return (
        <div className="app-container">
            <RamenCanvas />
            <HudHeader onOpenAbout={handleOpenAbout} />
            <HudFooter />
            <LoadingScreen onStart={handleStart} />
            <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
        </div>
    )
}
