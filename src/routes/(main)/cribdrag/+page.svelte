<script lang="ts">
  import {
    cribDrag,
    isValidHex,
    type CribResult,
    stringToHex,
    hexXor,
  } from "$lib/classes/crib-drag.svelte";
  import Seo from "$lib/components/Seo.svelte";

  let newMessageInput = $state("");
  let inputError = $state("");
  let showExplainer = $state(true);
  let filterPrintableOnly = $state(true);

  function handleAddMessage() {
    if (!newMessageInput.trim()) {
      inputError = "Please enter a hex string";
      return;
    }

    if (!isValidHex(newMessageInput)) {
      inputError = "Invalid hex format. Use only 0-9 and A-F characters.";
      return;
    }

    const result = cribDrag.addMessage(newMessageInput);
    if (result) {
      newMessageInput = "";
      inputError = "";
    } else {
      inputError = "This message already exists or is invalid.";
    }
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Enter") {
      handleAddMessage();
    }
  }

  function handleCribInput(e: Event) {
    const target = e.target as HTMLInputElement;
    cribDrag.setCrib(target.value);
  }

  function selectResult(result: CribResult) {
    cribDrag.selectPosition(result.position);
  }

  function loadExample() {
    cribDrag.clear();
    // Two messages encrypted with the same key:
    const key = stringToHex("SECRETKEY123456");
    const msg1 = stringToHex("Attack at dawn!");
    const msg2 = stringToHex("Meet me at noon");

    const encMsg1 = hexXor(key, msg1);
    const encMsg2 = hexXor(key, msg2);

    cribDrag.addMessage(encMsg1);
    cribDrag.addMessage(encMsg2);
  }

  // Filter results based on user preference
  const filteredResults = $derived(
    filterPrintableOnly
      ? cribDrag.cribResults.filter((r) => r.isPrintable)
      : cribDrag.cribResults,
  );

  // Highlight likely matches
  const likelyMatches = $derived(
    cribDrag.cribResults.filter((r) => r.looksLikeText),
  );
</script>

<Seo
  title="Crib Drag Tool"
  description="An interactive tool to decrypt OTP messages using the crib dragging technique when the same key has been reused."
  keywords="otp, crib drag, decrypt, encryption, one time pad, cryptanalysis, xor"
/>

