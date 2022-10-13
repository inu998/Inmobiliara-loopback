import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Imagen, ImagenRelations, Inmueble} from '../models';
import {InmuebleRepository} from './inmueble.repository';

export class ImagenRepository extends DefaultCrudRepository<
  Imagen,
  typeof Imagen.prototype.id,
  ImagenRelations
> {

  public readonly Inmuebleimagen: BelongsToAccessor<Inmueble, typeof Imagen.prototype.id>;

  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource, @repository.getter('InmuebleRepository') protected inmuebleRepositoryGetter: Getter<InmuebleRepository>,
  ) {
    super(Imagen, dataSource);
    this.Inmuebleimagen = this.createBelongsToAccessorFor('Inmuebleimagen', inmuebleRepositoryGetter,);
    this.registerInclusionResolver('Inmuebleimagen', this.Inmuebleimagen.inclusionResolver);
  }
}
