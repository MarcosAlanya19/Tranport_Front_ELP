interface Option {
  label: string;
  value: string;
}

const initialOption: Option = { label: "Todos", value: "" };

/**
 * Mapea datos a un array de opciones.
 *
 * @template T
 * @param {T[] | undefined} data - El array de datos a mapear.
 * @param {keyof T} labelKey - La clave para label.
 * @param {keyof T} valueKey - La clave para value.
 * @param {boolean} [includeInitialOption=false] - Si se debe incluir "Todos".
 * @returns {Option[]} Las opciones mapeadas.
 *
 * @example
 * // Datos de ejemplo
 * const data = [
 *   { id: '1', name: 'Opción 1' },
 *   { id: '2', name: 'Opción 2' }
 * ];
 *
 * // Uso de mapOptions
 * const options = mapOptions(data, 'name', 'id', true);
 *
 * // Resultado
 * // [
 * //   { label: 'Todos', value: '' },
 * //   { label: 'Opción 1', value: '1' },
 * //   { label: 'Opción 2', value: '2' }
 * // ]
 */
export const mapOptions = <T>(
  data: T[] | undefined,
  labelKey: keyof T,
  valueKey: keyof T,
  includeInitialOption?: boolean
): Option[] => {
  const options =
    data?.map((item) => ({
      label: item[labelKey] as unknown as string,
      value: item[valueKey] as unknown as string,
    })) || [];

  if (includeInitialOption) {
    return [initialOption, ...options];
  }

  return options;
};
