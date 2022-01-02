<script>
    import { Router, Link, Route, navigate } from "svelte-routing";
    import Dashboard from "./Dashboard.svelte";
    import Navigation from "./Navigation.svelte";
    import Settings from "./Settings.svelte";
    import Login from "./Login.svelte";
    import Logout from "./Logout.svelte";
    import MessageDetails from "./message/MessageDetails.svelte";

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
        <Route path="/"><Dashboard /></Route>
        <Route path="/message/:id" component={MessageDetails} />
    </div>
</Router>

<style>
    div#pane {
        width: 100vw;
    }
</style>