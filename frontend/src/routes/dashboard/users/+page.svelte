<script>
	import api from '../../../lib/api.js';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let users = [];
	let error = null;

	function navigateToCreate() {
		goto('/dashboard/users/create');
	}

	// Cargar usuarios desde la API
	onMount(async () => {
		try {
			const res = await api.get('/users'); // Backend valida si el usuario puede acceder
			users = res.data;
		} catch (err) {
			error = err.response?.data?.message || 'Error al cargar los usuarios.';
		}
	});

	async function deleteUser(userId) {
		if (confirm('¿Estás seguro de eliminar este usuario?')) {
			try {
				await api.delete(`/users/${userId}`);
				users = users.filter((user) => user._id !== userId);
			} catch (err) {
				alert('Error al eliminar el usuario');
			}
		}
	}
</script>

<div class="cabecera">
	<h1 class="mb-4 text-2xl font-bold">Usuarios</h1>
	<button class="rounded bg-blue-500 px-4 py-2 text-white" on:click={navigateToCreate}
		>Agregar Usuario</button
	>
</div>

{#if error}
	<p class="text-red-500">{error}</p>
{:else if users.length === 0}
	<p>No hay usuarios disponibles.</p>
{:else}
	<ul class="user-list">
		{#each users as user}
			<li class="user-card">
				<div class="user-info">
					<h2>{user.nombre}</h2>
					<p>Email: {user.email}</p>
					<p>Rol: {user.role}</p>
				</div>
				<div class="user-actions">
					<button on:click={() => deleteUser(user._id)} class="action-button">🗑</button>
				</div>
			</li>
		{/each}
	</ul>
{/if}

<style>
	.cabecera {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	.user-list {
		list-style: none;
		padding: 0;
	}
	.user-card {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
		border: 1px solid #ddd;
		border-radius: 8px;
		margin-bottom: 1rem;
	}
	.user-info h2 {
		font-size: 1rem;
		font-weight: bold;
	}
	.user-info p {
		margin: 0.25rem 0;
		font-size: 0.875rem;
	}
	.user-actions {
		display: flex;
		gap: 0.5rem;
	}
	.action-button {
		background: none;
		border: none;
		font-size: 1.5rem;
		cursor: pointer;
		transition: transform 0.2s;
	}
	.action-button:hover {
		transform: scale(1.2);
	}
</style>
