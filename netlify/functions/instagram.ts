import { Handler } from '@netlify/functions';
import axios from 'axios';

interface InstagramPost {
  id: string;
  images: string[];
  caption: string;
  category: string;
  timestamp: string;
  permalink: string;
  thumbnail_url: string;
}

interface IGMedia {
  id: string;
  caption: string;
  media_type: string;
  media_url: string;
  permalink: string;
  thumbnail_url: string;
  timestamp: string;
  children?: {
    data: Array<{
      id: string;
      media_type: string;
      media_url: string;
    }>;
  };
}

function determineCategory(caption: string): string {
  const categoryKeywords = {
    buques: ['buquê', 'buque', 'bouquet'],
    samambaias: ['samambaia'],
    orquideas: ['orquídea', 'orquidea'],
    cestas: ['cesta', 'café da manhã'],
    penduradas: ['pendente'],
    carnivoras: ['carnívora', 'carnivora'],
    flores: ['flor', 'flores'],
    suculentas: ['suculenta', 'suculentas'],
    arranjos: ['arranjo'],
    frutifera: ['frutífera', 'frutifera'],
  };

  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    if (keywords.some(keyword => 
      caption.toLowerCase().includes(keyword.toLowerCase())
    )) {
      return category;
    }
  }

  return 'outros';
}

async function getInstagramPosts(): Promise<InstagramPost[]> {
  const { INSTAGRAM_BUSINESS_ACCOUNT_ID, FACEBOOK_ACCESS_TOKEN, PARAM_FIELDS } = process.env;
  
  try {
    const response = await axios.get(
      `https://graph.facebook.com/v21.0/${INSTAGRAM_BUSINESS_ACCOUNT_ID}/media`,
      {
        params: {
          access_token: FACEBOOK_ACCESS_TOKEN,
          fields: PARAM_FIELDS,
          limit: 100,
        },
      }
    );

    const posts: InstagramPost[] = response.data.data.map((post: IGMedia) => ({
      id: post.id,
      images:
        post.media_type === 'CAROUSEL_ALBUM'
          ? [post.media_url]
          : [post.media_url],
      caption: post.caption || '',
      category: determineCategory(post.caption || ''),
      timestamp: post.timestamp,
      thumbnail_url: post.thumbnail_url,
      permalink: post.permalink,
    }));

    return posts;
  } catch (error) {
    console.error('Error fetching Instagram posts:', error);
    throw error;
  }
}

export const handler: Handler = async (event) => {
  try {
    const data = await getInstagramPosts();
    const { category } = event.queryStringParameters || {};
    
    const filteredPosts = data.filter((post: InstagramPost) => 
      category ? post.category === category : true
    );

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(filteredPosts),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch Instagram posts' }),
    };
  }
};