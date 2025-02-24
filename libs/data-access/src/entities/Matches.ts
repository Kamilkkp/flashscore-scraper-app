import { Column, Entity, Index, OneToMany } from "typeorm";
import { OddsHistory } from "./OddsHistory";

@Index("matches_pkey", ["matchId"], { unique: true })
@Index("idx_matches_start_time", ["startTime"], {})
@Entity("matches", { schema: "public" })
export class Matches {
  @Column("character varying", { primary: true, name: "match_id", length: 32 })
  matchId!: string;

  @Column("text", { name: "league" })
  league!: string;

  @Column("text", { name: "hosts" })
  hosts!: string;

  @Column("text", { name: "visitors" })
  visitors!: string;

  @Column("timestamp with time zone", { name: "start_time" })
  startTime!: Date;

  @OneToMany(() => OddsHistory, (oddsHistory) => oddsHistory.match)
  oddsHistories!: OddsHistory[];
}
