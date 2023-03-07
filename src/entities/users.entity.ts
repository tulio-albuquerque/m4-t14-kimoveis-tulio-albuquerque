import { getRounds, hashSync } from "bcryptjs"
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany
} from "typeorm"
import Schedule from "./schedules.entity"

@Entity("users")
class User {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ length: 45 })
  name: string

  @Column({ length: 45 })
  email: string
  
  @Column({ type: "boolean", default: false})
  admin: boolean

  @Column({ length: 120})
  password: string

  @CreateDateColumn({type: "date"})
  createdAt: string
  
  @UpdateDateColumn({type: "date"})
  updatedAt: string
  
  @DeleteDateColumn({type: "date"})
  deletedAt: string

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword(){
    const isEncrypted = getRounds(this.password)
    if(!isEncrypted){
      this.password = hashSync(this.password, 10)
    }
  }

  @OneToMany(() => Schedule, (schedule) => schedule.user, { nullable: true})
  schedules: Schedule[]
}

export default User