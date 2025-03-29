import React from "react";

export interface Column<T> {
  /** Título que se muestra en el encabezado de la columna */
  header: string;
  /**
   * Accesor o función que define cómo extraer el valor a mostrar.
   * Puede ser la clave de la propiedad del objeto o una función personalizada.
   */
  accessor: keyof T | ((item: T) => React.ReactNode);
}

export interface ListProps<T> {
  /** Definición de columnas para la lista */
  columns: Column<T>[];
  /** Datos a mostrar en la lista */
  data: T[];
  /**
   * Propiedad o función que retorna la key única para cada fila.
   * Si no se provee, se usará el índice de la fila.
   */
  rowKey?: keyof T | ((item: T) => string);
  /** Función a ejecutar al editar un elemento (opcional) */
  onEdit?: (item: T) => void;
  /** Función a ejecutar al eliminar un elemento (opcional) */
  onDelete?: (item: T) => void;
}

function List<T>({ columns, data, rowKey, onEdit, onDelete }: ListProps<T>) {
  // Agregamos la columna de acciones si se provee alguna de las funciones
  const finalColumns = React.useMemo(() => {
    if (onEdit || onDelete) {
      return [
        ...columns,
        {
          header: "Acciones",
          accessor: (item: T) => (
            <div className="flex space-x-2">
              {onEdit && (
                <button
                  className="text-indigo-600 hover:text-indigo-900"
                  onClick={() => onEdit(item)}
                >
                  Editar
                </button>
              )}
              {onDelete && (
                <button
                  className="text-red-600 hover:text-red-900"
                  onClick={() => onDelete(item)}
                >
                  Eliminar
                </button>
              )}
            </div>
          ),
        },
      ];
    }
    return columns;
  }, [columns, onEdit, onDelete]);

  // Función para obtener la key de cada fila
  const getRowKey = (item: T, index: number): string => {
    if (!rowKey) {
      return index.toString();
    }
    if (typeof rowKey === "function") {
      return rowKey(item);
    }
    if (
      typeof rowKey === "string" ||
      typeof rowKey === "number" ||
      typeof rowKey === "symbol"
    ) {
      return (item as any)[rowKey]?.toString() || index.toString();
    }
    return index.toString();
  };

  // Renderiza el contenido de una celda, ya sea a partir de la función o de la propiedad
  const renderCell = (item: T, column: Column<T>) => {
    if (typeof column.accessor === "function") {
      return column.accessor(item);
    }
    return (item as any)[column.accessor];
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {finalColumns.map((col, index) => (
              <th
                key={index}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, index) => (
            <tr key={getRowKey(item, index)}>
              {finalColumns.map((col, colIndex) => (
                <td
                  key={colIndex}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                >
                  {renderCell(item, col)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default List;
