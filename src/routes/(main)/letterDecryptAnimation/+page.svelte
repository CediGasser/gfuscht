<script lang="ts">
  import { tweened } from "svelte/motion";
  import { letterDecryptAnimation } from "./Decrypt.svelte";
  import { expoInOut } from "svelte/easing";

  const decrypt = letterDecryptAnimation("");

  let actualText = `test text
actual frkn text
Internierung
Internierte französische Soldaten in Zürich
Grabstein für Bourbaki-Soldaten in Mels
Die von Generalstabschef Rudolf Paravicini organisierte Aufnahme von 87.000 durch Hunger und Kälte gezeichnete Soldaten (3 % der damaligen Schweizer Bevölkerung), die untergebracht, verpflegt, medizinisch betreut und bewacht werden mussten, stellte extreme Anforderungen an den noch jungen Schweizer Bundesstaat. Viele der Soldaten mussten mit neuer Kleidung und neuem Schuhwerk ausgerüstet werden. 
Die Internierten wurden auf 190 Ortschaften in allen Kantonen[6] außer dem Tessin verteilt. Der Tessin wurde ausgelassen, da es für die Internierten nicht zumutbar schien, im Januar den verschneiten Gotthard zu überqueren – der Gotthardtunnel wurde erst 1882 eröffnet. Neben Militär, Behörden und Hilfsorganisationen – darunter das ebenfalls noch sehr junge Internationale Komitee der Hilfsgesellschaften für die Verwundetenpflege (das heutige IKRK) – setzte sich auch die Zivilbevölkerung in einer breiten Welle der Hilfeleistungen bei der Betreuung ein.
`;
  const size = tweened(0, {
    duration: 1000,
    easing: expoInOut,
  });

  function handleClick() {
    // this is equivalent to size.update(n => n + 1)
    $size = 1;
    decrypt.value = actualText;
  }
</script>

<main>
  <button onclick={handleClick}>Change Text</button>

  <p>{decrypt.animated}</p>
  <p>{$size}</p>
</main>

<style>
  main {
    height: 100vh;
  }
</style>
