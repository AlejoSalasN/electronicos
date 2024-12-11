<script>
    import api from '../../../lib/api.js';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    let products = [];
    let error = null;

    function navigateToCreate() {
        goto('/dashboard/products/create');
    }

    async function deleteProduct(productId) {
        if (confirm('¿Estás seguro de eliminar este producto?')) {
            try {
                await api.delete(`/products/${productId}`);
                products = products.filter(product => product._id !== productId); // Actualizar la lista localmente
            } catch (err) {
                alert('Error al eliminar el producto.');
            }
        }
    }

    // Cargar productos desde la API
    onMount(async () => {
        try {
            const res = await api.get('/products'); // Asegúrate de tener esta ruta en el backend
            products = res.data;
        } catch (err) {
            error = 'Error al cargar los productos.';
        }
    });
</script>
<div class="cabecera">
    <h1 class="text-2xl font-bold mb-4">Productos</h1>
    <button class="bg-blue-500 text-white px-4 py-2 rounded" on:click={navigateToCreate}>Agregar nuevo</button>
</div>



{#if error}
    <p class="text-red-500">{error}</p>
{:else if products.length === 0}
    <p>No hay productos disponibles.</p>
{:else}
    <div class="grid grid-cols-1 gap-4">
        {#each products as product}
            <div 
                class="product-card"
            >
                <div class="product-content">
                    <img src={product.imagen} alt={product.nombre} class="product-image" />
                    <div class="product-info">
                        <h2 class="product-title">{product.nombre}</h2>
                        <p class="product-description">{product.descripcion}</p>
                        <p class="product-price">Precio: ${product.precio}</p>
                        <p class="product-stock">Stock: {product.stock}</p>
                    </div>
                    <button 
                        class="px-4 py-2 rounded text-white hover:bg-red-700 transition"
                        on:click={() => deleteProduct(product._id)}
                    >
                        🗑
                    </button>
                </div>
            </div>
        {/each}
    </div>
{/if}

<style>
    .cabecera {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    h1 {
        color: #333;
    }
    .grid {
        margin-top: 1rem;
    }
    .product-card {
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 1rem;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        transition: box-shadow 0.2s, transform 0.2s;
        cursor: pointer;
    }
    .product-card:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        transform: scale(1.02);
    }
    .product-content {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    .product-image {
        width: 100px;
        height: 100px;
        object-fit: cover;
        border-radius: 4px;
    }
    .product-info {
        flex-grow: 1;
    }
    .product-title {
        font-size: 1.125rem;
        font-weight: bold;
        color: #1d4ed8;
        margin-bottom: 0.5rem;
        text-decoration: none;
    }
    .product-title:hover {
        text-decoration: underline;
    }
    .product-description {
        font-size: 0.875rem;
        color: #6b7280;
        margin-bottom: 0.5rem;
    }
    .product-price {
        font-size: 0.875rem;
        font-weight: bold;
        color: #16a34a;
        margin-bottom: 0.5rem;
    }
    .product-stock {
        font-size: 0.875rem;
        color: #2563eb;
    }
</style>
