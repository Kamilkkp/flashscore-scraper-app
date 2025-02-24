import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Bookmakers } from "./Bookmakers";
import { Matches } from "./Matches";

@Index("idx_odds_current", ["bookmakerId", "matchId"], {})
@Index("odds_history_pkey", ["bookmakerId", "matchId", "validFrom"], {
  unique: true,
})
@Entity("odds_history", { schema: "public" })
export class OddsHistory {
  @Column("character varying", { primary: true, name: "match_id", length: 32 })
  matchId!: string;

  @Column("integer", { primary: true, name: "bookmaker_id" })
  bookmakerId!: number;

  @Column("numeric", { name: "hosts_win", precision: 5, scale: 2 })
  hostsWin!: string;

  @Column("numeric", { name: "draw_odds", precision: 5, scale: 2 })
  drawOdds!: string;

  @Column("numeric", { name: "visitors_win", precision: 5, scale: 2 })
  visitorsWin!: string;

  @Column("timestamp with time zone", {
    primary: true,
    name: "valid_from",
    default: () => "now()",
  })
  validFrom!: Date;

  @Column("timestamp with time zone", { name: "valid_to", nullable: true })
  validTo!: Date | null;

  @ManyToOne(() => Bookmakers, (bookmakers) => bookmakers.oddsHistories, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "bookmaker_id", referencedColumnName: "bookmakerId" }])
  bookmaker!: Bookmakers;

  @ManyToOne(() => Matches, (matches) => matches.oddsHistories, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "match_id", referencedColumnName: "matchId" }])
  match!: Matches;
}
