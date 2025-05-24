import React, { useState } from 'react';
import styles from './LandingPage.module.css';

const LandingPage = ({ onEnter }) => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleEmailSubmit = async () => {
        if (!email || !email.includes('@')) return;

        setIsLoading(true);

        // Simulate API call - replace with actual API endpoint
        setTimeout(() => {
            setIsSubmitted(true);
            setIsLoading(false);
            setEmail('');

            // Call onEnter callback if provided (for App.js integration)
            if (onEnter) {
                setTimeout(() => {
                    onEnter();
                }, 2000); // Delay to show success message
            }
        }, 1500);
    };

    const features = [
        {
            icon: "🎥",
            title: "10-Second Video Intros",
            description: "Create compelling video introductions that make memorable first impressions"
        },
        {
            icon: "🤖",
            title: "AI-Powered Customization",
            description: "Transform your videos with smart prompts and personalized messaging"
        },
        {
            icon: "🔗",
            title: "Professional Integration",
            description: "Link to LinkedIn, resumes, portfolios, and share across all platforms"
        },
        {
            icon: "📱",
            title: "Mobile-First Design",
            description: "Seamlessly works on web and mobile, designed for real-world networking"
        }
    ];

    const useCases = [
        {
            title: "Professional Networking",
            description: "Stand out on LinkedIn with video introductions that get responses",
            className: styles.gradientBlueToPerple
        },
        {
            title: "Job Applications",
            description: "Make your applications memorable with personalized video messages",
            className: styles.gradientGreenToTeal
        },
        {
            title: "Social Connections",
            description: "Break the ice with new people without being intrusive",
            className: styles.gradientPinkToRose
        }
    ];

    return (
        <div className={styles.container}>
            {/* Animated Background Elements */}
            <div className={styles.backgroundContainer}>
                <div className={`${styles.backgroundBlob} ${styles.purpleBlob}`}></div>
                <div className={`${styles.backgroundBlob} ${styles.blueBlob}`}></div>
                <div className={`${styles.backgroundBlob} ${styles.pinkBlob}`}></div>
            </div>

            {/* Header */}
            <header className={styles.header}>
                <nav className={styles.nav}>
                    <div className={styles.logo}>
                        MyTenSecondStory
                    </div>
                    <div className={styles.navLinks}>
                        <a href="#features" className={styles.navLink}>Features</a>
                        <a href="#how-it-works" className={styles.navLink}>How It Works</a>
                        <a href="#use-cases" className={styles.navLink}>Use Cases</a>
                    </div>
                </nav>
            </header>

            {/* Hero Section */}
            <section className={styles.heroSection}>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>
                        Your Story in
                        <span className={styles.gradientText}>
                            {" "}10 Seconds
                        </span>
                    </h1>

                    <p className={styles.heroSubtitle}>
                        Create powerful video introductions that open doors, build connections, and make you unforgettable in professional and social settings.
                    </p>

                    {/* Email Signup Form */}
                    <div className={styles.emailSignupContainer}>
                        {!isSubmitted ? (
                            <div className={styles.emailForm}>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className={styles.emailInput}
                                />
                                <button
                                    onClick={handleEmailSubmit}
                                    disabled={isLoading || !email || !email.includes('@')}
                                    className={styles.ctaButton}
                                >
                                    {isLoading ? (
                                        <div className={styles.loadingContainer}>
                                            <div className={styles.spinner}></div>
                                            Joining...
                                        </div>
                                    ) : (
                                        'Get Early Access'
                                    )}
                                </button>
                            </div>
                        ) : (
                            <div className={styles.successMessage}>
                                🎉 Thanks! You're on the list for early access.
                            </div>
                        )}
                    </div>

                    <p className={styles.signupNote}>
                        Join 1,000+ professionals waiting for launch • No spam, ever
                    </p>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className={styles.featuresSection}>
                <div className={styles.sectionContainer}>
                    <h2 className={styles.sectionTitle}>
                        Why Choose MyTenSecondStory?
                    </h2>

                    <div className={styles.featuresGrid}>
                        {features.map((feature, index) => (
                            <div key={index} className={styles.featureCard}>
                                <div className={styles.featureIcon}>
                                    {feature.icon}
                                </div>
                                <h3 className={styles.featureTitle}>{feature.title}</h3>
                                <p className={styles.featureDescription}>{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className={styles.stepsSection}>
                <div className={styles.stepsContainer}>
                    <h2 className={styles.sectionTitle}>
                        Simple. Powerful. Effective.
                    </h2>

                    <div className={styles.stepsGrid}>
                        <div className={styles.step}>
                            <div className={`${styles.stepNumber} ${styles.stepNumberPurple}`}>
                                1
                            </div>
                            <h3 className={styles.stepTitle}>Record Your Story</h3>
                            <p className={styles.stepDescription}>Create a 10-second video introduction using your phone or camera</p>
                        </div>

                        <div className={styles.step}>
                            <div className={`${styles.stepNumber} ${styles.stepNumberBlue}`}>
                                2
                            </div>
                            <h3 className={styles.stepTitle}>AI Enhancement</h3>
                            <p className={styles.stepDescription}>Use AI prompts to customize your message for different audiences</p>
                        </div>

                        <div className={styles.step}>
                            <div className={`${styles.stepNumber} ${styles.stepNumberGreen}`}>
                                3
                            </div>
                            <h3 className={styles.stepTitle}>Share & Connect</h3>
                            <p className={styles.stepDescription}>Send via LinkedIn, email, text, or any platform to make meaningful connections</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Use Cases */}
            <section id="use-cases" className={styles.useCasesSection}>
                <div className={styles.sectionContainer}>
                    <h2 className={styles.sectionTitle}>
                        Perfect For Every Situation
                    </h2>

                    <div className={styles.useCasesGrid}>
                        {useCases.map((useCase, index) => (
                            <div key={index} className={`${styles.useCaseCard} ${useCase.className}`}>
                                <h3 className={styles.useCaseTitle}>{useCase.title}</h3>
                                <p className={styles.useCaseDescription}>{useCase.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className={styles.ctaSection}>
                <div className={styles.ctaContainer}>
                    <h2 className={styles.ctaTitle}>
                        Ready to Transform Your Networking?
                    </h2>

                    <p className={styles.ctaSubtitle}>
                        Join thousands of professionals who are already using video to create meaningful connections and unlock new opportunities.
                    </p>

                    <div className={styles.emailSignupContainer}>
                        {!isSubmitted ? (
                            <div className={styles.emailForm}>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Your email address"
                                    className={styles.emailInput}
                                />
                                <button
                                    onClick={handleEmailSubmit}
                                    disabled={isLoading || !email || !email.includes('@')}
                                    className={styles.ctaButton}
                                >
                                    {isLoading ? 'Joining...' : 'Start Your Story'}
                                </button>
                            </div>
                        ) : (
                            <div className={styles.successMessage}>
                                🎉 Welcome to the MyTenSecondStory community!
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className={styles.footer}>
                <div className={styles.footerContent}>
                    <div className={styles.footerLogo}>MyTenSecondStory</div>
                    <p className={styles.footerTagline}>Your story. Your connections. Your success.</p>

                    <div className={styles.footerLinks}>
                        <a href="#" className={styles.footerLink}>Privacy</a>
                        <a href="#" className={styles.footerLink}>Terms</a>
                        <a href="#" className={styles.footerLink}>Contact</a>
                    </div>

                    <div className={styles.footerCopyright}>
                        © 2025 MyTenSecondStory. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;