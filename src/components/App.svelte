<script>
    import { Router, Link, Route } from "svelte-routing";
    import Navigation from "./Navigation.svelte";
    import Settings from "./Settings.svelte";
    import Login from "./Login.svelte";
    
    const settings = () => {
        console.log("settings!");
    }
</script>

<Router>
    <Navigation />
    
    <div id="pane">
        <Route path="/login" component={Login} />
        <Route path="/settings" component={Settings} />
        <Route path="/">no content</Route>
    </div>
</Router>

<style>
    div#pane {
        padding: 0.3rem;
    }
</style>