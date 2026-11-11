# Carpeta-Virtual-cuarteto
Carpeta Virtual — Cuarteto de Jóvenes I.E.P. Los Naranjos

## Actualizar el repertorio

Edita `songs.json`: los textos y enlaces llevan comillas dobles; cuando aún no hay partitura, usa `"pdf": null`. Los temas se escriben como listas de textos, por ejemplo `"temas": ["Fe y confianza"]`.

Después de editar, ejecuta:

```sh
node scripts/sync-songs.mjs
node scripts/sync-songs.mjs --check
```

El primer comando valida los datos y actualiza `fallback-data.js`, la copia usada al abrir la página directamente o si falla la carga del JSON. Sube ambos archivos juntos. GitHub Actions comprueba que el JSON sea válido y que el respaldo coincida.
