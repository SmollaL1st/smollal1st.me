<script>
    import Avatar from "$lib/ui/Avatar.svelte";
    import HeroTitle from "$lib/ui/HeroTitle.svelte";
    import Social from "$lib/ui/Social.svelte";
    import Head from "$lib/ui/Head.svelte";
</script>

<Head />
<div class="page-container">
    <main class="content-grid">
        <div class="avatar-section">
            <Avatar />
        </div>
        <div class="content-section">
            <HeroTitle />
            <div class="social-section">
                <Social />
            </div>
        </div>
    </main>
</div>

<style>
    :global(body) {
        margin: 0;
        padding: 0;
        min-height: 100vh;
        min-height: 100dvh;
        font-family: var(--font-one, system-ui, sans-serif);
        background-color: rgb(var(--m3-scheme-background));
        color: rgb(var(--m3-scheme-on-background));
        transition: background-color 0.3s ease;
        overflow-x: hidden; /* Prevent horizontal scroll */
    }

    :global(html) {
        height: 100%;
        scroll-behavior: smooth;
        overflow-x: hidden; /* Prevent horizontal scroll */
    }

    :root {
        --font-one: "Space Grotesk", sans-serif;
        --font-two: "JetBrains Mono", monospace;
        --content-max-width: 1200px;
        --mobile-breakpoint: 768px;
        --tablet-breakpoint: 1024px;
        --grid-gap: 3rem;
        --mobile-gap: 2rem;
        --transition-speed: 0.4s;
        --transition-easing: cubic-bezier(0.4, 0, 0.2, 1);
    }

    .page-container {
        min-height: 100vh;
        min-height: 100dvh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem 1rem;
        box-sizing: border-box;
        width: 100%;
        max-width: 100vw;
    }

    .content-grid {
        display: grid;
        grid-template-columns: auto 1fr;
        grid-template-areas: "avatar content";
        gap: var(--grid-gap);
        max-width: var(--content-max-width);
        width: 100%;
        align-items: center;
        transition: all var(--transition-speed) var(--transition-easing);
    }

    .avatar-section {
        grid-area: avatar;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all var(--transition-speed) var(--transition-easing);
    }

    .content-section {
        grid-area: content;
        display: flex;
        flex-direction: column;
        gap: 2rem;
        transition: all var(--transition-speed) var(--transition-easing);
        min-width: 0; /* Allow content to shrink */
    }

    .social-section {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        transition: all var(--transition-speed) var(--transition-easing);
        width: 100%;
        max-width: 100%;
        overflow: hidden;
    }

    /* Tablet layout */
    @media (max-width: 1024px) {
        :root {
            --grid-gap: 2.5rem;
        }
        
        .content-grid {
            max-width: 90%;
        }

        .social-section {
            justify-content: center;
        }
    }

    /* Mobile layout */
    @media (max-width: 768px) {
        :root {
            --grid-gap: var(--mobile-gap);
        }

        .page-container {
            padding: 1.5rem 0.75rem;
        }

        .content-grid {
            grid-template-columns: 1fr;
            grid-template-areas: 
                "avatar"
                "content";
            text-align: center;
            max-width: min(95%, 500px);
            width: 100%;
        }

        .content-section {
            gap: 1.5rem;
            align-items: center;
        }

        .social-section {
            justify-content: center;
            width: 100%;
            max-width: 100%;
        }
    }

    /* Small mobile adjustments */
    @media (max-width: 480px) {
        .page-container {
            padding: 1rem 0.5rem;
        }

        .content-grid {
            max-width: min(98%, 400px);
        }

        .content-section {
            gap: 1.25rem;
        }

        .social-section {
            width: 100%;
            max-width: 100%;
        }
    }

    /* Very small screens */
    @media (max-width: 320px) {
        .page-container {
            padding: 1rem 0.25rem;
        }

        .content-grid {
            max-width: 100%;
        }
    }

    /* Reduce motion for accessibility */
    @media (prefers-reduced-motion: reduce) {
        :root {
            --transition-speed: 0.1s;
        }

        :global(*) {
            animation-duration: 0.1s !important;
            transition-duration: 0.1s !important;
        }
    }
</style>