<main class="min-h-screen bg-(--theme-base) text-(--theme-text) p-4 md:p-8">
  <div class="max-w-6xl mx-auto">
    <!-- Header -->
    <header class="mb-8">
      <h1 class="text-3xl md:text-4xl font-bold mb-2">Crib Drag Attack Tool</h1>
      <p class="text-(--theme-subtle) text-lg">
        Break XOR encryption when the same key is reused
      </p>
    </header>

    <!-- How It Works Section -->
    <section class="bg-(--theme-surface) rounded-xl p-6 mt-6">
      <button
        class="flex items-center justify-between w-full text-left"
        onclick={() => (showExplainer = !showExplainer)}
      >
        <h2 class="text-xl font-semibold flex items-center gap-2">
          How Crib Dragging Works
        </h2>
        <span
          class="text-xl transition-transform duration-200 text-(--theme-primary)"
          class:rotate-180={showExplainer}
        >
          ▼
        </span>
      </button>

      {#if showExplainer}
        <div class="mt-4 space-y-4 text-(--theme-subtle)">
          <div class="bg-(--theme-overlay) rounded-lg p-4">
            <h3 class="font-semibold text-(--theme-text) mb-2">
              The Vulnerability
            </h3>
            <p>
              A One-Time Pad (OTP) is theoretically unbreakable, but <strong
                >only if the key is used once</strong
              >. When the same key encrypts multiple messages, XOR's properties
              create a weakness:
            </p>
            <div class="bg-(--theme-base) rounded p-3 mt-2 font-mono text-sm">
              C₁ = M₁ ⊕ K (Ciphertext 1 = Message 1 XOR Key)<br />
              C₂ = M₂ ⊕ K (Ciphertext 2 = Message 2 XOR Key)<br />
              <br />
              C₁ ⊕ C₂ = M₁ ⊕ M₂ (The key cancels out!)
            </div>
          </div>

          <div class="bg-(--theme-overlay) rounded-lg p-4">
            <h3 class="font-semibold text-(--theme-text) mb-2">The Attack</h3>
            <ol class="list-decimal list-inside space-y-2">
              <li>
                <strong>Add ciphertexts</strong> – Enter 2+ messages encrypted with
                the same key
              </li>
              <li>
                <strong>Guess a "crib"</strong> – A word/phrase likely in one message
                (e.g., "the ", "Hello", "http://")
              </li>
              <li>
                <strong>Drag the crib</strong> – The tool XORs your guess at each
                position
              </li>
              <li>
                <strong>Look for readable text</strong> – If the other message(s)
                decrypt to something readable, you found a match!
              </li>
              <li>
                <strong>Iterate</strong> – Use discovered text as new cribs to reveal
                more
              </li>
            </ol>
          </div>

          <div class="bg-(--theme-overlay) rounded-lg p-4">
            <h3 class="font-semibold text-(--theme-text) mb-2">
              Tips for Choosing Cribs
            </h3>
            <ul class="list-disc list-inside space-y-1">
              <li>
                Common words: <code class="bg-(--theme-base) px-1 rounded"
                  >"the "</code
                >,
                <code class="bg-(--theme-base) px-1 rounded">" and "</code>,
                <code class="bg-(--theme-base) px-1 rounded">"Hello"</code>
              </li>
              <li>
                Protocols: <code class="bg-(--theme-base) px-1 rounded"
                  >"http://"</code
                >,
                <code class="bg-(--theme-base) px-1 rounded">"GET /"</code>,
                <code class="bg-(--theme-base) px-1 rounded">"HTTP/1"</code>
              </li>
              <li>
                Context clues: Names, locations, or terms related to the
                messages' purpose
              </li>
              <li>Include spaces – they're often good indicators!</li>
            </ul>
          </div>
        </div>
      {/if}
    </section>

    <!-- Step 1: Add Messages -->
    <section class="bg-(--theme-surface) rounded-xl p-6 mt-6">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-semibold">
          <span
            class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-(--theme-primary) text-(--theme-base) mr-2"
            >1</span
          >
          Add Encrypted Messages
        </h2>
        <div class="flex gap-2">
          <button
            onclick={loadExample}
            class="px-3 py-1.5 text-sm bg-(--theme-overlay) hover:bg-(--theme-highlight-low) rounded-lg transition-colors"
          >
            Load Example
          </button>
          {#if cribDrag.messages.length > 0}
            <button
              onclick={() => cribDrag.clear()}
              class="px-3 py-1.5 text-sm bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg transition-colors"
            >
              Clear All
            </button>
          {/if}
        </div>
      </div>

      <p class="text-(--theme-subtle) mb-4">
        Enter hex-encoded ciphertexts that were encrypted with the same key.
      </p>

      <!-- Message List -->
      {#if cribDrag.messages.length > 0}
        <div class="space-y-3 mb-4">
          {#each cribDrag.messages as msg, idx (msg.id)}
            {@const isActive = msg.id === cribDrag.activeMessageId}
            <div
              class="flex items-start gap-3 p-3 rounded-lg transition-colors {isActive
                ? 'bg-(--theme-primary)/10'
                : 'bg-(--theme-overlay)'}"
            >
              <button
                onclick={() => cribDrag.setActiveMessage(msg.id)}
                class="shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors {isActive
                  ? 'bg-(--theme-primary) text-(--theme-base)'
                  : 'bg-(--theme-highlight-mid)'}"
                title="Click to select as active message"
              >
                {idx + 1}
              </button>

              <div class="grow min-w-0">
                <div
                  class="font-mono text-sm break-all bg-(--theme-base) p-2 rounded"
                >
                  {msg.encrypted}
                </div>
                {#if msg.decrypted}
                  <div
                    class="font-mono text-sm mt-1 text-(--theme-primary) break-all"
                  >
                    Decrypted: {msg.decrypted}
                  </div>
                {/if}
              </div>

              <button
                onclick={() => cribDrag.removeMessage(msg.id)}
                class="shrink-0 p-1.5 hover:bg-red-500/20 rounded transition-colors text-red-400"
                title="Remove message"
              >
                ✕
              </button>
            </div>
          {/each}
        </div>

        <p class="text-sm text-(--theme-subtle) mb-4">
          <span class="text-(--theme-primary)">●</span>
          The highlighted message is the "active" message where your crib will be
          applied. Click on a message number to change it.
        </p>
      {/if}

      <!-- Add Message Input -->
      <div class="flex gap-2">
        <div class="grow">
          <input
            type="text"
            bind:value={newMessageInput}
            onkeydown={handleKeyDown}
            placeholder="Enter hex-encoded ciphertext (e.g., 3b101c091d53320c)"
            class="w-full px-4 py-2 bg-(--theme-overlay) border border-(--theme-highlight-mid) rounded-lg focus:border-(--theme-primary) focus:outline-none font-mono"
          />
          {#if inputError}
            <p class="text-red-400 text-sm mt-1">{inputError}</p>
          {/if}
        </div>
        <button
          onclick={handleAddMessage}
          class="px-6 py-2 bg-(--theme-primary) text-(--theme-base) rounded-lg hover:opacity-90 transition-opacity font-medium"
        >
          Add
        </button>
      </div>
    </section>

    <!-- Step 2: Enter Crib -->
    <section class="bg-(--theme-surface) rounded-xl p-6 mt-6">
      <h2 class="text-xl font-semibold mb-4">
        <span
          class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-(--theme-primary) text-(--theme-base) mr-2"
          >2</span
        >
        Enter Your Crib (Guessed Plaintext)
      </h2>

      <p class="text-(--theme-subtle) mb-4">
        Enter a word or phrase you think might be in the active message. Common
        cribs include "the ", "Hello", "http://", or any text relevant to the
        message context.
      </p>

      <div class="flex gap-4 items-center">
        <input
          type="text"
          value={cribDrag.crib}
          oninput={handleCribInput}
          placeholder="Enter guessed plaintext (e.g., 'the ')"
          class="grow px-4 py-2 bg-(--theme-overlay) border border-(--theme-highlight-mid) rounded-lg focus:border-(--theme-primary) focus:outline-none"
        />
        {#if cribDrag.crib}
          <div class="font-mono text-sm bg-(--theme-overlay) px-3 py-2 rounded">
            Hex: {cribDrag.cribHex}
          </div>
        {/if}
      </div>

      {#if cribDrag.messages.length < 2}
        <p class="text-yellow-500 mt-4 text-sm">
          ⚠️ Add at least 2 encrypted messages to start crib dragging.
        </p>
      {/if}
    </section>

    <!-- Step 3: Results -->
    {#if cribDrag.crib && cribDrag.messages.length >= 2}
      <section class="bg-(--theme-surface) rounded-xl p-6 mt-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-semibold">
            <span
              class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-(--theme-primary) text-(--theme-base) mr-2"
              >3</span
            >
            Select a Position
          </h2>

          <label class="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              bind:checked={filterPrintableOnly}
              class="rounded"
            />
            Show only printable results
          </label>
        </div>

        <p class="text-(--theme-subtle) mb-4">
          Click on a result where the decrypted text looks readable. Results
          highlighted in
          <span class="text-green-400 font-medium">green</span> are more likely to
          be correct.
        </p>

        {#if filteredResults.length === 0}
          <p class="text-(--theme-subtle) text-center py-8">
            No results found. Try a different crib or disable the printable
            filter.
          </p>
        {:else}
          <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
          >
            {#each filteredResults as result (result.position)}
              {@const isLikely = result.looksLikeText}
              {@const isSelected =
                cribDrag.selectedPosition === result.position}
              {@const buttonClass = isSelected
                ? "border-[var(--theme-primary)] bg-[var(--theme-primary)]/20"
                : isLikely
                  ? "border-green-500/50 bg-green-500/10 hover:bg-[var(--theme-highlight-low)]"
                  : "border-transparent bg-(--theme-overlay) hover:bg-[var(--theme-highlight-low)]"}
              <button
                onclick={() => selectResult(result)}
                class="p-3 rounded-lg text-left transition-all border-2 {buttonClass}"
              >
                <div class="text-xs text-(--theme-subtle) mb-1">
                  Position {result.position}
                </div>
                {#each result.decryptedParts as part, idx (idx)}
                  <div
                    class="font-mono text-sm truncate"
                    class:text-[var(--theme-primary)]={idx === 0}
                  >
                    {part || "(empty)"}
                  </div>
                {/each}
              </button>
            {/each}
          </div>
        {/if}

        {#if likelyMatches.length > 0 && likelyMatches.length < filteredResults.length}
          <p class="text-sm text-(--theme-subtle) mt-4">
            💡 Found {likelyMatches.length} likely match{likelyMatches.length >
            1
              ? "es"
              : ""} (highlighted in green)
          </p>
        {/if}
      </section>
    {/if}

    <!-- Key Fragment -->
    {#if cribDrag.derivedKeyFragment}
      <section class="bg-(--theme-surface) rounded-xl p-6 mt-6">
        <h2 class="text-xl font-semibold mb-4">🔑 Derived Key Fragment</h2>
        <p class="text-(--theme-subtle) mb-4">
          Based on your crib at position {cribDrag.derivedKeyFragment.position},
          here's the key fragment:
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-(--theme-overlay) p-4 rounded-lg">
            <div class="text-sm text-(--theme-subtle) mb-1">Key (Hex)</div>
            <div class="font-mono text-lg break-all">
              {cribDrag.derivedKeyFragment.keyHex}
            </div>
          </div>
          <div class="bg-(--theme-overlay) p-4 rounded-lg">
            <div class="text-sm text-(--theme-subtle) mb-1">Key (ASCII)</div>
            <div class="font-mono text-lg break-all">
              {cribDrag.derivedKeyFragment.keyText}
            </div>
          </div>
        </div>
      </section>
    {/if}

    <!-- Decryption Progress -->
    {#if cribDrag.messages.some((m) => m.decrypted)}
      <section class="bg-(--theme-surface) rounded-xl p-6 mt-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-semibold">📝 Decryption Progress</h2>
          <button
            onclick={() => cribDrag.resetDecryption()}
            class="px-3 py-1.5 text-sm bg-(--theme-overlay) hover:bg-[var(--theme-highlight-low)] rounded-lg transition-colors"
          >
            Reset Decryption
          </button>
        </div>
        <div class="space-y-3">
          {#each cribDrag.messages as msg, idx (msg.id)}
            <div class="bg-(--theme-overlay) p-4 rounded-lg">
              <div class="text-sm text-(--theme-subtle) mb-1">
                Message {idx + 1}
              </div>
              <div class="font-mono text-lg break-all">
                {#each msg.decrypted.split("") as char, charIdx (charIdx)}
                  {#if char === "_"}
                    <span class="text-(--theme-subtle)">_</span>
                  {:else}
                    <span class="text-(--theme-primary)">{char}</span>
                  {/if}
                {/each}
                {#if !msg.decrypted}
                  <span class="text-(--theme-subtle)">(not yet decrypted)</span>
                {/if}
              </div>
            </div>
          {/each}
        </div>
      </section>
    {/if}

    <!-- Footer -->
    <footer class="text-center text-(--theme-subtle) text-sm py-4 mt-8">
      <p>
        Learn more about
        <a
          href="https://en.wikipedia.org/wiki/Crib_(cryptanalysis)"
          target="_blank"
          rel="noopener noreferrer"
          class="text-(--theme-primary) hover:underline">crib dragging</a
        >
        and
        <a
          href="https://en.wikipedia.org/wiki/One-time_pad"
          target="_blank"
          rel="noopener noreferrer"
          class="text-(--theme-primary) hover:underline"
          >One-Time Pad encryption</a
        >
      </p>
    </footer>
  </div>
</main>
