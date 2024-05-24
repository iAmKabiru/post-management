import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

 create(createCommentDto: CreateCommentDto) {
    const comment = this.commentRepository.create({
      ...createCommentDto,
      post: { id: createCommentDto.postId },
    });
    return this.commentRepository.save(comment);
  }


  findAllByPost(post_id: number){
    return this.commentRepository.find({ where: { post: {id: post_id} } });
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const comment = await this.commentRepository.findOneBy({id});
    return this.commentRepository.save({...comment, ...updateCommentDto});
  }

}
