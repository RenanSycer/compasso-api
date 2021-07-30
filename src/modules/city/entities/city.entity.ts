import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class City extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  state: string;
}
