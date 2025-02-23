import { Browser, chromium, BrowserContext } from 'playwright';

export class ScraperService {
  private async extractMatchIdsFromMainPage(context: BrowserContext) {
    const page = await context.newPage();

    try {
      await page.goto('https://www.flashscore.pl');
      await page.click('text="Następne"');

      return await page.$$eval('.event__match', (elements) => {
        return elements.map((el) => el.id.substring(4));
      });
    } finally {
      await page.close();
    }
  }

  private async extractDetailsAboutMatch(
    context: BrowserContext,
    matchId: string
  ) {
    const page = await context.newPage();

    try {
      await page.goto(
        `https://www.flashscore.pl/mecz/${matchId}/#/zestawienie-kursow/kursy-1x2/koniec-meczu`,
        { waitUntil: 'load' }
      );

      const { league, hosts, visitors, startTime } = await page.evaluate(() => {
        const getText = (selector: string) =>
          document.querySelector(selector)?.textContent?.trim() || '';

        return {
          league: getText('span.tournamentHeader__country'),
          hosts: getText(
            'div.duelParticipant__home .participant__participantName'
          ),
          visitors: getText(
            'div.duelParticipant__away .participant__participantName'
          ),
          startTime: getText(
            'div.duelParticipant > div.duelParticipant__startTime'
          ),
        };
      });

      const odds = await page.$$eval('.ui-table__row', (rows) =>
        rows.map((row) => {
          const bookmaker = row
            .querySelector('.prematchLogo')
            ?.getAttribute('title');
          const oddsElements = Array.from(
            row.querySelectorAll('.oddsCell__odd span')
          );

          return {
            bookmaker: bookmaker || 'Unknown',
            homeWinOdds: Number(oddsElements[0]?.textContent.trim() || 0),
            drawOdds: Number(oddsElements[1]?.textContent.trim() || 0),
            awayWinOdds: Number(oddsElements[2]?.textContent.trim() || 0),
          };
        })
      );

      return { matchId, league, hosts, visitors, odds, startTime };
    } finally {
      await page.close();
    }
  }

  async scrapeMatches() {
    const browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox'],
    });

    const context = await browser.newContext();

    try {
      const matchIds = await this.extractMatchIdsFromMainPage(context);
      matchIds.length = 20;

      const MAX_PARALLEL = 8;
      const results = [];

      for (let i = 0; i < matchIds.length; i += MAX_PARALLEL) {
        const batch = matchIds.slice(i, i + MAX_PARALLEL);
        const batchResults = await Promise.all(
          batch.map((id) => this.extractDetailsAboutMatch(context, id))
        );
        results.push(...batchResults);
      }
      console.log(results);
      return results;
    } finally {
      await context.close();
      await browser.close();
    }
  }
}
