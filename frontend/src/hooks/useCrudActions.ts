import { useState } from "react";

interface CrudResult<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  fetchData: () => Promise<void>;
  create: (item: Partial<T>) => Promise<void>;
  update: (id: number, item: Partial<T>) => Promise<void>;
  remove: (id: number) => Promise<void>;
  editingItem: T | null;
  setEditingItem: (item: T | null) => void;
  handleEdit: (item: T) => void;
}

export default function useCrudActions<T>(resourceUrl: string): CrudResult<T> {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<T | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(resourceUrl);
      if (!response.ok) {
        throw new Error("Error al obtener los datos");
      }
      const result = await response.json();
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const create = async (item: Partial<T>) => {
    try {
      const response = await fetch(resourceUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
      if (!response.ok) {
        throw new Error("Error al crear el item");
      }
      const newItem = await response.json();
      setData((prev) => [...prev, newItem]);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const update = async (id: number, item: Partial<T>) => {
    try {
      const response = await fetch(`${resourceUrl}${id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
      if (!response.ok) {
        throw new Error("Error al actualizar el ítem");
      }
      const updatedItem = await response.json();
      setData((prev) =>
        prev.map((d) => ((d as any).id === updatedItem.id ? updatedItem : d))
      );
    } catch (err: any) {
      setError(err.message);
    }
  };

  const remove = async (id: number) => {
    try {
      const response = await fetch(`${resourceUrl}${id}/`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Error al eliminar el ítem");
      }
      setData((prev) => prev.filter((d) => (d as any).id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleEdit = (item: T) => {
    setEditingItem(item);
  };

  return {
    data,
    loading,
    error,
    fetchData,
    create,
    update,
    remove,
    editingItem,
    setEditingItem,
    handleEdit,
  };
}
