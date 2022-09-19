<script lang="ts">
    let content = "Hello World";
    let input: HTMLInputElement;

    // copy content to clipboard
    function copyToClipboard() {
        navigator.clipboard.writeText(content);
    }

    // mark conent on click
    function inputEnter() {
        input.select();
    }
</script>

<div>
    <h1>Ctrl + C... V2</h1>
    <input bind:this={input} type="text" bind:value={content} on:click={inputEnter}/>
    <button type="button" on:click={copyToClipboard}>Copy</button>
</div>

<style>
    :global(html) {
        background: radial-gradient(circle at bottom right, #42275a 0, #734b6d 100%);
        height: 100vh;
    }

    * {
        font-family: 'Courier New', Courier, monospace;
        color: rgb(236, 232, 252);
    }
    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1rem;
    }

    button {
        all: unset;
        cursor: pointer;
        background-color: #b22222;
        cursor: pointer;
    }

    input, button {
        box-sizing: border-box;
        all: unset;
        width: 100%;
        height: 2rem;
        font-size: 1.5rem;
        margin: 0.5rem;
        border-radius: 16px;
        text-align: center;
        padding: 8px;
    }

    input {
        border: 2px solid rgba(255, 255, 255, 0.2);
        transition: 150ms;
    }

    input:focus {
        box-shadow: inset 3px 3px 8px 6px rgba(0,0,0,0.2);
        border: 2px solid rgba(0,0,0,0);
        transition: 150ms;
        filter: brightness(110%);
    }

    button {
        background: radial-gradient(circle at bottom right, #c80eb0 0, #2937f9 100%);
        cursor: pointer;
    }

    button:hover, button:focus {
        transition: filter 150ms;
        filter: brightness(110%);
        transform: translateY(-2px);
        transition:
            transform
            150ms
            cubic-bezier(.3, .7, .4, 1.5);
    }

    button:active {
        background-color: #f00c0c;
        transition: filter 150ms;
        filter: brightness(120%);
    }

</style>