<script>
    export let product;
    export let onDelete; // Función para manejar la eliminación
    export let onEdit;   // Función para manejar la edición
</script>

<div class="product-card">
    <img src={product.imagen} alt={product.nombre} class="product-image" />
    <div class="product-info">
        <h2 class="product-title">{product.nombre}</h2>
        <p class="product-description">{product.descripcion}</p>
        <p class="product-price">Precio: ${product.precio}</p>
        <p class="product-stock">Stock: {product.stock}</p>
    </div>
    <div class="product-actions">
        <button class="edit-button" on:click={() => onEdit(product)}>🖊 Editar</button>
        <button class="delete-button" on:click={() => onDelete(product.id)}>🗑 Eliminar</button>
    </div>
</div>

<style>
    .product-card {
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        transition: box-shadow 0.2s;
    }

    .product-card:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    .product-image {
        width: 100px;
        height: 100px;
        object-fit: cover;
        border-radius: 4px;
        align-self: center;
    }

    .product-info {
        text-align: center;
    }

    .product-title {
        font-size: 1.25rem;
        font-weight: bold;
    }

    .product-description {
        font-size: 0.875rem;
        color: #6b7280;
    }

    .product-price {
        font-size: 1rem;
        font-weight: bold;
        color: #16a34a;
    }

    .product-stock {
        font-size: 0.875rem;
        color: #2563eb;
    }

    .product-actions {
        display: flex;
        justify-content: space-between;
    }

    .edit-button,
    .delete-button {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.875rem;
        font-weight: bold;
        transition: background-color 0.2s;
    }

    .edit-button {
        background-color: #2563eb;
        color: white;
    }

    .edit-button:hover {
        background-color: #1d4ed8;
    }

    .delete-button {
        background-color: #dc2626;
        color: white;
    }

    .delete-button:hover {
        background-color: #b91c1c;
    }
</style>
