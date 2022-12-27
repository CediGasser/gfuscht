<script lang="ts">
    let content = "Hello World";
    let input: HTMLInputElement;

    let animate = false;

    // copy content to clipboard
    function copyToClipboard(): void {
        navigator.clipboard.writeText(content);
        if (!animate) {
            setTimeout(() => {
                animate = false;
            }, 1500);
        }
        animate = true;
    }

    // mark content on click
    function inputEnter(): void {
        input.select();
    }

    function handleKeydown(event: KeyboardEvent): void {
        if (event.ctrlKey && event.key === "c") {
            copyToClipboard();
        }
    }
</script>


<svelte:body on:keydown={handleKeydown} />
<div class="wrapper">
    <h1>Ctrl + C... V2</h1>
    <input bind:this={input} type="text" bind:value={content} on:click={inputEnter}/>
    <button on:click={copyToClipboard}>Copy 
        <div class="svg-container">
            <svg fill="white" aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" class:animate={animate} class="copy">
                <path fill-rule="evenodd" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"></path><path fill-rule="evenodd" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"></path>
            </svg>
            <svg fill="white" aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" class:animate={animate} class="success">
                <path fill-rule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path>
            </svg>
        </div>
    </button>
</div>

<svelte:head>
    <style>
        html {
            background: radial-gradient(circle at bottom right, #42275a 0, #734b6d 100%);
            height: 100vh;
        }
    </style>
</svelte:head>

<style>
    * {
        font-family: 'Courier New', Courier, monospace;
        color: rgb(236, 232, 252);
    }
    div.wrapper {
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

    button:hover {
        transition: filter 150ms;
        filter: brightness(110%);
        transform: translateY(-2px);
        transition:
            transform
            150ms
            cubic-bezier(.3, .7, .4, 1.5);
    }

    button:focus-visible {
        outline: #db9cff solid 2px;
    }

    button:active {
        background-color: #f00c0c;
        transition: filter 150ms;
        filter: brightness(120%);
    }

    .svg-container {
        position: relative;
        display: inline;
        width: 1.5rem;
        height: 1.5rem;
        margin-left: 1rem;
    }

    button svg {
        position: absolute;
        top: 20%;
        left: 0;
        width: 1rem;
        margin: auto;
    }

    button svg.success {
        display: none;
    }

    button svg.copy.animate {
        animation: animateCopy 1500ms;
    }

    button svg.success.animate {
        animation: animateSuccess 1500ms;
        display: inline;
    }

    @keyframes animateCopy {
        0% {
            transform: scale(1) rotate(0deg);
            display: inline;
        }
        5% {
            transform: scale(0) rotate(90deg);
            display: none;
        }
        95% {
            transform: scale(0) rotate(90deg);
            display: none;
        }
        100% {
            transform: scale(1) rotate(0deg);
            display: inline;
        }
    }

    @keyframes animateSuccess {
        0% {
            transform: scale(0) rotate(90deg);
            display: none;
        }
        5% {
            transform: scale(0) rotate(90deg);
            display: inline;
        }
        10% {
            transform: scale(1) rotate(0deg);
            display: inline;
        }
        90% {
            transform: scale(1) rotate(0deg);
            display: inline;
        }
        95% {
            transform: scale(0) rotate(90deg);
            display: none;
        }
        100% {
            transform: scale(0);
            display: none;
        }
    }
</style>