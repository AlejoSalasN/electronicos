<script>
    import api from '../../../../lib/api.js';
    import { goto } from '$app/navigation';

    let nombre = '';
    let email = '';
    let password = '';
    let role = 'operador'; // Valor predeterminado para el rol
    let error = '';

    async function handleSubmit() {
        try {
            await api.post('/users/register', { nombre, email, password, role });
            goto('/dashboard/users'); // Redirigir a la lista de usuarios
        } catch (err) {
            error = err.response?.data?.message || 'Error al crear el usuario';
        }
    }
</script>

<h1 class="text-2xl font-bold mb-4">Agregar Usuario</h1>

{#if error}
    <p class="text-red-500 mb-4">{error}</p>
{/if}

<form on:submit|preventDefault={handleSubmit} class="flex flex-col gap-4">
    <input type="text" bind:value={nombre} placeholder="Nombre completo" required />
    <input type="email" bind:value={email} placeholder="Correo electrónico" required />
    <input type="password" bind:value={password} placeholder="Contraseña" required />
    <div>
        <label for="role" class="block text-sm font-medium">Rol</label>
        <select bind:value={role} id="role" class="w-full p-2 border rounded">
            <option value="administrador">Administrador</option>
            <option value="supervisor">Supervisor</option>
            <option value="operador">Operador</option>
        </select>
    </div>
    <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Crear Usuario</button>
</form>

<style>
    input, select {
        padding: 0.5rem;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 1rem;
    }
    button {
        font-size: 1rem;
    }
</style>