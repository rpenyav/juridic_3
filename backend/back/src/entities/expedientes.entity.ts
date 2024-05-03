import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Expedientes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  referencia: string;

  @Column()
  numexpedient: string;

  @Column()
  client: string;

  @Column()
  contrari: string;

  @Column()
  tutor: string;

  @Column()
  estat: string;

  @Column()
  numautos: number;

  @Column()
  dataexpedicio: string;

  @Column()
  dataestat: string;

  @Column()
  destruit: boolean;

  @Column()
  digitalitzat: boolean;

  @Column()
  ubicacio: string;

  @Column()
  tipusexpedient: string;

  @Column()
  despatxexpedient: string;

  @Column()
  grupexpedient: string;
}
