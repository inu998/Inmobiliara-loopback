import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Propietario, PropietarioRelations, Inmueble} from '../models';
import {InmuebleRepository} from './inmueble.repository';

export class PropietarioRepository extends DefaultCrudRepository<
  Propietario,
  typeof Propietario.prototype.id,
  PropietarioRelations
> {

  public readonly inmueblepropietario: HasManyRepositoryFactory<Inmueble, typeof Propietario.prototype.id>;

  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource, @repository.getter('InmuebleRepository') protected inmuebleRepositoryGetter: Getter<InmuebleRepository>,
  ) {
    super(Propietario, dataSource);
    this.inmueblepropietario = this.createHasManyRepositoryFactoryFor('inmueblepropietario', inmuebleRepositoryGetter,);
    this.registerInclusionResolver('inmueblepropietario', this.inmueblepropietario.inclusionResolver);
  }
}
