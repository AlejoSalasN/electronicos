<script>
    import api from '../../../../../lib/api.js';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    export let params;

    let nombre = '';
    let descripcion = '';
    let precio = '';
    let stock = '';
    let imagen = null; // Nuevo archivo si se reemplaza
    let error = '';

    // Cargar datos del producto
    onMount(async () => {
        try {
            const res = await api.get(`/products/${params.id}`);
            const product = res.data;
            nombre = product.nombre;
            descripcion = product.descripcion;
            precio = product.precio;
            stock = product.stock;
        } catch (err) {
            error = 'Error al cargar el producto';
        }
    });

    async function handleSubmit() {
        try {
            const formData = new FormData();
            formData.append('nombre', nombre);
            formData.append('descripcion', descripcion);
            formData.append('precio', precio);
            formData.append('stock', stock);
            if (imagen) formData.append('imagen', imagen);

            await api.put(`/products/${params.id}`, formData);
            goto('/dashboard/products'); // Redirigir a la lista de productos
        } catch (err) {
            error = err.response?.data?.message || 'Error al actualizar el producto';
        }
    }
</script>

<h1 class="text-2xl font-bold mb-4">Editar Producto</h1>

{#if error}
    <p class="text-red-500 mb-4">{error}</p>
{/if}

<form on:submit|preventDefault={handleSubmit} class="flex flex-col gap-4">
    <input type="text" bind:value={nombre} placeholder="Nombre del producto" required />
    <textarea bind:value={descripcion} placeholder="Descripción del producto"></textarea>
    <input type="number" bind:value={precio} placeholder="Precio" required />
    <input type="number" bind:value={stock} placeholder="Stock" required />
    <input type="file" accept="image/*" on:change={(e) => imagen = e.target.files[0]} />
    <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Actualizar</button>
</form>

<style>
    input, textarea {
        padding: 0.5rem;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 1rem;
    }
    button {
        font-size: 1rem;
    }
</style>
