import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import axios from 'axios';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

export interface InstagramPost {
  id: string;
  images: string[];
  caption: string;
  category: string;
  timestamp: string;
}

@Injectable()
export class InstagramService {
  private readonly logger = new Logger(InstagramService.name);
  private posts: InstagramPost[] = [];

  constructor(private configService: ConfigService) {}

  private async fetchInstagramPosts(): Promise<InstagramPost[]> {
    const accessToken = this.configService.get<string>('FACEBOOK_ACCESS_TOKEN');
    const businessAccountId = this.configService.get<string>(
      'INSTAGRAM_BUSINESS_ACCOUNT_ID'
    );

    try {
      const response = await axios.get(
        `https://graph.facebook.com/v21.0/${businessAccountId}/media`,
        {
          params: {
            fields: this.configService.get<string>(
              'PARAM_FIELDS'
            ),
            access_token: accessToken,
          },
        }
      );
      
      return response.data.data.map((post: any) => ({
        id: post.id,
        images:
          post.media_type === 'CAROUSEL_ALBUM'
            ? [post.media_url]
            : [post.media_url],
        caption: post.caption || '',
        category: this.determineCategory(post.caption || ''),
        timestamp: post.timestamp,
        thumbnail_url: post.thumbnail_url,
        permalink: post.permalink,
      }));
    } catch (error) {
      this.logger.error('Error fetching Instagram posts:', error);
      return [];
    }
  }

  @Cron(CronExpression.EVERY_HOUR)
  async fetchPosts() {
    this.posts = await this.fetchInstagramPosts();
    this.logger.log(`Fetched ${this.posts.length} posts from Instagram`);
  }

  private determineCategory(caption: string): string {
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
      if (
        keywords.some((keyword) =>
          caption.toLowerCase().includes(keyword.toLowerCase())
        )
      ) {
        return category;
      }
    }
    return 'outros';
  }

  async getPosts(): Promise<InstagramPost[]> {
    if (this.posts.length === 0) {
      await this.fetchPosts();
    }
    return [...this.posts];
  }

  async getPostsByCategory(category: string): Promise<InstagramPost[]> {
    const posts = await this.getPosts();
    return posts.filter((post) => post.category === category);
  }
}
