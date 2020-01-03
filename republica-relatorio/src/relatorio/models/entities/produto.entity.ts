import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { estabelecimentoEntity } from './estabelecimento.entity';

@Entity('produto', { schema: 'public' })
export class produtoEntity extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'integer',
    name: 'id_produto',
  })
  id_produto: number;

  @Column('character varying', {
    nullable: false,
    name: 'nome',
  })
  nome: string;

  @Column('character varying', {
    nullable: false,
    name: 'categoria',
  })
  categoria: string;

  @ManyToMany(
    () => estabelecimentoEntity,
    (estabelecimento: estabelecimentoEntity) => estabelecimento.produtos,
  )
  estabelecimentos: estabelecimentoEntity[];
}
