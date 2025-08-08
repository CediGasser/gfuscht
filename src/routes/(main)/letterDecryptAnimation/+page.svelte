<script lang="ts">
  import Seo from '$lib/components/Seo.svelte'
  import { LetterDecrypt } from './Decrypt.svelte'

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

  let options = {
    duration: 2000,
  }

  const decryptingText = new LetterDecrypt(textBefore, options)

  function handleClick() {
    decryptingText.target =
      actualText == decryptingText.target ? textBefore : actualText
  }
</script>

<Seo
  title="Letter Decrypt Animation"
  description="A letter decrypt animation that reveals text character by character."
  keywords="letter, decrypt, animation, text, reveal, character, svelte"
/>

<main>
  <button onclick={handleClick}>Change Text</button>

  <span>{decryptingText.current}</span>
</main>

<style>
  main {
    height: 100vh;
  }

  span {
    display: block;
    font-family: 'Consolas', Courier, monospace;
  }
</style>
