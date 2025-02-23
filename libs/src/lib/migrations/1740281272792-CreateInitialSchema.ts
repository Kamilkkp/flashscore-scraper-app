import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateInitialSchema1740281272792 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE matches (
                match_id VARCHAR(32) PRIMARY KEY,
                league TEXT NOT NULL,
                hosts TEXT NOT NULL,
                visitors TEXT NOT NULL,
                start_time TIMESTAMPTZ NOT NULL
            );
        `);

        await queryRunner.query(`
            CREATE TABLE bookmakers (
                bookmaker_id SERIAL PRIMARY KEY,
                name TEXT NOT NULL UNIQUE
            );
        `);

        await queryRunner.query(`
            CREATE TABLE odds_history (
                match_id VARCHAR(32) REFERENCES matches(match_id) ON DELETE CASCADE,
                bookmaker_id INT REFERENCES bookmakers(bookmaker_id) ON DELETE CASCADE,
                hosts_win NUMERIC(5,2) NOT NULL,
                draw_odds NUMERIC(5,2) NOT NULL,
                visitors_win NUMERIC(5,2) NOT NULL,
                valid_from TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                valid_to TIMESTAMPTZ,
                PRIMARY KEY (match_id, bookmaker_id, valid_from),
                CHECK (valid_from < valid_to)
            );
        `);

        await queryRunner.query(`
            CREATE INDEX idx_odds_current ON odds_history (match_id, bookmaker_id) WHERE valid_to IS NULL;
        `);

        await queryRunner.query(`
            CREATE INDEX idx_matches_start_time ON matches (start_time);
        `);

        await queryRunner.query(`
            CREATE INDEX idx_bookmakers_name ON bookmakers (name);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX IF EXISTS idx_bookmakers_name;`);
        await queryRunner.query(`DROP INDEX IF EXISTS idx_matches_start_time;`);
        await queryRunner.query(`DROP INDEX IF EXISTS idx_odds_current;`);
        await queryRunner.query(`DROP TABLE IF EXISTS odds_history;`);
        await queryRunner.query(`DROP TABLE IF EXISTS bookmakers;`);
        await queryRunner.query(`DROP TABLE IF EXISTS matches;`);
    }
}