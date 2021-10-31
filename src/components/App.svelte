<script>
    import { Router, Link, Route, navigate } from "svelte-routing";
    import Navigation from "./Navigation.svelte";
    import Settings from "./Settings.svelte";
    import Login from "./Login.svelte";
    import Logout from "./Logout.svelte";

    let signedIn = false;
    const onSignin = (e) => {
        signedIn = true;
        navigate("/");
    }
    const onSignOut = (e) => {
        signedIn = false;
        navigate("login");
    }
</script>

<Router>
    <Navigation isSignedIn={signedIn} />
    
    <div id="pane">
        <Route path="/login"><Login on:signIn={onSignin} /></Route>
        <Route path="/logout"><Logout on:signOut={onSignOut} /></Route>
        <Route path="/settings" component={Settings} />
        <Route path="/">no content</Route>
    </div>
</Router>

<style>
    div#pane {
        padding: 0.3rem;
    }
</style>