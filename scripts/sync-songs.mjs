import { readFileSync, writeFileSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const songs = JSON.parse(readFileSync(new URL('songs.json', root), 'utf8'));
if (!Array.isArray(songs) || !songs.length) throw new Error('El repertorio debe ser una lista no vacía.');
const numbers = new Set();
for (const song of songs) {
  if (!Number.isInteger(song.numero) || song.numero < 1 || numbers.has(song.numero)) {
    throw new Error(`Número de canción inválido o repetido: ${song.numero}`);
  }
  numbers.add(song.numero);
  if (typeof song.titulo !== 'string' || !song.titulo.trim() ||
      typeof song.tonalidad !== 'string' || !Array.isArray(song.temas) ||
      song.temas.some((tema) => typeof tema !== 'string' || !tema.trim())) {
    throw new Error(`Revisar título, tonalidad o temas de la canción ${song.numero}.`);
  }
  if (song.pdf !== null && (typeof song.pdf !== 'string' || !/^https?:\/\//i.test(song.pdf))) {
    throw new Error(`La partitura ${song.numero} debe tener un enlace HTTP(S) o null.`);
  }
  if (song.pdf !== null) new URL(song.pdf);
}
const output = '// Generado desde songs.json. Actualizar con node scripts/sync-songs.mjs\n' +
  'window.SONGS_FALLBACK = ' + JSON.stringify(songs, null, 2) + ';\n';
const target = new URL('fallback-data.js', root);
if (process.argv.includes('--check')) {
  if (readFileSync(target, 'utf8') !== output) {
    throw new Error('Respaldo desactualizado. Ejecuta node scripts/sync-songs.mjs');
  }
} else {
  writeFileSync(target, output);
}
console.log(`${songs.length} canciones validadas; respaldo ${process.argv.includes('--check') ? 'verificado' : 'actualizado'}.`);
