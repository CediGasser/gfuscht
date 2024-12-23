<script lang="ts">
  import { Tween } from 'svelte/motion'
  import { ZeroBouncingTween, LetterDecrypt } from './Decrypt.svelte'
  import { expoInOut } from 'svelte/easing'
  import { text } from 'd3'

  let textBefore = `Test Text
  Test Text
  Test Text`

  let actualText = `test text
actual frkn text
Internierung
Internierte französische Soldaten in Zürich
Grabstein für Bourbaki-Soldaten in Mels
Die von Generalstabschef Rudolf Paravicini organisierte Aufnahme von 87.000 durch Hunger und Kälte gezeichnete Soldaten (3 % der damaligen Schweizer Bevölkerung), die untergebracht, verpflegt, medizinisch betreut und bewacht werden mussten, stellte extreme Anforderungen an den noch jungen Schweizer Bundesstaat. Viele der Soldaten mussten mit neuer Kleidung und neuem Schuhwerk ausgerüstet werden. 
Die Internierten wurden auf 190 Ortschaften in allen Kantonen[6] außer dem Tessin verteilt. Der Tessin wurde ausgelassen, da es für die Internierten nicht zumutbar schien, im Januar den verschneiten Gotthard zu überqueren – der Gotthardtunnel wurde erst 1882 eröffnet. Neben Militär, Behörden und Hilfsorganisationen – darunter das ebenfalls noch sehr junge Internationale Komitee der Hilfsgesellschaften für die Verwundetenpflege (das heutige IKRK) – setzte sich auch die Zivilbevölkerung in einer breiten Welle der Hilfeleistungen bei der Betreuung ein.
`
  const size = new Tween(0, { duration: 1000, easing: expoInOut })
  const size2 = new ZeroBouncingTween(1, { duration: 1000, easing: expoInOut })

  const decryptingText = new LetterDecrypt(textBefore, {
    duration: 1000,
  })

  const delayedValue = Tween.of(() => size2.current, {
    duration: 40,
    easing: expoInOut,
  })

  function handleClick() {
    size.target = size.target + 1
    decryptingText.target = actualText
  }
</script>

<main>
  <button onclick={handleClick}>Change Text</button>

  <div class="testBounce">
    <input type="range" bind:value={size2.target} />
    <input type="range" bind:value={size2.current} disabled />
    <input type="range" bind:value={delayedValue.current} disabled />
    <span>{size2.current}</span>
    <span> / {size2.direction}</span>
    <span> / {delayedValue.current}</span>
  </div>

  <br />
  <span>{decryptingText.current}</span>
  <br />
  <span>{decryptingText.tween.direction}</span>
</main>

<style>
  main {
    height: 100vh;
  }

  .testBounce {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  span {
    font-family: 'Consolas', Courier, monospace;
  }
</style>
