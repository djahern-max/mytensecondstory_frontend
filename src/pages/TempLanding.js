import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Video, Users, Sparkles, Share2, Mail, Clock, Rocket, Star, Zap } from 'lucide-react';
import toast from 'react-hot-toast';
import styles from './TempLanding.module.css';

// Import the RetroTVSlider component
import RetroTVSlider from './RetroTVSlider';

const TempLanding = () => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [signupStats, setSignupStats] = useState({ total_signups: 0, recent_signups: 0 });
  const [timeLeft, setTimeLeft] = useState({ days: 10, hours: 0, minutes: 0, seconds: 0 });

  // API base URL - use this for direct calls
  const API_BASE_URL = 'http://localhost:8000';

  // Countdown timer - set your launch date here
  useEffect(() => {
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 10); // 10 days from now

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Fetch signup stats
  useEffect(() => {
    fetchSignupStats();
  }, []);

  const fetchSignupStats = async () => {
    try {
      console.log('Fetching signup stats...');
      const response = await fetch(`${API_BASE_URL}/api/v1/signup/stats`);
      console.log('Stats response status:', response.status);

      if (response.ok) {
        const stats = await response.json();
        console.log('Stats received:', stats);
        setSignupStats(stats);
      } else {
        const errorText = await response.text();
        console.error('Stats fetch failed:', response.status, errorText);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    setIsSubmitting(true);

    try {
      console.log('Submitting signup...', { email, fullName });
      const response = await fetch(`${API_BASE_URL}/api/v1/signup/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          full_name: fullName || null
        }),
      });

      console.log('Signup response status:', response.status);

      if (response.ok) {
        const result = await response.json();
        console.log('Signup successful:', result);
        setIsSubmitted(true);
        toast.success('Welcome aboard! We\'ll notify you as soon as we launch! 🚀');
        // Don't clear form here - keep it for the success state
        // Refresh stats
        fetchSignupStats();
      } else {
        const errorData = await response.json();
        console.error('Signup error:', errorData);
        if (errorData.detail === 'Email already registered') {
          toast.error('You\'re already on our VIP list! 🌟');
        } else {
          toast.error('Oops! Something went wrong. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Connection issue. Please check your internet and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.tempLanding}>
      {/* Countdown Banner */}
      <div className={styles.countdownBanner}>
        <div className="container">
          <motion.div
            className={styles.countdownContent}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Rocket size={24} />
            <span>🚀 Launching Soon:</span>
            <div className={styles.countdown}>
              <div className={styles.countdownItem}>
                <span className={styles.countdownNumber}>{timeLeft.days}</span>
                <span className={styles.countdownLabel}>Days</span>
              </div>
              <div className={styles.countdownItem}>
                <span className={styles.countdownNumber}>{timeLeft.hours}</span>
                <span className={styles.countdownLabel}>Hours</span>
              </div>
              <div className={styles.countdownItem}>
                <span className={styles.countdownNumber}>{timeLeft.minutes}</span>
                <span className={styles.countdownLabel}>Min</span>
              </div>
              <div className={styles.countdownItem}>
                <span className={styles.countdownNumber}>{timeLeft.seconds}</span>
                <span className={styles.countdownLabel}>Sec</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <motion.h1
                className={styles.heroTitle}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Your Perfect
                <span className={styles.highlight}> 10-Second </span>
                Introduction Awaits
              </motion.h1>

              <motion.p
                className={styles.heroSubtitle}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Stand out from the crowd with AI-enhanced video introductions.
                Whether you're networking, job hunting, or building relationships -
                make every first impression unforgettable.
              </motion.p>

              {/* Signup Stats */}
              <motion.div
                className={styles.signupStats}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <div className={styles.statItem}>
                  <Users size={20} />
                  <span>{signupStats.total_signups} pioneers waiting</span>
                </div>
                {signupStats.recent_signups > 0 && (
                  <div className={styles.statItem}>
                    <Star size={20} />
                    <span>{signupStats.recent_signups} joined today</span>
                  </div>
                )}
              </motion.div>

              {/* Email Signup Form */}
              {!isSubmitted ? (
                <motion.form
                  className={styles.signupForm}
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  <div className={styles.formFields}>
                    <input
                      type="text"
                      placeholder="Your name (optional)"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className={styles.nameInput}
                    />
                    <input
                      type="email"
                      placeholder="Your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className={styles.emailInput}
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`${styles.signupButton} ${isSubmitting ? styles.loading : ''}`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className={styles.spinner}></div>
                          Joining the waitlist...
                        </>
                      ) : (
                        <>
                          <Mail size={20} />
                          Get Early Access
                        </>
                      )}
                    </button>
                  </div>
                  <p className={styles.signupNote}>
                    🎯 Join our exclusive waitlist and be among the first to create amazing video introductions!
                  </p>
                </motion.form>
              ) : (
                <motion.div
                  className={styles.successMessage}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className={styles.successIcon}>🎉</div>
                  <h3>You're In!</h3>
                  <p>Thanks for joining our waitlist! We'll send you exclusive updates and early access when we launch.</p>
                </motion.div>
              )}
            </div>

            {/* Hero Visual - Using the imported RetroTVSlider component */}
            <motion.div
              className={styles.heroVisual}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <RetroTVSlider />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className={`section ${styles.features}`}>
        <div className="container">
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>What Makes Us Special</h2>
            <p>We're building the ultimate platform for creating professional video introductions that actually get results. Here's what you can expect:</p>
          </motion.div>

          <div className={`grid grid-cols-3 ${styles.featuresGrid}`}>
            <motion.div
              className={`card ${styles.featureCard}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className={styles.featureIcon}>
                <Video size={32} />
              </div>
              <h3>Effortless Recording</h3>
              <p>Our intuitive interface makes recording perfect 10-second introductions a breeze. No technical skills required - just be yourself!</p>
            </motion.div>

            <motion.div
              className={`card ${styles.featureCard}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className={styles.featureIcon}>
                <Sparkles size={32} />
              </div>
              <h3>AI Magic</h3>
              <p>Transform your videos with AI-powered enhancements: better image quality, professional backgrounds, and smart messaging suggestions.</p>
            </motion.div>

            <motion.div
              className={`card ${styles.featureCard}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className={styles.featureIcon}>
                <Share2 size={32} />
              </div>
              <h3>Share Everywhere</h3>
              <p>Seamlessly share your introductions across all platforms - email signatures, LinkedIn, social media, or direct messaging.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Challenge Section */}
      <section className={`section ${styles.challenge}`}>
        <div className="container">
          <motion.div
            className={styles.challengeContent}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>🚀 The 10-Day Launch Challenge</h2>
            <p>We're on a mission to build and launch MyTenSecondStory in just 10 days. Follow our journey and be part of something special from day one!</p>
            <div className={styles.challengeProgress}>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: '30%' }}></div>
              </div>
              <span>Day 3 of 10 - Backend Architecture Complete ✅</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default TempLanding;