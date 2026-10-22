import * as THREE from 'three'
import Experience from './Experience.js'
import EventEmitter from './Utils/EventEmitter.js'

export default class PreLoader extends EventEmitter
{
    constructor()
    {
        super()

        this.experience = new Experience()
        this.scene = this.experience.scene
        this.sounds = this.experience.sounds
        this.resources = this.experience.resources
        this.sizes = this.experience.sizes
        this.overlay = document.querySelector('.overlay')
        this.cooking = document.querySelector('#cooking')
        this.startButton = document.querySelector('.start')       



        // Progress
        this.resources.on('itemLoaded', () =>
        {
            this.progressRatio = (this.resources.loaded + 1) / this.resources.toLoad
            const percentage = Math.trunc(this.progressRatio * 100)
            const percentageEl = document.getElementById("progressPercentage")
            if (percentageEl) percentageEl.innerHTML = percentage
            const fillEl = document.getElementById("loadingBarFill")
            if (fillEl) fillEl.style.width = percentage + '%'

            window.dispatchEvent(new CustomEvent('loadingProgress', { detail: { percentage, ratio: this.progressRatio } }))
        })

        //Loaded
        this.resources.on('ready', () =>
        {
            window.dispatchEvent(new CustomEvent('experienceReady'))

            window.setTimeout(() =>
            {
                if (this.cooking) this.cooking.classList.add('fade')
            }, 1500)

            window.setTimeout(() =>
            {
                this.readyScreen()
            }, 2500)
        })
    }
    
    readyScreen()
    {
        if (this.cooking) this.cooking.remove()
        if (this.startButton) {
            this.startButton.style.display = "inline-flex"
            this.startButton.classList.add('fadeIn')
            this.startButton.addEventListener("click", () => this.startExperience(), { once: true })
        }
    }

    async startExperience()
    {
        // Remove overlay and button
        if (this.overlay) this.overlay.classList.add('fade')
        if (this.startButton) this.startButton.classList.add('fadeOut')

        window.setTimeout(() =>
        {
            if (this.startButton) this.startButton.remove()
            if (this.overlay) this.overlay.remove()
        }, 2000)

        // Trigger start events
        this.controller = this.experience.controller
        this.performance = this.experience.performance

        // Move Camera
        if (this.controller && this.controller.camControls) {
            this.controller.camControls.toDefault()
        }

        // Play Sounds
        this.sounds.playClick()
        this.sounds.playWhoosh()
        this.sounds.playCooking()

        // Required for responsiveness
        this.sizes.resize()
        
        // Wait before performance Check
        await this.sleep(500)
        if (this.performance) this.performance.performanceCheck()

        // Emit Event
        this.trigger('start')
        window.dispatchEvent(new CustomEvent('experienceStarted'))

        // Play Sounds
        await this.sleep(500)
        this.sounds.playDing()
    }

    sleep(ms) 
    {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}