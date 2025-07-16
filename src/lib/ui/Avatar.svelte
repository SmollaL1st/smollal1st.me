<script>
    let username = 'Smo//a L1st';
</script>

<div class="avatar-container">
    <div class="avatar-wrapper">
        <img
            src="../avatar/a_me.webp"
            class="avatar-image"
            alt="Profile picture of {username}"
            draggable="false"
        />
    </div>
</div>

<style>
    .avatar-container {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .avatar-wrapper {
        position: relative;
        width: clamp(150px, 25vw, 400px);
        height: clamp(150px, 25vw, 400px);
        border-radius: 20%;
        overflow: hidden;
        box-shadow: 
            0 4px 20px rgba(0, 0, 0, 0.1),
            0 0 0 2px rgb(var(--m3-scheme-outline-variant));
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        transform: scale(1);
    }

    .avatar-wrapper:hover {
        transform: scale(1.05);
        box-shadow: 
            0 8px 30px rgba(0, 0, 0, 0.15),
            0 0 0 3px rgb(var(--m3-scheme-primary));
    }

    .avatar-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* Phone styles */
    @media (max-width: 768px) {
        .avatar-wrapper {
            width: clamp(140px, 30vw, 250px);
            height: clamp(140px, 30vw, 250px);
        }
    }

    /* Reduce motion for accessibility */
    @media (prefers-reduced-motion: reduce) {
        .avatar-wrapper {
            transition: box-shadow 0.1s ease;
        }

        .avatar-wrapper:hover {
            transform: scale(1);
        }
    }

    /* Dark mode optimizations */
    @media (prefers-color-scheme: dark) {
        .avatar-wrapper {
            box-shadow: 
                0 4px 20px rgba(0, 0, 0, 0.3),
                0 0 0 2px rgb(var(--m3-scheme-outline-variant));
        }

        .avatar-wrapper:hover {
            box-shadow: 
                0 8px 30px rgba(0, 0, 0, 0.4),
                0 0 0 3px rgb(var(--m3-scheme-primary));
        }
    }
</style>
