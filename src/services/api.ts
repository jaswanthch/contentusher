const API_BASE_URL = import.meta.env.PROD 
  ? '/api'  // Production: relative path
  : 'http://localhost:5173/api'; // Development: full URL

interface ApiError extends Error {
  status?: number;
  statusText?: string;
}

async function handleResponse(response: Response) {
  if (!response.ok) {
    const error: ApiError = new Error('API request failed');
    error.status = response.status;
    error.statusText = response.statusText;
    
    try {
      const errorData = await response.json();
      error.message = errorData.error || 'An unexpected error occurred';
    } catch {
      error.message = response.status === 404 
        ? 'Server endpoint not found. Please check your configuration.'
        : `Network error: ${response.status} ${response.statusText}`;
    }
    
    throw error;
  }

  const content = await response.json();
  try {
    return typeof content === 'string' ? JSON.parse(content) : content;
  } catch (error) {
    console.error('Failed to parse response:', error);
    throw new Error('Invalid response format from server');
  }
}

async function makeRequest(endpoint: string, data: { systemPrompt: string; prompt: string }) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data),
      signal: controller.signal
    });

    clearTimeout(timeoutId);
    return handleResponse(response);
  } catch (error) {
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error('Unable to connect to the server. Please check your internet connection and try again.');
    }
    if (error.name === 'AbortError') {
      throw new Error('Request timed out. Please try again.');
    }
    throw error;
  }
}

export async function generateBlogSuggestions(systemPrompt: string, prompt: string) {
  return makeRequest('/generate/blog-suggestions', { systemPrompt, prompt });
}

export async function generateBlogContent(systemPrompt: string, prompt: string) {
  const response = await makeRequest('/generate/blog-content', { systemPrompt, prompt });
  return response;
}

export async function generateInstagramPosts(systemPrompt: string, prompt: string) {
  return makeRequest('/generate/instagram-posts', { systemPrompt, prompt });
}

export async function generateContentStrategy(systemPrompt: string, prompt: string) {
  return makeRequest('/generate/content-strategy', { systemPrompt, prompt });
}

export async function generateGooglePosts(systemPrompt: string, prompt: string) {
  return makeRequest('/generate/google-posts', { systemPrompt, prompt });
}