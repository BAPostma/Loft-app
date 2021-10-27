<script>
    import { Router, Link, Route } from "svelte-routing";
    import Settings from "./Settings.svelte";
    
    export let name = "world";

    const settings = () => {
        console.log("settings!");
    }
</script>

<h1>Hello {name}</h1>

<Router>
    <nav>
        <Link to="/">Dashboard</Link>
        <Link to="settings">Settings</Link>
    </nav>
    
    <div id="pane">
        <Route path="settings" component={Settings} />
        <Route path="/">no content</Route>
    </div>
</Router>