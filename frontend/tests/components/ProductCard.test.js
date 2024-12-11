
import { render, fireEvent } from '@testing-library/svelte';
import ProductCard from '../../src/components/ProductCard.svelte';

describe('ProductCard Component', () => {
    const mockProduct = {
        id: '1',
        imagen: 'https://via.placeholder.com/100',
        nombre: 'Producto Prueba',
        descripcion: 'Descripción de prueba',
        precio: 100,
        stock: 10,
    };

    it('debería mostrar el nombre del producto', () => {
        const { getByText } = render(ProductCard, { props: { product: mockProduct } });
        expect(getByText('Producto Prueba')).toBeInTheDocument();
    });

    it('debería mostrar la descripción del producto', () => {
        const { getByText } = render(ProductCard, { props: { product: mockProduct } });
        expect(getByText('Descripción de prueba')).toBeInTheDocument();
    });

    it('debería mostrar el precio del producto', () => {
        const { getByText } = render(ProductCard, { props: { product: mockProduct } });
        expect(getByText('Precio: $100')).toBeInTheDocument();
    });

    it('debería mostrar el stock del producto', () => {
        const { getByText } = render(ProductCard, { props: { product: mockProduct } });
        expect(getByText('Stock: 10')).toBeInTheDocument();
    });

    it('debería renderizar la imagen del producto', () => {
        const { getByAltText } = render(ProductCard, { props: { product: mockProduct } });
        expect(getByAltText('Producto Prueba')).toHaveAttribute('src', mockProduct.imagen);
    });

    it('debería emitir el evento de editar cuando se hace clic en el botón de editar', async () => {
        const mockOnEdit = vi.fn();
        const { getByText } = render(ProductCard, { props: { product: mockProduct, onEdit: mockOnEdit } });

        const editButton = getByText('🖊 Editar');
        await fireEvent.click(editButton);

        expect(mockOnEdit).toHaveBeenCalledWith(mockProduct);
    });

    it('debería emitir el evento de eliminar cuando se hace clic en el botón de eliminar', async () => {
        const mockOnDelete = vi.fn();
        const { getByText } = render(ProductCard, { props: { product: mockProduct, onDelete: mockOnDelete } });

        const deleteButton = getByText('🗑 Eliminar');
        await fireEvent.click(deleteButton);

        expect(mockOnDelete).toHaveBeenCalledWith(mockProduct.id);
    });
});
