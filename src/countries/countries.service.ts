import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { Country } from './entities/country.entity';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Country) private repositoryContry: Repository<Country>,
  ) {}

  async create(createCountryDto: CreateCountryDto): Promise<any> {
    const { name } = createCountryDto;
    try {
      const found = await this.repositoryContry.findOne({
        where: { name: name },
      });
      if (found) {
        return {
          message: `El pais ${name} ya se encuentra en la DB`,
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          data: found,
        };
      }

      await this.repositoryContry.save(createCountryDto);
      return {
        message: `El pais ${name} fue creado exitosamente`,
        status: HttpStatus.CREATED,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: `Ocurrió un error al intentar crear el pais con # ${name}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<any> {
    try {
      const countries = await this.repositoryContry.find({});

      if (!countries.length) {
        throw new HttpException(
          {
            message: 'No hay paises en la base de datos',
          },
          HttpStatus.NO_CONTENT,
        );
      }

      return countries;
    } catch (error) {
      throw new HttpException(
        {
          message: 'Hubo un error al intentar encontrar los paises',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOne(id: number): Promise<any> {
    try {
      const country = await this.repositoryContry.findOne({
        where: { country_id: id },
      });
      if (!country) {
        throw new HttpException(
          {
            message: `No se encontró el pais con #ID  ${id}  en nuestra base de datos`,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return country;
    } catch (error) {
      throw new HttpException(
        {
          message: `No se encontró el pais con #ID ${id} en nuestra base de datos`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async update(id: number, UpdateCountryDto: UpdateCountryDto): Promise<any> {
    try {
      const country = await this.repositoryContry.findOne({
        where: { country_id: id },
      });
      if (!country) {
        throw new HttpException(
          {
            message: `El pais con #ID ${id} no se encuentra en la base de datos`,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      const updatedUser = Object.assign(country, UpdateCountryDto);
      await this.repositoryContry.save(updatedUser);
      return {
        message: `El pais con #ID ${id} ha sido actualizado`,
        user: updatedUser,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: `Ocurrió un error al intentar actualizar el pais con #ID ${id}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number): Promise<any> {
    try {
      const country = await this.repositoryContry.findOne({
        where: { country_id: id },
      });
      if (!country) {
        return {
          message: `El pais con #ID ${id} no se encuentra en la base de datos`,
          status: HttpStatus.CONFLICT,
        };
      }
      await this.repositoryContry.remove(country);
      return {
        message: `El pais con #ID ${id} ha sido eliminado`,
        status: HttpStatus.NO_CONTENT,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: `Ocurrió un error al intentar eliminar el pais con #ID ${id}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
