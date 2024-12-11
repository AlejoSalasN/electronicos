<script>
    import api from '../../../../lib/api.js';
    import { goto } from '$app/navigation';

    let nombre = '';
    let descripcion = '';
    let precio = '';
    let stock = '';
    let imagen = null; // Esto será un archivo (File)
    let error = '';

    async function handleSubmit() {
        try {
            const formData = new FormData();
            formData.append('nombre', nombre);
            formData.append('descripcion', descripcion);
            formData.append('precio', precio);
            formData.append('stock', stock);

            // Asegurarte de subir solo un archivo
            if (imagen) {
                formData.append('imagen', imagen);
            }

            await api.post('/products', formData);
            goto('/dashboard/products'); // Redirigir a la lista de productos
        } catch (err) {
            error = err.response?.data?.message || 'Error al crear el producto';
        }
    }
</script>

<h1 class="text-2xl font-bold mb-4">Crear Producto</h1>

{#if error}
    <p class="text-red-500 mb-4">{error}</p>
{/if}

<form on:submit|preventDefault={handleSubmit} class="flex flex-col gap-4">
    <input type="text" bind:value={nombre} placeholder="Nombre del producto" required />
    <textarea bind:value={descripcion} placeholder="Descripción del producto"></textarea>
    <input type="number" bind:value={precio} placeholder="Precio" required />
    <input type="number" bind:value={stock} placeholder="Stock" required />
    <input type="file" accept="image/*" on:change={(e) => imagen = e.target.files[0]} required />
    <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Crear</button>
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
