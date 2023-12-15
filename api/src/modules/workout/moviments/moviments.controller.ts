import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateMovimentDto } from './dto/create-moviment.dto';
import { MovimentsService } from './moviments.service';

@Controller('moviments')
export class MovimentsController {
  constructor(private readonly movimentsService: MovimentsService) {}

  @Post()
  create(@Body() createMovimentDto: CreateMovimentDto) {
    return this.movimentsService.create(createMovimentDto);
  }

  @Get()
  findAll() {
    return this.movimentsService.findAll();
  }

  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.movimentsService.delete(id);
  }

  @HttpCode(204)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() createMovimentDto: CreateMovimentDto,
  ) {
    await this.movimentsService.update(id, createMovimentDto);
  }
}
