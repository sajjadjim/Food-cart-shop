import React, { useState, useEffect } from 'react'

export default function LoadingScreen({ onStart }) {
    const [progress, setProgress] = useState(0)
    const [isReady, setIsReady] = useState(false)
    const [hasStarted, setHasStarted] = useState(false)
    const [fadeCooking, setFadeCooking] = useState(false)

    useEffect(() => {
        const handleProgress = (e) => {
            if (e.detail && typeof e.detail.percentage === 'number') {
                setProgress(e.detail.percentage)
            }
        }

        const handleReady = () => {
            window.setTimeout(() => setFadeCooking(true), 1200)
            window.setTimeout(() => setIsReady(true), 2000)
        }

        const handleStarted = () => {
            setHasStarted(true)
        }

        window.addEventListener('loadingProgress', handleProgress)
        window.addEventListener('experienceReady', handleReady)
        window.addEventListener('experienceStarted', handleStarted)

        return () => {
            window.removeEventListener('loadingProgress', handleProgress)
            window.removeEventListener('experienceReady', handleReady)
            window.removeEventListener('experienceStarted', handleStarted)
        }
    }, [])

    if (hasStarted) return null

    return (
        <>
            <div className={`overlay ${hasStarted ? 'fade' : ''}`} />

            {!isReady && (
                <div id="cooking" className={fadeCooking ? 'fade' : ''}>
                    <div className="bubble" />
                    <div className="bubble" />
                    <div className="bubble" />
                    <div className="bubble" />
                    <div className="bubble" />
                    <div id="area">
                        <div id="sides">
                            <div id="pan" />
                            <div id="handle" />
                        </div>
                        <div id="pancake">
                            <div id="pastry" />
                            <div id="pastry2" />
                            <div id="pastry3" />
                        </div>
                    </div>

                    <div className="loading-wrapper">
                        <h1 className="loading-title">Cooking Sajjad JIM's Ramen...</h1>
                        <div className="loading-bar-container">
                            <div
                                className="loading-bar-fill"
                                id="loadingBarFill"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <p className="loading-percentage">
                            <span id="progressPercentage">{progress}</span>%
                        </p>
                    </div>
                </div>
            )}

            {isReady && !hasStarted && (
                <div className="start-container">
                    <button
                        className="start fadeIn"
                        id="startButton"
                        onClick={onStart}
                    >
                        <span className="start-glow" />
                        <span className="start-text">ENTER RAMEN SHOP</span>
                        <span className="start-subtitle">🎧 Sound & 3D Interactive Experience</span>
                    </button>
                </div>
            )}
        </>
    )
}
