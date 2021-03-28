import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ nullable: true })
  parentId: number;

  @ManyToOne(type => Category)
  @JoinColumn({ name: 'id' })
  parent: Category;

  @Column()
  public label: string;

  @CreateDateColumn()
  public createdOn: Date;

  @UpdateDateColumn()
  public updatedOn: Date;
}
