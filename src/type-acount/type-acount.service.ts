import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTypeAcountDto } from './dto/create-type-acount.dto';
import { UpdateTypeAcountDto } from './dto/update-type-acount.dto';
import { TypeAcount } from './entities/type-acount.entity';

@Injectable()
export class TypeAcountService {
  constructor(
    @InjectRepository(TypeAcount)
    private typeAcountRepository: Repository<TypeAcount>,
  ) {}

  async create(createTypeAcountDto: CreateTypeAcountDto): Promise<any> {
    const { name } = createTypeAcountDto;
    try {
      const found = await this.typeAcountRepository.findOne({
        where: { name: name },
      });
      if (found) {
        return {
          message: `El tipo de cuenta ${name} ya se encuentra en la DB`,
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          data: found,
        };
      }

      await this.typeAcountRepository.save(createTypeAcountDto);
      return {
        message: `El tipo de cuenta ${name} fue creado exitosamente`,
        status: HttpStatus.CREATED,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: `Ocurrió un error al intentar crear el tipo de cuenta con # ${name}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<any> {
    try {
      const countries = await this.typeAcountRepository.find({});

      if (!countries.length) {
        throw new HttpException(
          {
            message: 'No hay tipos de cuentas en la base de datos',
          },
          HttpStatus.NO_CONTENT,
        );
      }

      return countries;
    } catch (error) {
      throw new HttpException(
        {
          message: 'Hubo un error al intentar encontrar los tipo de cuentas',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOne(id: number): Promise<any> {
    try {
      const country = await this.typeAcountRepository.findOne({
        where: { typeAcount_id: id },
      });
      if (!country) {
        throw new HttpException(
          {
            message: `No se encontró el tipo de cuenta con #ID  ${id}  en nuestra base de datos`,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return country;
    } catch (error) {
      throw new HttpException(
        {
          message: `No se encontró el tipo de cuenta con #ID ${id} en nuestra base de datos`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async update(
    id: number,
    updateTypeAcountDto: UpdateTypeAcountDto,
  ): Promise<any> {
    try {
      const country = await this.typeAcountRepository.findOne({
        where: { typeAcount_id: id },
      });
      if (!country) {
        throw new HttpException(
          {
            message: `El tipo de cuenta con #ID ${id} no se encuentra en la base de datos`,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      const updatedUser = Object.assign(country, updateTypeAcountDto);
      await this.typeAcountRepository.save(updatedUser);
      return {
        message: `El tipo de cuenta con #ID ${id} ha sido actualizado`,
        user: updatedUser,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: `Ocurrió un error al intentar actualizar el tipo de cuenta con #ID ${id}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number): Promise<any> {
    try {
      const country = await this.typeAcountRepository.findOne({
        where: { typeAcount_id: id },
      });
      if (!country) {
        return {
          message: `El tipo de cuenta con #ID ${id} no se encuentra en la base de datos`,
          status: HttpStatus.CONFLICT,
        };
      }
      await this.typeAcountRepository.remove(country);
      return {
        message: `El tipo de cuenta con #ID ${id} ha sido eliminado`,
        status: HttpStatus.NO_CONTENT,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: `Ocurrió un error al intentar eliminar el tipo de cuenta con #ID ${id}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
