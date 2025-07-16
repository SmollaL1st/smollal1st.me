<script>
    import { version } from "$app/environment";
    import { Button } from "m3-svelte";
</script>

<div class="social-container">
    <Button variant="filled" square iconType="left" click={() => window.open("https://github.com/SmollaL1st", "_blank")}>GitHub</Button>
    <Button variant="filled" square iconType="left" click={() => window.open("https://www.instagram.com/smolla_l1st/", "_blank")}>Instagram</Button>
    <Button variant="filled" square iconType="left" click={() => window.open("https://discord.com/users/651391077269372938", "_blank")}>Discord</Button>
    <Button variant="filled" square iconType="left" click={() => window.open("https://steamcommunity.com/id/smolla_l1st/", "_blank")}>Steam</Button>
    <Button variant="filled" square iconType="left" click={() => window.open("https://mastodon.social/@SmollaL1st", "_blank")} >Mastodon</Button>
    <Button disabled variant="filled" square>ver.{version}</Button>
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

    /* Phone styles */
    @media (max-width: 768px) {
        .social-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 0.5rem;
            justify-content: center;
            max-width: 320px;
            margin: 0 auto;
        }

        .social-container :global(button) {
            width: 100%;
            font-size: 0.875rem;
            padding: 0.6rem 0.8rem;
            min-height: 40px;
        }
    }
</style>
