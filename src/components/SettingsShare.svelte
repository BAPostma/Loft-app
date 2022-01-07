<script>
    import { onMount } from "svelte";
    import { BrowserStorage } from "../clients/BrowserStorage";
    import { ConfigQR } from "../services/ConfigQR";
    
    const settings = BrowserStorage.getSettings();
    let qrCodeDataUri = "";

    onMount(async () => {
        qrCodeDataUri = await ConfigQR.generateCode(settings);
    });
    </script>

<div class="sharing">
    <img id="qr-code" src={qrCodeDataUri} alt="QR code for sharing settings" />
    <p>
        Scan the QR code to easily transfer settings between your devices.<br />
        <small>You are required to login on each individual device.</small>
    </p>
</div>

<style>
    div.sharing p {
        display: block;
        text-align: center;
    }

    div.sharing img#qr-code {
        display: block;
        margin: 0.5em auto;
    }
</style>