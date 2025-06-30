<script lang="ts">
    export let _title: string = "";
    export let _description: string = "Smolla L1st";
    export let _image: string = "";
  
    const title = _title ? `${_title}` : "Smolla L1st";
  </script>
  
  <svelte:head>
    <title>{title}</title>
    <meta name="description" content={_description} />
    <meta name="image" content={_image} />
  
    <meta property="og:title" content={title} />
    <meta property="og:description" content={_description} />
    <meta property="og:url" content="https://smollal1st.me" />
    <meta property="og:image" content={_image} />
    <meta property="og:site_name" content="smollal1st.me" />
  
    <!-- Twitter -->
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={_description} />
    <meta name="twitter:image" content={_image} />

  </svelte:head>