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
    const [isZoomedIn, setIsZoomedIn] = useState(false)

    useEffect(() => {
        const handleOpenModal = () => setIsAboutOpen(true)
        const handleViewModeChanged = (e) => {
            const mode = e.detail && e.detail.mode
            setIsZoomedIn(mode && mode !== 'menu')
        }

        window.addEventListener('openAboutModal', handleOpenModal)
        window.addEventListener('viewModeChanged', handleViewModeChanged)

        return () => {
            window.removeEventListener('openAboutModal', handleOpenModal)
            window.removeEventListener('viewModeChanged', handleViewModeChanged)
        }
    }, [])

    const handleStart = () => {
        const experience = new Experience()
        if (experience && experience.preLoader) {
            experience.preLoader.startExperience()
        }
    }

    const handleResetView = () => {
        window.dispatchEvent(new CustomEvent('requestResetView'))
        setIsZoomedIn(false)
        setIsAboutOpen(false)
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

            {/* Prominent floating Exit/Close Button when zoomed into any machine/sign */}
            {isZoomedIn && (
                <button
                    className="exit-view-btn"
                    onClick={handleResetView}
                    title="Exit back to main shop overview (or press ESC)"
                >
                    <span className="exit-icon">←</span>
                    <span className="exit-text">BACK TO SHOP</span>
                    <span className="exit-badge">ESC</span>
                </button>
            )}

            <HudFooter />
            <LoadingScreen onStart={handleStart} />
            <AboutModal
                isOpen={isAboutOpen}
                onClose={() => {
                    setIsAboutOpen(false)
                    if (isZoomedIn) {
                        handleResetView()
                    }
                }}
            />
        </div>
    )
}

