// postService.js

// Function to upload a post
export const uploadPost = async (postData) => {
  try {
    const response = await fetch('http://localhost:8082/api/posts/upload', {
      method: 'POST',
      body: postData,
    });

    if (response.ok) {
      // If the response is successful, parse and return the data
      const data = await response.json();
      return { success: true, data };
    } else {
      // If there's an error, return a failure message
      return { success: false, error: 'Failed to upload post' };
    }
  } catch (error) {
    // If there's a network error or other exception, return an error message
    console.error('Error uploading post:', error);
    return { success: false, error: 'Network error' };
  }
};
