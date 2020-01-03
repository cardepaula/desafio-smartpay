import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  JoinTableOptions,
} from 'typeorm';
import { produtoEntity } from './produto.entity';

const options: JoinTableOptions = { name: 'estabelecimento_produto', joinColumn: {name:'id_estabelecimento'}, inverseJoinColumn: {name:'id_produto'} }

@Entity('estabelecimento', { schema: 'public' })
export class estabelecimentoEntity extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'integer',
    name: 'id_estabelecimento',
  })
  id_estabelecimento: number;

  @Column('character varying', {
    nullable: false,
    name: 'nome',
  })
  nome: string;

  @Column('bigint', {
    nullable: false,
    name: 'cnpj',
  })
  cnpj: string;

  @Column('character varying', {
    nullable: false,
    name: 'bairro',
  })
  bairro: string;

  @Column('character varying', {
    nullable: false,
    name: 'cidade',
  })
  cidade: string;

  @ManyToMany(
    () => produtoEntity,
    (produto: produtoEntity) => produto.estabelecimentos,
    { nullable: false },
  )
  @JoinTable(options)
  produtos: produtoEntity[];
}
