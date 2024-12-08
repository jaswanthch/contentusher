import { 
  BlogSuggestion, 
  BlogFormData, 
  InstagramPost, 
  InstagramPostFormData,
  ContentStrategy,
  ContentStrategyFormData,
  GooglePost,
  GooglePostFormData
} from '../types';
import * as api from './api';

const BLOG_SUGGESTIONS_PROMPT = `You are an SEO expert and content strategist. Generate blog post suggestions in JSON format that:
- Target specific keywords for SEO optimization
- Address user search intent
- Follow content marketing best practices
- Include local SEO elements when applicable
- Incorporate business name naturally where appropriate
- Keep titles under 50 characters (including spaces)

Return a JSON object in this exact format:
{
  "suggestions": [{
    "title": "SEO-optimized title (max 50 chars)",
    "description": "Brief description",
    "keywords": ["keyword1", "keyword2", "keyword3"],
    "estimatedReadTime": 5,
    "difficulty": "Beginner"
  }]
}`;

const BLOG_CONTENT_PROMPT = `You are a professional blog writer with expertise in SEO and content marketing. Generate a JSON response for blog content that:
- Has engaging, well-structured content
- Naturally incorporates keywords from the brief
- Maintains the specified tone throughout
- Includes proper headings and subheadings (using Markdown)
- Ensures content is SEO-optimized
- Matches the requested word count
- Includes a compelling introduction and conclusion
- Keeps the title under 50 characters (including spaces)

Return a JSON object in this format:
{
  "content": "# Title\\n\\nContent here..."
}`;

const INSTAGRAM_PROMPT = `You are a social media content expert. Create engaging Instagram posts in JSON format that:
- Have compelling captions that drive engagement
- Include relevant hashtags (max 30)
- Follow Instagram best practices
- Incorporate the business name naturally
- Include clear calls-to-action

Return a JSON object in this exact format:
{
  "posts": [{
    "caption": "Engaging caption with emojis and line breaks",
    "hashtags": ["hashtag1", "hashtag2"]
  }]
}`;

const CONTENT_STRATEGY_PROMPT = `You are a social media strategist. Create a comprehensive content strategy in JSON format that includes:
- Platform-specific best practices
- Content types and themes
- Posting schedule
- Engagement tactics
- Performance metrics
- Content briefs for 7 pieces of content

Return a JSON object in this exact format:
{
  "strategy": {
    "overview": "Strategy summary",
    "targetAudience": {
      "demographics": "Target audience description",
      "interests": ["interest1", "interest2"],
      "painPoints": ["painPoint1", "painPoint2"]
    },
    "contentPlan": {
      "types": ["type1", "type2"],
      "topics": ["topic1", "topic2"],
      "bestPractices": ["practice1", "practice2"],
      "contentBriefs": [{
        "topic": "Content topic",
        "targetKeywords": ["keyword1", "keyword2"],
        "outline": ["section1", "section2"],
        "keyPoints": ["point1", "point2"],
        "targetAudience": "Specific audience",
        "tone": "Content tone",
        "callToAction": "Desired action"
      }]
    },
    "postingSchedule": {
      "frequency": "Posting frequency",
      "bestTimes": ["time1", "time2"],
      "consistency": "Consistency guidelines"
    },
    "engagement": {
      "tactics": ["tactic1", "tactic2"],
      "responses": ["response1", "response2"],
      "monitoring": ["monitor1", "monitor2"]
    },
    "metrics": {
      "kpis": ["kpi1", "kpi2"],
      "tools": ["tool1", "tool2"],
      "goals": ["goal1", "goal2"]
    }
  }
}`;

const GOOGLE_POST_PROMPT = `You are a Google Business Profile expert. Create engaging posts in JSON format that:
- Have clear, action-oriented titles (max 100 characters)
- Include compelling descriptions (max 1500 characters)
- Follow Google Business Profile best practices
- Incorporate the business name naturally
- Include relevant call-to-action buttons

Return a JSON object in this exact format:
{
  "posts": [{
    "title": "Attention-grabbing title",
    "content": "Engaging post content",
    "callToAction": {
      "type": "LEARN_MORE|BOOK|ORDER|BUY|SIGN_UP|CALL|VISIT",
      "label": "Button text"
    },
    "eventDetails": {
      "startDate": "YYYY-MM-DD",
      "endDate": "YYYY-MM-DD",
      "time": "HH:MM AM/PM"
    },
    "offerDetails": {
      "couponCode": "Optional coupon code",
      "terms": "Terms and conditions",
      "expiryDate": "YYYY-MM-DD"
    }
  }]
}

Note: Include eventDetails only for event posts and offerDetails only for offer posts.`;

