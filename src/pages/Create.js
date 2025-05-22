import React from 'react';
import styles from './Create.module.css';

const Create = () => {
  return (
    <div className={styles.create}>
      <div className="container">
        <h1>Create Video</h1>
        <p>Video creation interface coming soon!</p>
        <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
          <h3>📹 Video Recording</h3>
          <p>This is where users will record their 10-second introductions</p>
        </div>
      </div>
    </div>
  );
};

export default Create;
