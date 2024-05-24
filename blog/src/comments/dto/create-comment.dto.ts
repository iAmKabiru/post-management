import { ApiProperty } from "@nestjs/swagger";

export class CreateCommentDto {
    @ApiProperty({
        description: 'Id of the post',
        example: 1
    })
    postId: number;

    @ApiProperty({
        description: 'Content of the comment',
        example: 'Comment content'
    })
    content: string;
}
