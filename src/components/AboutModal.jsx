import React from 'react'

export default function AboutModal({ isOpen, onClose }) {
    if (!isOpen) return null

    const techStack = [
        { name: 'React', category: 'Frontend', color: '#00f0ff', icon: '⚛️' },
        { name: 'Next.js', category: 'Full Stack', color: '#ffffff', icon: '🚀' },
        { name: 'Node.js', category: 'Backend', color: '#00ffa3', icon: '🟢' },
        { name: 'MongoDB', category: 'Database', color: '#00e676', icon: '🍃' },
        { name: 'Supabase', category: 'Backend / DB', color: '#24b47e', icon: '⚡' },
        { name: 'Three.js / WebGL', category: '3D Graphics', color: '#ff107f', icon: '🌐' }
    ]

    return (
        <div className="about-modal-backdrop" onClick={onClose}>
            <div className="about-modal-card" onClick={(e) => e.stopPropagation()}>
                <button className="about-close-btn" onClick={onClose} title="Close">
                    ✕
                </button>

                <div className="about-card-header">
                    <div className="about-avatar-glow">
                        <span className="avatar-emoji">👨‍💻</span>
                    </div>
                    <div>
                        <div className="about-tag">SYSTEM // DEVELOPER PROFILE</div>
                        <h2 className="about-name">Sajjad JIM</h2>
                        <p className="about-role">Web Developer • Full-Stack Engineer</p>
                    </div>
                </div>

                <div className="about-bio">
                    <p>
                        Passionate web developer creating modern, responsive, and high-performance applications.
                        Specialized in full-stack architecture with <strong>React</strong>, <strong>Node.js</strong>, <strong>Next.js</strong>, and modern databases like <strong>MongoDB</strong> & <strong>Supabase</strong>.
                    </p>
                </div>

                <div className="about-skills-section">
                    <h4 className="section-title">Core Tech Stack</h4>
                    <div className="skills-grid">
                        {techStack.map((tech) => (
                            <div key={tech.name} className="skill-chip">
                                <span className="skill-icon">{tech.icon}</span>
                                <div className="skill-info">
                                    <span className="skill-name">{tech.name}</span>
                                    <span className="skill-category">{tech.category}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="about-links-section">
                    <a
                        href="https://sajjadjim.web.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="modal-action-btn primary"
                    >
                        <span>🌐 Visit Portfolio (sajjadjim.web.app)</span>
                        <span className="arrow">↗</span>
                    </a>
                    <a
                        href="https://github.com/sajjadjim"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="modal-action-btn secondary"
                    >
                        <span>💻 GitHub (@sajjadjim)</span>
                        <span className="arrow">↗</span>
                    </a>
                </div>
            </div>
        </div>
    )
}
