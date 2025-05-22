import React from 'react';
import { motion } from 'framer-motion';
import { Play, Video, Users, Sparkles, Share2, Zap } from 'lucide-react';
import LoginButton from '../components/auth/LoginButton';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <motion.div
            className={styles.heroContent}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1
              className={styles.heroTitle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Create Memorable
              <span className={styles.highlight}> 10-Second </span>
              Video Introductions
            </motion.h1>
            
            <motion.p
              className={styles.heroSubtitle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Connect with anyone through personalized video messages enhanced with AI.
              Professional or playful - make every introduction count.
            </motion.p>
            
            <motion.div
              className={styles.heroActions}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <LoginButton variant="primary" size="lg">
                <Play size={20} />
                Get Started Free
              </LoginButton>
              
              <button className={`btn btn-outline btn-lg ${styles.watchDemo}`}>
                <Video size={20} />
                Watch Demo
              </button>
            </motion.div>
          </motion.div>
          
          <motion.div
            className={styles.heroVisual}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className={styles.videoPreview}>
              <div className={styles.videoFrame}>
                <div className={styles.videoPlaceholder}>
                  <Play size={48} className={styles.playIcon} />
                </div>
                <div className={styles.videoOverlay}>
                  <span className={styles.duration}>0:10</span>
                </div>
              </div>
              <motion.div
                className={styles.aiIndicator}
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Sparkles size={16} />
                AI Enhanced
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`section ${styles.features}`}>
        <div className="container">
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Everything You Need to Stand Out</h2>
            <p>Create, enhance, and share professional video introductions with cutting-edge AI technology.</p>
          </motion.div>
          
          <div className={`grid grid-cols-3 ${styles.featuresGrid}`}>
            <motion.div
              className={`card ${styles.featureCard}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className={styles.featureIcon}>
                <Video size={32} />
              </div>
              <h3>Quick Recording</h3>
              <p>Record perfect 10-second introductions with our intuitive interface. No experience needed.</p>
            </motion.div>
            
            <motion.div
              className={`card ${styles.featureCard}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className={styles.featureIcon}>
                <Sparkles size={32} />
              </div>
              <h3>AI Enhancement</h3>
              <p>Improve image quality, change backgrounds, and get clever messaging suggestions powered by AI.</p>
            </motion.div>
            
            <motion.div
              className={`card ${styles.featureCard}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className={styles.featureIcon}>
                <Share2 size={32} />
              </div>
              <h3>Easy Sharing</h3>
              <p>Share via email, text, LinkedIn, or any social platform with custom messaging and previews.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className={`section ${styles.howItWorks}`}>
        <div className="container">
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>How It Works</h2>
            <p>Three simple steps to create your perfect video introduction</p>
          </motion.div>
          
          <div className={styles.stepsContainer}>
            {[
              {
                step: 1,
                title: "Record",
                description: "Capture your 10-second introduction using our guided recording interface",
                icon: <Video size={24} />
              },
              {
                step: 2,
                title: "Enhance",
                description: "Let AI improve your video quality, suggest backgrounds, and create clever messages",
                icon: <Sparkles size={24} />
              },
              {
                step: 3,
                title: "Share",
                description: "Send your personalized introduction via email, text, or social media",
                icon: <Share2 size={24} />
              }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                className={styles.step}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className={styles.stepNumber}>
                  <span>{item.step}</span>
                </div>
                <div className={styles.stepContent}>
                  <div className={styles.stepIcon}>
                    {item.icon}
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className={`section ${styles.useCases}`}>
        <div className="container">
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Perfect For Every Occasion</h2>
            <p>Whether professional networking or casual connections, make every introduction memorable</p>
          </motion.div>
          
          <div className={`grid grid-cols-2 ${styles.useCasesGrid}`}>
            <motion.div
              className={styles.useCase}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className={styles.useCaseIcon}>
                <Users size={32} />
              </div>
              <h3>Professional Networking</h3>
              <p>Stand out on LinkedIn, reach out to potential clients, or introduce yourself to new colleagues with polished video messages.</p>
            </motion.div>
            
            <motion.div
              className={styles.useCase}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className={styles.useCaseIcon}>
                <Zap size={32} />
              </div>
              <h3>Personal Connections</h3>
              <p>Break the ice with humor, introduce yourself to online communities, or send personalized thank you messages.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`section ${styles.cta}`}>
        <div className="container">
          <motion.div
            className={styles.ctaContent}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Ready to Make Your Mark?</h2>
            <p>Join thousands of users creating memorable introductions with MyTenSecondStory</p>
            <LoginButton variant="primary" size="lg">
              <Play size={20} />
              Start Creating Now
            </LoginButton>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
