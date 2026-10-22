import * as THREE from 'three'

export function createProfileCanvasTexture(type = 'about') {
    const canvas = document.createElement('canvas')
    canvas.width = 1024
    canvas.height = 1024
    const ctx = canvas.getContext('2d')

    // Background gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 1024, 1024)
    bgGrad.addColorStop(0, '#060914')
    bgGrad.addColorStop(0.5, '#0b1022')
    bgGrad.addColorStop(1, '#080c1a')
    ctx.fillStyle = bgGrad
    ctx.fillRect(0, 0, 1024, 1024)

    // Cyber grid lines
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.08)'
    ctx.lineWidth = 1
    for (let x = 0; x < 1024; x += 64) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, 1024)
        ctx.stroke()
    }
    for (let y = 0; y < 1024; y += 64) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(1024, y)
        ctx.stroke()
    }

    // Outer neon border
    ctx.strokeStyle = '#00f0ff'
    ctx.lineWidth = 6
    ctx.strokeRect(32, 32, 960, 960)

    // Glowing corner accents
    ctx.strokeStyle = '#ff107f'
    ctx.lineWidth = 8
    // Top-left
    ctx.beginPath(); ctx.moveTo(24, 80); ctx.lineTo(24, 24); ctx.lineTo(80, 24); ctx.stroke();
    // Top-right
    ctx.beginPath(); ctx.moveTo(944, 24); ctx.lineTo(1000, 24); ctx.lineTo(1000, 80); ctx.stroke();
    // Bottom-left
    ctx.beginPath(); ctx.moveTo(24, 944); ctx.lineTo(24, 1000); ctx.lineTo(80, 1000); ctx.stroke();
    // Bottom-right
    ctx.beginPath(); ctx.moveTo(944, 1000); ctx.lineTo(1000, 1000); ctx.lineTo(1000, 944); ctx.stroke();

    if (type === 'about') {
        // Tag
        ctx.fillStyle = '#00ffa3'
        ctx.font = 'bold 26px sans-serif'
        ctx.fillText('● SYSTEM ONLINE // DEVELOPER PROFILE', 80, 110)

        // Name
        ctx.fillStyle = '#ffffff'
        ctx.font = '900 82px sans-serif'
        ctx.fillText('SAJJAD JIM', 80, 220)

        // Subtitle / Title
        ctx.fillStyle = '#00f0ff'
        ctx.font = 'bold 38px sans-serif'
        ctx.fillText('FULL STACK WEB DEVELOPER', 80, 280)

        // Divider
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.4)'
        ctx.lineWidth = 2
        ctx.beginPath(); ctx.moveTo(80, 315); ctx.lineTo(940, 315); ctx.stroke();

        // Bio paragraph
        ctx.fillStyle = '#d0d8e8'
        ctx.font = '30px sans-serif'
        ctx.fillText('Passionate web developer specializing in building modern,', 80, 380)
        ctx.fillText('fast, and scalable web applications. Experienced across', 80, 425)
        ctx.fillText('full-stack architectures, modern JavaScript & databases.', 80, 470)

        // Skills Header
        ctx.fillStyle = '#ff107f'
        ctx.font = 'bold 32px sans-serif'
        ctx.fillText('PRIMARY TECHNOLOGIES', 80, 560)

        // Tech pills
        const skills = ['React', 'Node.js', 'Next.js', 'MongoDB', 'Supabase', 'Three.js']
        let startX = 80
        let startY = 610
        skills.forEach((skill) => {
            ctx.fillStyle = 'rgba(0, 240, 255, 0.15)'
            ctx.strokeStyle = '#00f0ff'
            ctx.lineWidth = 2
            const width = ctx.measureText(skill).width + 50
            if (startX + width > 940) {
                startX = 80
                startY += 65
            }
            ctx.fillRect(startX, startY - 35, width, 50)
            ctx.strokeRect(startX, startY - 35, width, 50)
            ctx.fillStyle = '#ffffff'
            ctx.font = 'bold 26px sans-serif'
            ctx.fillText(skill, startX + 25, startY)
            startX += width + 20
        })

        // Links section
        ctx.strokeStyle = 'rgba(255, 16, 127, 0.4)'
        ctx.lineWidth = 2
        ctx.beginPath(); ctx.moveTo(80, 770); ctx.lineTo(940, 770); ctx.stroke();

        ctx.fillStyle = '#ffe838'
        ctx.font = 'bold 28px sans-serif'
        ctx.fillText('🌐 WEBSITE:', 80, 830)
        ctx.fillStyle = '#ffffff'
        ctx.font = 'bold 28px sans-serif'
        ctx.fillText('https://sajjadjim.web.app', 270, 830)

        ctx.fillStyle = '#00f0ff'
        ctx.font = 'bold 28px sans-serif'
        ctx.fillText('💻 GITHUB:', 80, 890)
        ctx.fillStyle = '#ffffff'
        ctx.font = 'bold 28px sans-serif'
        ctx.fillText('https://github.com/sajjadjim', 270, 890)

    } else if (type === 'skills') {
        // Tag
        ctx.fillStyle = '#00ffa3'
        ctx.font = 'bold 26px sans-serif'
        ctx.fillText('● SYSTEM DIAGNOSTIC // CORE SKILLS', 80, 110)

        ctx.fillStyle = '#00f0ff'
        ctx.font = '900 70px sans-serif'
        ctx.fillText('TECH STACK & SKILLS', 80, 210)

        // Frontend
        ctx.fillStyle = '#ff107f'
        ctx.font = 'bold 36px sans-serif'
        ctx.fillText('FRONTEND DEVELOPMENT', 80, 310)
        ctx.fillStyle = '#ffffff'
        ctx.font = '28px sans-serif'
        ctx.fillText('• React.js, Next.js, JavaScript (ES6+), HTML5, CSS3', 80, 360)
        ctx.fillText('• Three.js, WebGL 3D Experiences, Responsive Design', 80, 405)

        // Backend
        ctx.fillStyle = '#00f0ff'
        ctx.font = 'bold 36px sans-serif'
        ctx.fillText('BACKEND & APIS', 80, 500)
        ctx.fillStyle = '#ffffff'
        ctx.font = '28px sans-serif'
        ctx.fillText('• Node.js, Express, RESTful APIs, Serverless Functions', 80, 550)

        // Database
        ctx.fillStyle = '#00ffa3'
        ctx.font = 'bold 36px sans-serif'
        ctx.fillText('DATABASES & CLOUD', 80, 640)
        ctx.fillStyle = '#ffffff'
        ctx.font = '28px sans-serif'
        ctx.fillText('• MongoDB, Supabase, PostgreSQL, Firebase', 80, 690)

        // Portfolio link footer
        ctx.fillStyle = '#ffe838'
        ctx.font = 'bold 32px sans-serif'
        ctx.fillText('Portfolio: sajjadjim.web.app', 80, 820)
        ctx.fillStyle = '#ffffff'
        ctx.font = '28px sans-serif'
        ctx.fillText('GitHub: github.com/sajjadjim', 80, 875)

    } else if (type === 'experience') {
        // Tag
        ctx.fillStyle = '#00ffa3'
        ctx.font = 'bold 26px sans-serif'
        ctx.fillText('● PORTFOLIO // PROJECTS & WORK', 80, 110)

        ctx.fillStyle = '#ffffff'
        ctx.font = '900 70px sans-serif'
        ctx.fillText('PROJECTS & EXPERTISE', 80, 210)

        ctx.fillStyle = '#00f0ff'
        ctx.font = 'bold 34px sans-serif'
        ctx.fillText('FULL-STACK WEB APPLICATIONS', 80, 310)
        ctx.fillStyle = '#d0d8e8'
        ctx.font = '28px sans-serif'
        ctx.fillText('• High-performance web apps built with React & Next.js', 80, 360)
        ctx.fillText('• Robust Node.js backends and secure API services', 80, 405)
        ctx.fillText('• Cloud databases powered by MongoDB & Supabase', 80, 450)

        ctx.fillStyle = '#ff107f'
        ctx.font = 'bold 34px sans-serif'
        ctx.fillText('3D & CREATIVE WEB EXPERIENCES', 80, 550)
        ctx.fillStyle = '#d0d8e8'
        ctx.font = '28px sans-serif'
        ctx.fillText('• Interactive Three.js WebGL scenes & custom shaders', 80, 600)
        ctx.fillText('• Engaging 3D UI/UX and audio design', 80, 645)

        ctx.fillStyle = '#ffe838'
        ctx.font = 'bold 32px sans-serif'
        ctx.fillText('EXPLORE ONLINE AT:', 80, 780)
        ctx.fillStyle = '#ffffff'
        ctx.font = 'bold 30px sans-serif'
        ctx.fillText('https://sajjadjim.web.app', 80, 835)
        ctx.fillText('https://github.com/sajjadjim', 80, 885)
    }

    const texture = new THREE.CanvasTexture(canvas)
    texture.encoding = THREE.sRGBEncoding
    texture.needsUpdate = true
    return texture
}

