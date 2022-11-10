import { ApiProperty } from "@nestjs/swagger"

export class MementoDTO
{
    @ApiProperty()
    title: string
    @ApiProperty()
    content: string
    @ApiProperty()
    date: Date
}