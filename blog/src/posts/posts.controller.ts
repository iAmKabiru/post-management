import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post as BlogPost } from './entities/post.entity';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @ApiCreatedResponse({
    description: 'Post created successfully',
    type: CreatePostDto
  })
  @ApiBadRequestResponse({
    description: 'Post creation failed'
  })
  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }


  @ApiOkResponse({
    description: 'List of posts retrieved successfully',
    type: [CreatePostDto]
  })
  @ApiBadRequestResponse({
    description: 'Retreiving post list failed'
  })
  @Get()
  findAll() {
    return this.postsService.findAll();
  }


  @ApiOkResponse({
    description: 'Post retrieved successfully',
    type: CreatePostDto
  })
  @ApiNotFoundResponse({
    description: 'Post not found'
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }



  @ApiOkResponse({
    description: 'Post updated successfully',
    type: UpdatePostDto
  })
  @ApiNotFoundResponse({
    description: 'Post not found'
  })
  @ApiBadRequestResponse({
    description: 'Post update failed'
  })
  @Patch(':id')
  update(@Param('id') id: number, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @ApiOkResponse({
    description: 'Post deleted successfully'
  })
  @ApiNotFoundResponse({
    description: 'Post not found'
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