export function createFloorSignTexture() {
    const canvas = document.createElement('canvas')
    canvas.width = 1024
    canvas.height = 1024
    const ctx = canvas.getContext('2d')

    ctx.clearRect(0, 0, 1024, 1024)

    // Sajjad JIM Title (matching Image 1 font & layout)
    ctx.shadowColor = '#00f0ff'
    ctx.shadowBlur = 18
    ctx.fillStyle = '#ffffff'
    ctx.font = '900 115px "Outfit", sans-serif'
    ctx.fillText('Sajjad JIM', 60, 160)

    // Subtle neon underline
    ctx.strokeStyle = '#00f0ff'
    ctx.lineWidth = 4
    ctx.beginPath()
    ctx.moveTo(60, 190)
    ctx.lineTo(680, 190)
    ctx.stroke()

    // Subtitle roles & tech stack
    ctx.shadowColor = 'rgba(255, 255, 255, 0.8)'
    ctx.shadowBlur = 10
    ctx.font = '500 64px "Outfit", sans-serif'
    ctx.fillStyle = '#ffffff'

    const lines = [
        'Web Developer',
        'React & Next.js',
        'Node.js',
        'MongoDB & Supabase',
        'sajjadjim.web.app'
    ]

    let y = 300
    lines.forEach((line, index) => {
        if (index === lines.length - 1) {
            ctx.shadowColor = '#00f0ff'
            ctx.fillStyle = '#00f0ff'
            ctx.font = '600 56px "Space Grotesk", sans-serif'
        }
        ctx.fillText(line, 60, y)
        y += 105
    })

    const texture = new THREE.CanvasTexture(canvas)
    texture.encoding = THREE.sRGBEncoding
    texture.needsUpdate = true
    return texture
}

