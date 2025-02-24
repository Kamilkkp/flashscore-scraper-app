import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { OddsHistory } from "./OddsHistory";

@Index("bookmakers_pkey", ["bookmakerId"], { unique: true })
@Index("bookmakers_name_key", ["name"], { unique: true })
@Index("idx_bookmakers_name", ["name"], {})
@Entity("bookmakers", { schema: "public" })
export class Bookmakers {
  @PrimaryGeneratedColumn({ type: "integer", name: "bookmaker_id" })
  bookmakerId!: number;

  @Column("text", { name: "name", unique: true })
  name!: string;

  @OneToMany(() => OddsHistory, (oddsHistory) => oddsHistory.bookmaker)
  oddsHistories!: OddsHistory[];
}
