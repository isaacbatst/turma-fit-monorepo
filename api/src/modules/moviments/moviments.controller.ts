import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
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
  remove(@Param('id') id: string) {
    return this.movimentsService.delete(id);
  }
}
