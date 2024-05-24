import { ApiProperty } from "@nestjs/swagger";

export class CreatePostDto {
    @ApiProperty({
        description: 'Title of the post'
    })
    title: string;

    @ApiProperty({
        description: 'Description of the post'
    })
    content: string;
}
