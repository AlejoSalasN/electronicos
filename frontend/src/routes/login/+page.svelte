<script>
    import { loginUser } from '../../lib/auth.js';
    import { goto } from '$app/navigation';

    let email = '';
    let password = '';
    let error = '';

    async function handleSubmit(event) {
        try {
            const user = await loginUser(email, password);
            if (user) {
                goto('/dashboard'); // Asegura que la redirección funcione
            } else {
                console.log("juasjuas");
            }
        } catch (err) {
            error = err.message;
        }
    }
</script>

<form on:submit={handleSubmit} class="max-w-md mx-auto mt-10">
    <h1 class="text-2xl font-bold mb-5">Iniciar sesión</h1>

    {#if error}
        <p class="text-red-500 mb-4">{error}</p>
    {/if}

    <div class="mb-4">
        <label for="email" class="block text-sm font-medium">Correo</label>
        <input
            id="email"
            type="email"
            bind:value={email}
            required
            class="w-full p-2 border rounded"
        />
    </div>

    <div class="mb-4">
        <label for="password" class="block text-sm font-medium">Contraseña</label>
        <input
            id="password"
            type="password"
            bind:value={password}
            required
            class="w-full p-2 border rounded"
        />
    </div>

    <button type="submit" class="w-full bg-blue-500 text-white p-2 rounded">Ingresar</button>
</form>
