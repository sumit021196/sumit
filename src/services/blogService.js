import { supabase } from '../supabaseClient';

/**
 * Blog Service for fetching and managing blog posts
 * Handles all Supabase interactions for blog functionality
 */

/**
 * Fetch all published blog posts with pagination
 * @param {number} limit - Number of posts to fetch
 * @param {number} offset - Offset for pagination
 * @param {string} category - Optional category filter
 * @returns {Promise<{posts: Array, total: number}>}
 */
export const fetchBlogPosts = async (limit = 10, offset = 0, category = null) => {
  try {
    let query = supabase
      .from('blog_posts')
      .select('*', { count: 'exact' })
      .eq('is_published', true)
      .order('published_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error, count } = await query;

    if (error) throw error;

    return {
      posts: data || [],
      total: count || 0
    };
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw error;
  }
};

/**
 * Fetch a single blog post by slug
 * @param {string} slug - URL slug of the blog post
 * @returns {Promise<Object>}
 */
export const fetchBlogPostBySlug = async (slug) => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .single();

    if (error) throw error;

    // Increment view count
    if (data) {
      await incrementViewCount(data.id);
    }

    return data;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    throw error;
  }
};

/**
 * Increment view count for a blog post
 * @param {string} postId - UUID of the blog post
 */
const incrementViewCount = async (postId) => {
  try {
    await supabase.rpc('increment_views', { post_id: postId });
  } catch (error) {
    console.error('Error incrementing view count:', error);
  }
};

/**
 * Fetch featured blog posts
 * @param {number} limit - Number of featured posts
 * @returns {Promise<Array>}
 */
export const fetchFeaturedPosts = async (limit = 3) => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('is_published', true)
      .eq('is_featured', true)
      .order('published_at', { ascending: false })
      .limit(limit);

    if (error) throw error;

    return data || [];
  } catch (error) {
    console.error('Error fetching featured posts:', error);
    throw error;
  }
};

/**
 * Fetch all blog categories
 * @returns {Promise<Array>}
 */
export const fetchCategories = async () => {
  try {
    const { data, error } = await supabase
      .from('blog_categories')
      .select('*')
      .order('name');

    if (error) throw error;

    return data || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

/**
 * Search blog posts by keyword
 * @param {string} searchTerm - Search keyword
 * @returns {Promise<Array>}
 */
export const searchBlogPosts = async (searchTerm) => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('is_published', true)
      .or(`title.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%,excerpt.ilike.%${searchTerm}%`)
      .order('published_at', { ascending: false })
      .limit(20);

    if (error) throw error;

    return data || [];
  } catch (error) {
    console.error('Error searching blog posts:', error);
    throw error;
  }
};

/**
 * Fetch related posts based on tags
 * @param {Array} tags - Array of tags
 * @param {string} excludeId - Post ID to exclude (current post)
 * @param {number} limit - Number of related posts
 * @returns {Promise<Array>}
 */
export const fetchRelatedPosts = async (tags, excludeId, limit = 3) => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('is_published', true)
      .neq('id', excludeId)
      .contains('tags', tags)
      .order('published_at', { ascending: false })
      .limit(limit);

    if (error) throw error;

    return data || [];
  } catch (error) {
    console.error('Error fetching related posts:', error);
    return [];
  }
};

/**
 * Submit a comment on a blog post
 * @param {Object} commentData - Comment data
 * @returns {Promise<Object>}
 */
export const submitComment = async (commentData) => {
  try {
    const { data, error } = await supabase
      .from('blog_comments')
      .insert([{
        blog_post_id: commentData.postId,
        author_name: commentData.name,
        author_email: commentData.email,
        content: commentData.content,
        is_approved: false
      }]);

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error('Error submitting comment:', error);
    throw error;
  }
};

/**
 * Fetch popular posts by view count
 * @param {number} limit - Number of posts
 * @returns {Promise<Array>}
 */
export const fetchPopularPosts = async (limit = 5) => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('id, title, slug, views_count, reading_time')
      .eq('is_published', true)
      .order('views_count', { ascending: false })
      .limit(limit);

    if (error) throw error;

    return data || [];
  } catch (error) {
    console.error('Error fetching popular posts:', error);
    return [];
  }
};
