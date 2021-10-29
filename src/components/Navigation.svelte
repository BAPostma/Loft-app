<script>
    import { Link } from "svelte-routing";
</script>

<nav class="header">
    <div class="pure-menu pure-menu-horizontal">
        <Link class="pure-menu-heading" to="/">Loft 🕊</Link>
        <ul class="pure-menu-list">
            <li class="pure-menu-item"><Link class="pure-menu-link" to="/">Dashboard</Link></li>
            <li class="pure-menu-item"><Link class="pure-menu-link" to="/settings">Settings</Link></li>
            <li class="pure-menu-item"><Link class="pure-menu-link" to="/login">Login</Link></li>
        </ul>
    </div>
</nav>

<style>
    nav {
        background-color: azure;
    }
</style>