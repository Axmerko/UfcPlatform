import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Toto je spolehlivý ESM způsob, jak najít cestu
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Sestavíme absolutní cestu ke kořenovému .env souboru
const envPath = path.resolve(__dirname, '..', '.env');

// Načteme .env
dotenv.config({ path: envPath });