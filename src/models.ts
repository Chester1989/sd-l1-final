import * as jsonfile from "jsonfile";
import "./pelis.json";

class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {
  // Guardamos la ruta en una constante para no repetirnos
  private readonly filePath = "./src/pelis.json";

  getAll(): Promise<Peli[]> {
    return jsonfile.readFile(this.filePath);
  }

  // Corregido: Agregamos | undefined al retorno
  getById(id: number): Promise<Peli | undefined> {
    return this.getAll().then((pelis) => {
      return pelis.find((p) => p.id === id);
    });
  }

  search(options: any): Promise<Peli[]> {
    return this.getAll().then((pelis) => {
      return pelis.filter((peli) => {
        let cumple = true;
        if (options.title) {
          cumple = cumple && peli.title.toLowerCase().includes(options.title.toLowerCase());
        }
        if (options.tag) {
          cumple = cumple && peli.tags.includes(options.tag);
        }
        return cumple;
      });
    });
  }

  add(peli: Peli): Promise<boolean> {
    // Optimización: Leemos una sola vez
    return this.getAll().then((pelis) => {
      const existe = pelis.find(p => p.id === peli.id);
      
      if (existe) {
        return false;
      } else {
        pelis.push(peli);
        return jsonfile.writeFile(this.filePath, pelis).then(() => true);
      }
    });
  }
}

export { PelisCollection, Peli };