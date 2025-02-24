// import { AppDataSource,Matches } from'@flashscore-scraper-api/libs/data-access';
import { LessThan } from 'typeorm';

// export interface OddsDetails {
//   bookmaker: string;
//   homeWinOdds: number;
//   drawOdds: number;
//   awayWinOdds: number;
// }

// export interface MatchDetails{
//   matchId: string;
//   league: string;
//   hosts: string;
//   visitors: string;
//   timeStart: string;
// }

export class DatabaseService {
  // private async handleDataSource() {
  //   if (!AppDataSource.isInitialized) {
  //     await AppDataSource.initialize();
  //   }
  // }

  async saveMatches(matches: Partial<unknown>[]) {
    // try {
    //   await this.handleDataSource();
    //   const repository = AppDataSource.getRepository(Matches);
    //   await repository.save(matches);
    // } finally {
    //   await AppDataSource.destroy();
    // }
  }

  async deleteOldMatches() {
    // try {
    //   await this.handleDataSource();
    //   const repository = AppDataSource.getRepository(Matches);
      
    //   await repository.delete({
    //     startTime: LessThan(new Date())
    //   });
      
    //   console.log("Successfully deleted old matches");
    // } catch (error) {
    //   console.error("Error deleting old matches:", error);
    //   throw error;
    // } finally {
    //   await AppDataSource.destroy();
    // }
  }
}