export async function generateBlogSuggestions(data: {
  businessName: string;
  industry: string;
  location: string;
  contentGoal: string;
  suggestionCount: number;
}): Promise<BlogSuggestion[]> {
  const prompt = `Generate ${data.suggestionCount} SEO-optimized blog post ideas for ${data.businessName}, a ${data.industry} business in ${data.location}.
Content goal: ${data.contentGoal}

Requirements:
1. Each title MUST be under 50 characters (including spaces)
2. Provide a brief description
3. Include 3-5 target keywords
4. Estimate reading time in minutes
5. Specify content difficulty (Beginner/Intermediate/Advanced)

Return the suggestions in JSON format.`;

  const response = await api.generateBlogSuggestions(BLOG_SUGGESTIONS_PROMPT, prompt);
  return response.suggestions;
}

export async function generateBlogContent(data: BlogFormData & { businessName: string }): Promise<string> {
  const prompt = `Write a blog post with the following specifications:

Topic Brief: ${data.brief}
Length: Approximately ${data.length} words
Tone: ${data.tone}
Business Name: ${data.businessName}

Requirements:
- Write a well-structured, engaging blog post
- Naturally incorporate keywords from the brief
- Maintain the specified tone throughout
- Include a compelling title (under 50 characters)
- Use proper headings and subheadings
- Return the content in JSON format`;

  return api.generateBlogContent(BLOG_CONTENT_PROMPT, prompt);
}

export async function generateInstagramPosts(data: InstagramPostFormData & {
  businessName: string;
  industry: string;
}): Promise<InstagramPost[]> {
  const prompt = `Create ${data.postCount} Instagram ${data.postCount === 1 ? 'post' : 'posts'} for ${data.businessName}, a ${data.industry} business.

Topic: ${data.topic}
Tone: ${data.tone}
Call to Action: ${data.callToAction}

Requirements:
1. Write engaging captions with emojis
2. Include relevant hashtags (max 30)
3. Follow Instagram best practices
4. Make content relatable and shareable
5. Return the content in JSON format`;

  const response = await api.generateInstagramPosts(INSTAGRAM_PROMPT, prompt);
  return response.posts;
}

export async function generateContentStrategy(data: ContentStrategyFormData & {
  businessName: string;
  industry: string;
}): Promise<ContentStrategy> {
  const prompt = `Create a comprehensive ${data.platform} content strategy for ${data.businessName}, a ${data.industry} business.

Objective: ${data.contentGoal}
Target Audience: ${data.targetAudience}
Content Types: ${data.contentTypes.join(', ')}
Posting Frequency: ${data.postingFrequency}

Requirements:
1. Create a detailed content strategy
2. Include 7 content briefs aligned with the strategy
3. Provide platform-specific best practices
4. Include engagement tactics and metrics
5. Focus on achieving the stated objective
6. Return the strategy in JSON format`;

  const response = await api.generateContentStrategy(CONTENT_STRATEGY_PROMPT, prompt);
  return response.strategy;
}

export async function generateGooglePosts(data: GooglePostFormData & {
  businessName: string;
  industry: string;
  location: string;
}): Promise<GooglePost[]> {
  const prompt = `Create ${data.postCount} Google Business ${data.postType} ${data.postCount === 1 ? 'post' : 'posts'} for ${data.businessName}, a ${data.industry} business in ${data.location}.

Topic: ${data.topic}
Tone: ${data.tone}
Call to Action: ${data.callToAction}
Post Type: ${data.postType}

Requirements:
1. Write engaging titles and descriptions
2. Include appropriate call-to-action buttons
3. For events, include realistic future dates and times
4. For offers, include relevant terms and expiry dates
5. Keep content concise and action-oriented
6. Follow Google Business Profile character limits
7. Return the content in JSON format`;

  const response = await api.generateGooglePosts(GOOGLE_POST_PROMPT, prompt);
  return response.posts;
}