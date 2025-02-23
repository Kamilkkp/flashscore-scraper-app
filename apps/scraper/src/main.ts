import 'reflect-metadata';
import * as cron from 'cron';
import * as dotenv from 'dotenv';
import { ScraperService } from './services/scraper.service';
import { DatabaseService } from './services/database.service';

dotenv.config();

const scraper = new ScraperService();
const database = new DatabaseService();


const job = new cron.CronJob(`*/${process.env.SCRAPER_INTERVAL_MINUTES} * * * *`, async () => {
  console.log('Starting scraping...');
  try {
    const matches = await scraper.scrapeMatches();
    await database.saveMatches(matches);
    console.log(`Saved ${matches.length} matches`);
  } catch (error) {
    console.error('Scraping failed:', error);
  }
});

scraper.scrapeMatches()
  .then(matches => database.saveMatches(matches))
  .catch(console.error);

job.start();