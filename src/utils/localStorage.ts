export const LocalStorageKey = {
  token: "token",
  name: "name",
}

class LocalStorageUtils {
  // Guardar datos en localStorage con un tipo genérico
  public save<T>(key: string, data: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error("Error saving to localStorage", error);
    }
  }

  // Obtener datos desde localStorage con un tipo genérico
  public get<T>(key: string): T | null {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Error reading from localStorage", error);
      return null;
    }
  }

  // Eliminar datos del localStorage
  public remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing from localStorage", error);
    }
  }

  // Verificar si existe una clave en localStorage
  public exists(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }
}

export const localStorageUtils = new LocalStorageUtils();
