import { Controller, Get, Param, HttpException, HttpStatus } from '@nestjs/common';
import { InstagramService,  InstagramPost} from './instagram.service';

@Controller('api/instagram')
export class InstagramController {
    constructor(private readonly instagramService: InstagramService) {}

    @Get('posts')
    async getPosts(): Promise<InstagramPost[]> {
        try {
            return await this.instagramService.getPosts();
        } catch (error) {
            throw new HttpException(
                'Failed to fetch Instagram posts',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    @Get('posts/:category')
    async getPostsByCategory(@Param('category') category: string): Promise<InstagramPost[]> {
        try {
            return await this.instagramService.getPostsByCategory(category);
        } catch (error) {
            throw new HttpException(
                'Failed to fetch category posts',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
}