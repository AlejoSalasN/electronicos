<script>
    import { goto } from '$app/navigation';

    const links = [
        { name: 'Usuarios', route: '/dashboard/users' },
        { name: 'Productos', route: '/dashboard/products' },
        { name: 'Estadísticas', route: '/dashboard/stats' },
    ];

    function navigateTo(route) {
        goto(route);
    }
</script>

<div class="dashboard-layout">
    <aside class="sidebar">
        <h2 class="sidebar-title">Dashboard</h2>
        <ul class="sidebar-links">
            {#each links as link}
                <li>
                    <button on:click={() => navigateTo(link.route)} class="sidebar-link">{link.name}</button>
                </li>
            {/each}
        </ul>
    </aside>
    <main class="dashboard-content">
        <slot />
    </main>
</div>

<style>
    .dashboard-layout {
        display: flex;
        min-height: 100vh;
    }
    .sidebar {
        width: 250px;
        background-color: #1e293b;
        color: white;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    .sidebar-title {
        font-size: 1.5rem;
        font-weight: bold;
    }
    .sidebar-links {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    .sidebar-link {
        display: block;
        width: 100%;
        padding: 0.75rem;
        background-color: transparent;
        border: none;
        text-align: left;
        color: white;
        font-size: 1rem;
        border-radius: 0.375rem;
        cursor: pointer;
        transition: background-color 0.2s;
    }
    .sidebar-link:hover {
        background-color: #334155;
    }
    .dashboard-content {
        flex-grow: 1;
        padding: 2rem;
        background-color: #f1f5f9;
    }
</style>
