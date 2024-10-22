import { Product } from '@/interfaces/Product';

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch('https://starsoft-challenge-7dfd4a56a575.herokuapp.com/v1/products');
    if (!response.ok) {
      throw new Error(`Erro ao buscar produtos: ${response.statusText}`);
    }

    const jsonData = await response.json();
    console.log("Dados recebidos da API:", jsonData); 


    return jsonData.data.map((product: any) => ({
      id: product.id,
      title: product.name, 
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
