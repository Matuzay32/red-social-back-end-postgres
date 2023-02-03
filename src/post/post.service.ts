import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private repositoryPost: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<any> {
    const { user_id, text, media, updatedAt } = createPostDto;

    try {
      // const found = await this.repositoryPost.findOne({
      //   where: { name: name },
      // });
      // if (found) {
      //   return {
      //     message: `La publicacion ${name} ya se encuentra en la DB`,
      //     status: HttpStatus.UNPROCESSABLE_ENTITY,
      //     data: found,
      //   };
      // }

      const post = await this.repositoryPost.save(createPostDto);

      return {
        message: `La publicacion fue creada exitosamente`,
        status: HttpStatus.CREATED,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: `Ocurrió un error al intentar crear la publicacion `,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<any> {
    try {
      const posts = await this.repositoryPost.find({});

      if (!posts.length) {
        throw new HttpException(
          {
            message: 'No hay publicacions en la base de datos',
          },
          HttpStatus.NO_CONTENT,
        );
      }

      return posts;
    } catch (error) {
      throw new HttpException(
        {
          message: 'Hubo un error al intentar encontrar los publicacions',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOne(id: number): Promise<any> {
    try {
      const post = await this.repositoryPost.findOne({
        where: { post_id: id },
      });
      if (!post) {
        throw new HttpException(
          {
            message: `No se encontró la publicacion con #ID  ${id}  en nuestra base de datos`,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return post;
    } catch (error) {
      throw new HttpException(
        {
          message: `No se encontró la publicacion con #ID ${id} en nuestra base de datos`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<any> {
    try {
      const post = await this.repositoryPost.findOne({
        where: { post_id: id },
      });
      if (!post) {
        throw new HttpException(
          {
            message: `La publicacion con #ID ${id} no se encuentra en la base de datos`,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      const updatedUser = Object.assign(post, updatePostDto);
      await this.repositoryPost.save(updatedUser);
      return {
        message: `La publicacion con #ID ${id} ha sido actualizado`,
        user: updatedUser,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: `Ocurrió un error al intentar actualizar la publicacion con #ID ${id}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number): Promise<any> {
    try {
      const post = await this.repositoryPost.findOne({
        where: { post_id: id },
      });
      if (!post) {
        return {
          message: `La publicacion con #ID ${id} no se encuentra en la base de datos`,
          status: HttpStatus.CONFLICT,
        };
      }
      await this.repositoryPost.remove(post);
      return {
        message: `La publicacion con #ID ${id} ha sido eliminada`,
        status: HttpStatus.NO_CONTENT,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: `Ocurrió un error al intentar eliminar la publicacion con #ID ${id}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