export function createMainShopSignTexture() {
    const canvas = document.createElement('canvas')
    canvas.width = 1024
    canvas.height = 360
    const ctx = canvas.getContext('2d')

    // Dark cyberpunk panel
    ctx.fillStyle = '#090d1f'
    ctx.fillRect(0, 0, 1024, 360)

    // Inner glowing cyan neon frame
    ctx.strokeStyle = '#00f0ff'
    ctx.lineWidth = 8
    ctx.shadowColor = '#00f0ff'
    ctx.shadowBlur = 25
    ctx.strokeRect(16, 16, 992, 328)

    ctx.strokeStyle = '#ff107f'
    ctx.lineWidth = 4
    ctx.shadowColor = '#ff107f'
    ctx.shadowBlur = 15
    ctx.strokeRect(28, 28, 968, 304)

    // Glowing Neon text
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    // Neon drop shadow
    ctx.shadowColor = '#00f0ff'
    ctx.shadowBlur = 30
    ctx.fillStyle = '#ffffff'
    ctx.font = '900 96px "Outfit", sans-serif'
    ctx.fillText("SAJJAD JIM'S RAMEN", 512, 180)

    // Foreground crisp letters
    ctx.shadowBlur = 0
    ctx.fillStyle = '#f0ffff'
    ctx.fillText("SAJJAD JIM'S RAMEN", 512, 180)

    const texture = new THREE.CanvasTexture(canvas)
    texture.encoding = THREE.sRGBEncoding
    texture.needsUpdate = true
    return texture
}

