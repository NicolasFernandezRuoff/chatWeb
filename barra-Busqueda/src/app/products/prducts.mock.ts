//Un archivo el cual tiene una lista de productos 
export const productList: Product[] = [
    {
        id: 1,
        name: 'Lavandina',
        price: 10,
        description: 'Botella de 1 litro',
    },
    {
        id: 2,
        name: 'Detergente',
        price: 5,
        description: 'Dura 120 lavados',
    },
    {
        id: 3,
        name: 'Limpia Vidrios',
        price: 7,
        description: 'Vidrios trasparente',
    },
    {
        id: 4,
        name: 'Quta Grasas',
        price: 8,
        description: 'Cocina tranquilo, nostros Limpiamos',
    },
    {
        id: 5,
        name: 'Perfumina',
        price: 2,
        description: 'El olor a campo mas realista',
    },

    {
        id: 6,
        name: 'Limpia Metales',
        price: 9,
    },

]
//Estruct
export interface Product {
    id: number | string;
    name: string;
    price: number;
    description ?: string; //Por si algun producto no tiene descripcion
}