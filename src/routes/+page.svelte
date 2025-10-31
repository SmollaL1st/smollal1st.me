<script>
  import Book from "$lib/components/Book.svelte";
  import Head from "$lib/components/Head.svelte";
</script>

<Head />

<Book
    name="Smo//a L1st"
    username="SmollaL1st"
    avatar_url="../avatar/a_me.jpg"
    is_verified={true}
/>

<style>
    :global(body) {
        margin: 0;
        font-family: 'Roboto', sans-serif;
        background-color: rgb(var(--m3-scheme-background));
        color: rgb(var(--m3-scheme-on-background));
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }
</style>