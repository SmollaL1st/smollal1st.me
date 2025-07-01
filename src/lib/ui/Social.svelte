<script>
    import { Button} from "m3-svelte"
    import { version } from "$app/environment";
</script>

<div class="social-container">
    <Button variant="filled" square iconType="left" click={() => window.open("https://github.com/SmollaL1st", "_blank")}>GitHub</Button>
    <Button variant="filled" square iconType="left" click={() => window.open("https://www.instagram.com/smolla_l1st/", "_blank")}>Instagram</Button>
    <Button variant="filled" square iconType="left" click={() => window.open("https://discord.com/users/651391077269372938", "_blank")}>Discord</Button>
    <a rel="me" href="https://mastodon.social/@SmollaL1st"><Button variant="filled" square iconType="left" click={() => window.open("https://mastodon.social/@SmollaL1st", "_blank")}>Mastodon</Button></a>
    <Button variant="filled" square iconType="left" click={() => window.open("https://steamcommunity.com/id/smolla_l1st/", "_blank")}>Steam</Button>
    <Button disabled variant="outlined" square>site v{version}</Button>
</div>

<style>
    .social-container {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: center;
        max-width: 100%;
    }

    .social-container :global(button) {
        flex: 0 0 auto;
        min-width: auto;
        white-space: nowrap;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* Tablet optimization */
    @media (max-width: 1024px) {
        .social-container {
            gap: 0.75rem;
            justify-content: center;
        }
    }

    /* Mobile optimization */
    @media (max-width: 768px) {
        .social-container {
            gap: 0.5rem;
            justify-content: center;
            max-width: 100%;
        }

        .social-container :global(button) {
            font-size: 0.875rem;
            padding: 0.5rem 1rem;
            min-height: 40px;
        }
    }

    /* Small mobile - stack buttons vertically or use smaller grid */
    @media (max-width: 480px) {
        .social-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0.5rem;
            justify-items: center;
            max-width: 280px;
            margin: 0 auto;
        }

        .social-container :global(button) {
            width: 100%;
            min-width: 120px;
            font-size: 0.8rem;
            padding: 0.6rem 0.8rem;
        }
    }

    /* Very small screens - single column */
    @media (max-width: 320px) {
        .social-container {
            grid-template-columns: 1fr;
            max-width: 200px;
        }
    }
</style>