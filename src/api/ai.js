import { api } from './index';

export const aiAPI = {
  // Enhance image quality
  enhanceImage: async (imageFile, options = {}) => {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      formData.append('enhancement_type', options.type || 'quality');
      formData.append('options', JSON.stringify(options));

      const response = await api.post('/ai/enhance-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 60000, // AI processing can take time
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to enhance image');
    }
  },

  // Generate backdrop/background
  generateBackdrop: async (prompt, style = 'professional') => {
    try {
      const response = await api.post('/ai/generate-backdrop', {
        prompt,
        style,
        dimensions: { width: 1920, height: 1080 }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to generate backdrop');
    }
  },

  // Remove/replace background
  removeBackground: async (imageFile, replacement = null) => {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      if (replacement) {
        formData.append('replacement', replacement);
      }

      const response = await api.post('/ai/remove-background', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to remove background');
    }
  },

  // Generate clever message/caption
  generateMessage: async (context, tone = 'professional') => {
    try {
      const response = await api.post('/ai/generate-message', {
        context,
        tone, // professional, humorous, casual, creative
        max_length: 280 // Twitter-friendly length
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to generate message');
    }
  },

  // Generate introduction script
  generateIntroScript: async (userInfo, purpose, tone = 'professional') => {
    try {
      const response = await api.post('/ai/generate-intro-script', {
        user_info: userInfo,
        purpose,
        tone,
        duration: 10 // seconds
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to generate intro script');
    }
  },

  // Analyze video content
  analyzeVideo: async (videoFile) => {
    try {
      const formData = new FormData();
      formData.append('video', videoFile);

      const response = await api.post('/ai/analyze-video', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 120000, // 2 minutes for video analysis
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to analyze video');
    }
  },

  // Generate OG image for sharing
  generateOGImage: async (videoId, customText = null) => {
    try {
      const response = await api.post('/ai/generate-og-image', {
        video_id: videoId,
        custom_text: customText,
        dimensions: { width: 1200, height: 630 } // OG image standard
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to generate OG image');
    }
  },

  // Suggest improvements
  suggestImprovements: async (videoId) => {
    try {
      const response = await api.post('/ai/suggest-improvements', {
        video_id: videoId
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to get suggestions');
    }
  },

  // Generate video title
  generateTitle: async (videoContent, tone = 'professional') => {
    try {
      const response = await api.post('/ai/generate-title', {
        content: videoContent,
        tone,
        max_length: 60
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to generate title');
    }
  },

  // Get AI processing status
  getProcessingStatus: async (jobId) => {
    try {
      const response = await api.get(`/ai/status/${jobId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to get processing status');
    }
  },
};
