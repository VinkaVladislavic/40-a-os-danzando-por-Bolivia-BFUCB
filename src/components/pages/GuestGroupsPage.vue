<script setup>
const groups = [
  'Orquesta Típica Nacional de Bolivia «Teófilo Vargas»',
  '«Canarios del Chaco»',
  'Agrupación «Cuñataí»',
  'Centro Cultural «3 de Mayo»',
]
</script>
<template>
  <article class="pagina">
    <div class="contenido-pagina grupos-invitados-pagina invitados-logos-pagina">
      <p class="numero-pagina">08</p>
      <p class="etiqueta">INVITADOS ESPECIALES</p>
      <h2>La música que<br />nos acompaña</h2>
      <p class="invitados-intro">Cuatro agrupaciones que dan voz, ritmo y emoción a esta gala.</p>
      <div class="invitados-lista-v29">
        <div v-for="(group, index) in groups" :key="group" class="invitado-fila-v29">
          <span class="invitado-numero-v29">{{ String(index + 1).padStart(2, '0') }}</span>
          <h3>{{ group }}</h3>
        </div>
      </div>
      <img class="logo-invitados-inferior-v30" src="/images/LogoBallet.png" alt="Logo del Ballet Folclórico UCB" />
    </div>
  </article>
</template>
