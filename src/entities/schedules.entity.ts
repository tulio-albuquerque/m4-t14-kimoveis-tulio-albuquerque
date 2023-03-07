import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne
} from "typeorm"

import RealEstate from "./realEstate.entity"
import User from "./users.entity"

@Entity("schedules_users_properties")
class Schedule {
  @PrimaryGeneratedColumn("increment")
  id: number

  @Column({ type: "date"})
  date: string

  @Column({ type: "time"})
  hour: string

  @ManyToOne(() => RealEstate, (realEstate: RealEstate) => realEstate.id)
  realEstate: RealEstate

  @ManyToOne(() => User, (user) => user.id)
  user: User
}

export default Schedule