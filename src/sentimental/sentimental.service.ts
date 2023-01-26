import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSentimentalDto } from './dto/create-sentimental.dto';
import { UpdateSentimentalDto } from './dto/update-sentimental.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sentimental } from './entities/sentimental.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SentimentalService {
  constructor(
    @InjectRepository(Sentimental)
    private sentimentalRepository: Repository<Sentimental>,
  ) {}

  async create(createSentimentalDto: CreateSentimentalDto): Promise<any> {
    const { name } = createSentimentalDto;
    try {
      const found = await this.sentimentalRepository.findOne({
        where: { name: name },
      });
      if (found) {
        return {
          message: `El estado ${name} ya se encuentra en la DB`,
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          data: found,
        };
      }

      await this.sentimentalRepository.save(createSentimentalDto);
      return {
        message: `El estado ${name} fue creado exitosamente`,
        status: HttpStatus.CREATED,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: `Ocurrió un error al intentar crear el estado con # ${name}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<any> {
    try {
      const countries = await this.sentimentalRepository.find({});

      if (!countries.length) {
        throw new HttpException(
          {
            message: 'No hay estados en la base de datos',
          },
          HttpStatus.NO_CONTENT,
        );
      }

      return countries;
    } catch (error) {
      throw new HttpException(
        {
          message: 'Hubo un error al intentar encontrar los estados',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOne(id: number): Promise<any> {
    try {
      const country = await this.sentimentalRepository.findOne({
        where: { sentimental_id: id },
      });
      if (!country) {
        throw new HttpException(
          {
            message: `No se encontró el estado con #ID  ${id}  en nuestra base de datos`,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return country;
    } catch (error) {
      throw new HttpException(
        {
          message: `No se encontró el estado con #ID ${id} en nuestra base de datos`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async update(
    id: number,
    updateSentimentalDto: UpdateSentimentalDto,
  ): Promise<any> {
    try {
      const country = await this.sentimentalRepository.findOne({
        where: { sentimental_id: id },
      });
      if (!country) {
        throw new HttpException(
          {
            message: `El estado con #ID ${id} no se encuentra en la base de datos`,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      const updatedUser = Object.assign(country, updateSentimentalDto);
      await this.sentimentalRepository.save(updatedUser);
      return {
        message: `El estado con #ID ${id} ha sido actualizado`,
        user: updatedUser,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: `Ocurrió un error al intentar actualizar el estado con #ID ${id}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number): Promise<any> {
    try {
      const country = await this.sentimentalRepository.findOne({
        where: { sentimental_id: id },
      });
      if (!country) {
        return {
          message: `El estado con #ID ${id} no se encuentra en la base de datos`,
          status: HttpStatus.CONFLICT,
        };
      }
      await this.sentimentalRepository.remove(country);
      return {
        message: `El estado con #ID ${id} ha sido eliminado`,
        status: HttpStatus.NO_CONTENT,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: `Ocurrió un error al intentar eliminar el estado con #ID ${id}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
