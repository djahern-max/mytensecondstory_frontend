import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './RetroTVSlider.module.css';

// Import images from the same directory
import NotHandsome from './images_temp/NotHandsome.png';
import Handsome from './images_temp/Handsome.png';
import NotHandsome2 from './images_temp/NotHandsome2.png';
import Handsome2 from './images_temp/Handsome2.png';

const RetroTVSlider = () => {
    const [sliderValue, setSliderValue] = useState(0);
    const [currentImageSet, setCurrentImageSet] = useState(0);

    // Image sets using imported images
    const imageSets = [
        {
            notHandsome: NotHandsome,
            handsome: Handsome
        },
        {
            notHandsome: NotHandsome2,
            handsome: Handsome2
        }
    ];

    const handleSliderChange = (e) => {
        setSliderValue(parseInt(e.target.value));
    };

    const switchImageSet = () => {
        setCurrentImageSet((prev) => (prev + 1) % imageSets.length);
        setSliderValue(50); // Start at middle when switching images
    };

    const getTransformText = () => {
        if (sliderValue < 20) return "😔 Needs Enhancement";
        if (sliderValue < 40) return "🤔 Getting Better";
        if (sliderValue < 60) return "😊 Not Quite There Yet";
        if (sliderValue < 80) return "😎 Pretty Good";
        return "🔥 READY TO NETWORK!";
    };

    return (
        <motion.div
            className={styles.container}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            {/* Retro TV Container */}
            <div className={styles.tvContainer}>
                {/* TV Brand Label */}
                <div className={styles.tvBrand}>
                    IMAGE ENHANCOR
                </div>

                {/* TV Screen */}
                <div className={styles.tvScreen}>
                    {/* Scanlines Effect */}
                    <div className={styles.scanlines} />

                    {/* Image Container */}
                    <div className={styles.imageContainer}>
                        {/* Not Handsome Image */}
                        <img
                            src={imageSets[currentImageSet].notHandsome}
                            alt="Before transformation"
                            className={styles.beforeImage}
                            style={{ opacity: (100 - sliderValue) / 100 }}
                        />

                        {/* Handsome Image */}
                        <img
                            src={imageSets[currentImageSet].handsome}
                            alt="After transformation"
                            className={styles.afterImage}
                            style={{ opacity: sliderValue / 100 }}
                        />

                        {/* Transformation Effect Overlay */}
                        <div
                            className={styles.transformOverlay}
                            style={{
                                background: sliderValue > 50
                                    ? 'radial-gradient(circle, rgba(255,215,0,0.2) 0%, transparent 70%)'
                                    : 'none'
                            }}
                        />
                    </div>

                    {/* Status Text Overlay */}
                    <motion.div
                        key={getTransformText()}
                        className={`${styles.statusText} ${sliderValue > 70 ? styles.statusTextGold : ''}`}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                    >
                        {getTransformText()}
                    </motion.div>

                    {/* 0:10 Duration Label */}
                    <div className={styles.durationLabel}>
                        0:10
                    </div>
                </div>

                {/* Control Panel */}
                <div className={styles.controlPanel}>
                    {/* Slider Label */}
                    <div className={styles.sliderLabel}>
                        ✨ MINGLE-OMETER: {sliderValue}% ✨
                    </div>

                    {/* Custom Slider */}
                    <div className={styles.sliderContainer}>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={sliderValue}
                            onChange={handleSliderChange}
                            className={styles.slider}
                        />
                    </div>

                    {/* Switch Images Button */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={switchImageSet}
                        className={styles.switchButton}
                    >
                        🔄 TRY DIFFERENT PERSON ({currentImageSet + 1}/{imageSets.length})
                    </motion.button>
                </div>

                {/* TV Legs */}
                <div className={`${styles.tvLeg} ${styles.tvLegLeft}`} />
                <div className={`${styles.tvLeg} ${styles.tvLegRight}`} />
            </div>
        </motion.div>
    );
};

export default RetroTVSlider;