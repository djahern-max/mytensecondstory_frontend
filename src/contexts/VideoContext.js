import React, { createContext, useContext, useReducer } from 'react';
import { videoAPI } from '../api/videos';
import { toast } from 'react-hot-toast';

const VideoContext = createContext();

// Video reducer
const videoReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_RECORDING':
      return { ...state, isRecording: action.payload };
    case 'SET_CURRENT_VIDEO':
      return { ...state, currentVideo: action.payload };
    case 'SET_VIDEOS':
      return { ...state, videos: action.payload };
    case 'ADD_VIDEO':
      return { ...state, videos: [action.payload, ...state.videos] };
    case 'UPDATE_VIDEO':
      return {
        ...state,
        videos: state.videos.map(video =>
          video.id === action.payload.id ? action.payload : video
        ),
        currentVideo: state.currentVideo?.id === action.payload.id ? action.payload : state.currentVideo
      };
    case 'DELETE_VIDEO':
      return {
        ...state,
        videos: state.videos.filter(video => video.id !== action.payload),
        currentVideo: state.currentVideo?.id === action.payload ? null : state.currentVideo
      };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};

// Initial state
const initialState = {
  videos: [],
  currentVideo: null,
  isRecording: false,
  loading: false,
  error: null,
};

export const VideoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(videoReducer, initialState);

  const startRecording = () => {
    dispatch({ type: 'SET_RECORDING', payload: true });
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const stopRecording = () => {
    dispatch({ type: 'SET_RECORDING', payload: false });
  };

  const setCurrentVideo = (video) => {
    dispatch({ type: 'SET_CURRENT_VIDEO', payload: video });
  };

  const fetchVideos = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const videos = await videoAPI.getUserVideos();
      dispatch({ type: 'SET_VIDEOS', payload: videos });
    } catch (error) {
      console.error('Failed to fetch videos:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
      toast.error('Failed to load videos');
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const saveVideo = async (videoData, metadata = {}) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const formData = new FormData();
      formData.append('video', videoData);
      formData.append('metadata', JSON.stringify(metadata));

      const savedVideo = await videoAPI.uploadVideo(formData);
      dispatch({ type: 'ADD_VIDEO', payload: savedVideo });
      dispatch({ type: 'SET_CURRENT_VIDEO', payload: savedVideo });
      
      toast.success('Video saved successfully!');
      return savedVideo;
    } catch (error) {
      console.error('Failed to save video:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
      toast.error('Failed to save video');
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const updateVideo = async (videoId, updates) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const updatedVideo = await videoAPI.updateVideo(videoId, updates);
      dispatch({ type: 'UPDATE_VIDEO', payload: updatedVideo });
      toast.success('Video updated successfully!');
      return updatedVideo;
    } catch (error) {
      console.error('Failed to update video:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
      toast.error('Failed to update video');
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const deleteVideo = async (videoId) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      await videoAPI.deleteVideo(videoId);
      dispatch({ type: 'DELETE_VIDEO', payload: videoId });
      toast.success('Video deleted successfully!');
    } catch (error) {
      console.error('Failed to delete video:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
      toast.error('Failed to delete video');
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const enhanceVideo = async (videoId, enhancements) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const enhancedVideo = await videoAPI.enhanceVideo(videoId, enhancements);
      dispatch({ type: 'UPDATE_VIDEO', payload: enhancedVideo });
      toast.success('Video enhanced successfully!');
      return enhancedVideo;
    } catch (error) {
      console.error('Failed to enhance video:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
      toast.error('Failed to enhance video');
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const value = {
    videos: state.videos,
    currentVideo: state.currentVideo,
    isRecording: state.isRecording,
    loading: state.loading,
    error: state.error,
    startRecording,
    stopRecording,
    setCurrentVideo,
    fetchVideos,
    saveVideo,
    updateVideo,
    deleteVideo,
    enhanceVideo,
  };

  return (
    <VideoContext.Provider value={value}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideo = () => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error('useVideo must be used within a VideoProvider');
  }
  return context;
};
