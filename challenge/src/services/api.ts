// services/api.ts
import { Product } from '@/interfaces/Product';

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch('https://starsoft-challenge-7dfd4a56a575.herokuapp.com/v1/products');

    // Verifica se a resposta da API é bem-sucedida antes de continuar
    if (!response.ok) {
      throw new Error(`Erro ao buscar produtos: ${response.statusText}`);
    }

    const jsonData = await response.json();
    console.log("Dados recebidos da API:", jsonData); // Log para verificar os dados retornados

    // Transformando os dados para garantir que sejam objetos simples e retornando
    return jsonData.data.map((product: any) => ({
      id: product.id,
      title: product.name, // Certifique-se de que o nome do campo está correto
      description: product.description,
      image: product.image,
      price: product.price,
      createdAt: product.createdAt
    }));
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    throw new Error('Não foi possível carregar os produtos');
  }
};
