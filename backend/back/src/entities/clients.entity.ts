import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Clients {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  entityType: string;

  @Column()
  documentType: string;

  @Column()
  documentNumber: string;

  @Column()
  clientName: string;

  @Column()
  clientSurname: string;

  @Column()
  clientGender: string;

  @Column()
  clientBirthdate: string;

  @Column()
  clientBirthplace: string;

  @Column()
  clientEmail: string;

  @Column()
  clientNationality: string;

  @Column()
  isAbonat: boolean;

  @Column()
  isDataTreatment: boolean;

  @Column()
  haveDocToGet: boolean;

  @Column()
  scannedDocument: boolean;

  @Column()
  clientFather: string;

  @Column()
  clientMother: string;

  @Column()
  clientCell: string;

  @Column()
  clientTelephone: string;

  @Column()
  clientFax: string;

  @Column({ type: 'text' })
  clientObservations: string;

  // Financial details
  @Column()
  clientAccountName: string;

  @Column()
  clientOwner: string;

  @Column()
  clientDcIban: string;

  @Column()
  clientBankEntity: string;

  @Column()
  clientBankBranch: string;

  @Column()
  clientDcBank: string;

  @Column()
  clientAccountNumber: string;

  @Column()
  clientBank: string;

  @Column()
  clientIsFirstHome: boolean;

  @Column()
  clientCarrer: string;

  @Column()
  clientCp: string;

  @Column()
  clientProvince: string;

  @Column()
  clientCity: string;
}
