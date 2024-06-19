import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'seeder',
})
export class SeederEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
  })
  seederId: number;

  @Column({
    name: 'seeder_name',
  })
  seederName: string;
}
