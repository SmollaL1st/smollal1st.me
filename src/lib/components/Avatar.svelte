<script lang="ts">
    export let url: string = "";
    export let username: string = "";
    export let size: number = 40;

    function getInitials(username: string): string {
        const nameParts = username.split(/[\._\s]+/);
        const initials = nameParts
            .filter((part) => part.length > 0)
            .map((part) => part[0].toUpperCase())
            .join("");
        return initials;
    }
</script>

<div class="avatar">
    {#if url}
        <img
            src={url}
            alt={username}
            class="avatar"
            style="width: {size}px; height: {size}px;"
        />
    {:else}
        <div
            class="initials"
            style="width: {size}px; height: {size}px; line-height: {size}px;"
        >
            {getInitials(username)}
        </div>
    {/if}
</div>

<style>
    .avatar {
        border-radius: 36px;
        margin: 20px auto;
        display: block;
    }

    .initials {
        background-color: #93cdf6;
        color: white;
        font-size: 80px;
        border-radius: 36px;
        margin: 20px auto;
    }
</style>