import { writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const ENTITIES_DIR = join(__dirname, '../src/entities');
const INDEX_FILE = join(ENTITIES_DIR, 'index.ts');

const entityFiles = readdirSync(ENTITIES_DIR)
  .map(file => file.replace('.ts', ''));

const content = `// Auto-generated file - DO NOT EDIT
${entityFiles.map(f => `export * from './${f}';`).join('\n')}
`;

writeFileSync(INDEX_FILE, content);