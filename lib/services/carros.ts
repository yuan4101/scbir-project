import { createClient } from '@/utils/supabase/client';
import { Carro } from '@/types/carro';

export interface GetCarrosParams {
  page?: number;
  limit?: number;
}

export interface GetCarrosResult {
  carros: Carro[];
  total: number;
  currentPage: number;
  totalPages: number;
}

export async function getCarros(
  params: GetCarrosParams = {}
): Promise<GetCarrosResult> {
  const { page = 1, limit = 12 } = params;
  
  const supabase = createClient();
  
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  
  const { data, error, count } = await supabase
    .from('carros')
    .select('*', { count: 'exact' })
    .order('id', { ascending: true })
    .range(from, to);
  
  if (error) {
    throw new Error(`Error al obtener carros: ${error.message}`);
  }
  
  return {
    carros: data || [],
    total: count || 0,
    currentPage: page,
    totalPages: Math.ceil((count || 0) / limit),
  };
}

export async function getCarroById(id: string) {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('carros')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    throw new Error(`Error al obtener carro: ${error.message}`);
  }
  
  return data;
}

/**
 * Obtiene múltiples carros por sus IDs
 * @param ids Array de IDs de carros a consultar
 * @returns Array de carros encontrados
 */
export async function getCarrosByIds(ids: number[]): Promise<Carro[]> {
  if (!ids || ids.length === 0) {
    return [];
  }

  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('carros')
    .select('*')
    .in('id', ids);
  
  if (error) {
    throw new Error(`Error al obtener carros por IDs: ${error.message}`);
  }
  
  return data || [];
}
