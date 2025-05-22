import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Video, Eye, Share2, Sparkles } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useVideo } from '../contexts/VideoContext';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const { user } = useAuth();
  const { videos, loading, fetchVideos } = useVideo();

  useEffect(() => {
    fetchVideos();
  }, []);

  const stats = {
    totalVideos: videos.length,
    totalViews: videos.reduce((sum, video) => sum + (video.views || 0), 0),
    totalShares: videos.reduce((sum, video) => sum + (video.shares || 0), 0),
  };

  return (
    <div className={styles.dashboard}>
      <div className="container">
        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h1>Welcome back, {user?.name?.split(' ')[0] || 'Creator'}!</h1>
            <p>Ready to create your next memorable introduction?</p>
          </div>
          <Link to="/create" className="btn btn-primary btn-lg">
            <Plus size={20} />
            Create New Video
          </Link>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          className={styles.statsGrid}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className={`card ${styles.statCard}`}>
            <div className={styles.statIcon}>
              <Video size={24} />
            </div>
            <div className={styles.statContent}>
              <h3>{stats.totalVideos}</h3>
              <p>Videos Created</p>
            </div>
          </div>
          
          <div className={`card ${styles.statCard}`}>
            <div className={styles.statIcon}>
              <Eye size={24} />
            </div>
            <div className={styles.statContent}>
              <h3>{stats.totalViews}</h3>
              <p>Total Views</p>
            </div>
          </div>
          
          <div className={`card ${styles.statCard}`}>
            <div className={styles.statIcon}>
              <Share2 size={24} />
            </div>
            <div className={styles.statContent}>
              <h3>{stats.totalShares}</h3>
              <p>Times Shared</p>
            </div>
          </div>
        </motion.div>

        {/* Recent Videos */}
        <motion.section
          className={styles.recentVideos}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className={styles.sectionHeader}>
            <h2>Recent Videos</h2>
            <Link to="/gallery" className="btn btn-outline">
              View All
            </Link>
          </div>

          {loading ? (
            <div className={styles.loadingGrid}>
              {[...Array(4)].map((_, i) => (
                <div key={i} className={`card ${styles.skeletonCard}`}>
                  <div className={styles.skeletonVideo}></div>
                  <div className={styles.skeletonContent}>
                    <div className={styles.skeletonLine}></div>
                    <div className={styles.skeletonLine}></div>
                  </div>
                </div>
              ))}
            </div>
          ) : videos.length > 0 ? (
            <div className={styles.videosGrid}>
              {videos.slice(0, 4).map((video, index) => (
                <motion.div
                  key={video.id}
                  className={`card ${styles.videoCard}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className={styles.videoThumbnail}>
                    {video.thumbnail_url ? (
                      <img src={video.thumbnail_url} alt={video.title} />
                    ) : (
                      <div className={styles.placeholderThumbnail}>
                        <Video size={32} />
                      </div>
                    )}
                    <div className={styles.videoDuration}>0:10</div>
                    {video.ai_enhanced && (
                      <div className={styles.aiIndicator}>
                        <Sparkles size={12} />
                      </div>
                    )}
                  </div>
                  
                  <div className={styles.videoInfo}>
                    <h3>{video.title || 'Untitled Video'}</h3>
                    <p className={styles.videoDate}>
                      {new Date(video.created_at).toLocaleDateString()}
                    </p>
                    <div className={styles.videoStats}>
                      <span><Eye size={14} /> {video.views || 0}</span>
                      <span><Share2 size={14} /> {video.shares || 0}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              className={styles.emptyState}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Video size={64} className={styles.emptyIcon} />
              <h3>No videos yet</h3>
              <p>Create your first 10-second introduction to get started!</p>
              <Link to="/create" className="btn btn-primary">
                <Plus size={18} />
                Create Your First Video
              </Link>
            </motion.div>
          )}
        </motion.section>

        {/* Quick Actions */}
        <motion.section
          className={styles.quickActions}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2>Quick Actions</h2>
          <div className={styles.actionsGrid}>
            <Link to="/create" className={`card ${styles.actionCard}`}>
              <div className={styles.actionIcon}>
                <Plus size={24} />
              </div>
              <h3>Create Video</h3>
              <p>Record a new 10-second introduction</p>
            </Link>
            
            <Link to="/gallery" className={`card ${styles.actionCard}`}>
              <div className={styles.actionIcon}>
                <Video size={24} />
              </div>
              <h3>Browse Gallery</h3>
              <p>View and manage all your videos</p>
            </Link>
            
            <Link to="/profile" className={`card ${styles.actionCard}`}>
              <div className={styles.actionIcon}>
                <Sparkles size={24} />
              </div>
              <h3>AI Enhancement</h3>
              <p>Improve existing videos with AI</p>
            </Link>
          </div>
        </motion.section>

        {/* Tips Section */}
        <motion.section
          className={styles.tips}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className={`card ${styles.tipsCard}`}>
            <h2>💡 Pro Tips</h2>
            <ul>
              <li>Keep your introduction concise and engaging</li>
              <li>Make eye contact with the camera</li>
              <li>Use good lighting for better video quality</li>
              <li>Try different backgrounds with AI enhancement</li>
              <li>Share your videos across multiple platforms</li>
            </ul>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Dashboard;
