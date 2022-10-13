import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Inmueble, InmuebleRelations, Propietario, Imagen} from '../models';
import {PropietarioRepository} from './propietario.repository';
import {ImagenRepository} from './imagen.repository';

export class InmuebleRepository extends DefaultCrudRepository<
  Inmueble,
  typeof Inmueble.prototype.id,
  InmuebleRelations
> {

  public readonly propietarioinmueble: BelongsToAccessor<Propietario, typeof Inmueble.prototype.id>;

  public readonly InmuebleImagen: HasManyRepositoryFactory<Imagen, typeof Inmueble.prototype.id>;

  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource, @repository.getter('PropietarioRepository') protected propietarioRepositoryGetter: Getter<PropietarioRepository>, @repository.getter('ImagenRepository') protected imagenRepositoryGetter: Getter<ImagenRepository>,
  ) {
    super(Inmueble, dataSource);
    this.InmuebleImagen = this.createHasManyRepositoryFactoryFor('InmuebleImagen', imagenRepositoryGetter,);
    this.registerInclusionResolver('InmuebleImagen', this.InmuebleImagen.inclusionResolver);
    this.propietarioinmueble = this.createBelongsToAccessorFor('propietarioinmueble', propietarioRepositoryGetter,);
    this.registerInclusionResolver('propietarioinmueble', this.propietarioinmueble.inclusionResolver);
  }
}
