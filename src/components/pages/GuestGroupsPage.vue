<script setup>
import { ref } from 'vue'
const missing = ref({})
const groups = [
  { name: 'Agrupación Cuñataí', logo: '/images/LogoCunatai.png' },
  { name: 'Orquesta Típica Nacional de Bolivia Teófilo Vargas', logo: '/images/LogoTeofiloVargas.png' },
  { name: 'Canarios del Chaco', logo: '/images/LogoCanariosDelChaco.png' },
  { name: 'Centro Cultural 3 de Mayo', logo: '/images/LogoCentroCultural3DeMayo.png' },
]
</script>
<template>
  <article class="pagina">
    <div class="contenido-pagina grupos-invitados-pagina invitados-logos-pagina">
      <p class="numero-pagina">08</p>
      <p class="etiqueta">INVITADOS ESPECIALES</p>
      <h2>La música que<br />nos acompaña</h2>
      <div class="separador">✦</div>
      <p class="invitados-intro">Cuatro agrupaciones que dan voz, ritmo y emoción a esta gala.</p>
      <div class="invitados-logos-grid">
        <section v-for="group in groups" :key="group.name" class="invitado-logo-card">
          <div class="invitado-logo-espacio">
            <img v-if="!missing[group.name]" :src="group.logo" :alt="`Logotipo de ${group.name}`" @error="missing[group.name] = true" />
            <span v-else class="invitado-logo-pendiente">LOGOTIPO<br />PENDIENTE</span>
          </div>
          <h3>{{ group.name }}</h3>
        </section>
      </div>
      <p class="pie-pagina">Gracias por compartir su música y su talento</p>
    </div>
  </article>
</template>
