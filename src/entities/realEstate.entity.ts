import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
  ManyToOne,
  OneToMany
} from "typeorm"

import Address from "./addresses.entity"
import Category from "./categories.entity"
import Schedule from "./schedules.entity"

@Entity("real_estate")
class RealEstate {
  @PrimaryGeneratedColumn("increment")
  id: number

  @Column({ default: false})
  sold: boolean

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  value: number | string

  @Column()
  size: number

  @CreateDateColumn({ type: "date"})
  createdAt: string

  @UpdateDateColumn({ type: "date"})
  updatedAt: string

  @OneToOne(() => Address, (address) => address.id)
  @JoinColumn()
  address: Address

  @ManyToOne(() => Category, (categories) => categories.id, { nullable: true})
  category?: Category | undefined | null

  @OneToMany(() => Schedule, (schedule) => schedule.realEstate)
  schedules: Schedule[]
}

export default RealEstate