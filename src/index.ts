import minimist from 'minimist';
import {PelisController} from './controllers'; // Asegúrate de que la ruta sea correcta
import { PelisCollection } from './models';

function main() {
const args = minimist(process.argv.slice(2));
const pelisCollection = new PelisCollection();
const pelisController = new PelisController(pelisCollection);

if (!args._[0]) {
  // listar todas
  pelisController.get({}).then((pelis) => {
    console.log(pelis);
  });
} else if (args._[0] === 'search') {
  // buscar
  // ...
} else if (args._[0] === 'add') {
  // agregar peli
  pelisController.add({
    id: Number(args.id),
    title: args.title,
    tags: Array.isArray(args.tags) ? args.tags : [args.tags],
  }).then((resultado) => {
    if (resultado) {
      console.log("Película agregada exitosamente");
    } else {
      console.log("No se pudo agregar la película, ID duplicado o error en la escritura");
    }
  }).catch((error) => {
    console.error("Error al agregar la película:", error);
  });
} else {
  console.log("Comando no reconocido...");
}
}
main();
