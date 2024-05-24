import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiCreatedResponse({
    description: 'Comment created successfully',
    type: CreateCommentDto
  })
  @ApiBadRequestResponse({
    description: 'Comment creation failed'
  })
  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @ApiOkResponse({
    description: 'List of comment retrieved successfully',
    type: [CreateCommentDto]
  })
  @ApiBadRequestResponse({
    description: 'Retreiving comment list failed'
  })
  @Get(':post_id')
  findAllByPost(@Param('post_id') post_id: number) {
    return this.commentsService.findAllByPost(post_id);
  }

  @ApiOkResponse({
    description: 'Comment retrieved successfully',
    type: CreateCommentDto
  })
  @ApiNotFoundResponse({
    description: 'Comment not found'
  })
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(+id, updateCommentDto);
  }
}
