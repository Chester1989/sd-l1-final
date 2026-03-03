import { PelisCollection, Peli } from "./models";

class PelisController {
  constructor(private model: PelisCollection) {}

  get(options: { id?: number; search?: { title?: string; tag?: string } }): Promise<Peli[]> | Promise<Peli> {
    if (options.id !== undefined) {
      return this.model.getById(options.id);
    } else if (options.search !== undefined) {
      return this.model.search(options.search);
    } else {
      return this.model.getAll();
    }
  }
getOne(options: { id?: number; search?: { title?: string; tag?: string } }): Promise<Peli | undefined> {
  return this.get(options).then((result) => {
    if (Array.isArray(result)) {
      return result[0]; // Devuelve el primer elemento si es un array
    }
    return result; // Si ya es un solo objeto, lo devuelve directamente
  });
}

add(peli: Peli): Promise<boolean> {
  return this.model.add(peli);
}
}

export { PelisController };
