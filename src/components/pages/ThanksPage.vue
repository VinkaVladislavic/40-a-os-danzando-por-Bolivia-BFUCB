<script setup>
import { ref } from 'vue'
import { socialLinks } from '../../data/social'
const missing = ref({})
const sponsors = [
  { name: 'LA CASCADA', logo: '/images/LogoAuspiciador1.png' },
  { name: 'Segundo auspiciador', logo: '/images/LogoAuspiciador2.png' },
]
</script>
<template>
  <article class="pagina pagina-final">
    <div class="contenido-pagina agradecimiento-pagina agradecimiento-v16">
      <img src="/images/LogoBallet.png" alt="Ballet Folclórico UCB" class="logo-agradecimientos" />
      <h2>¡Gracias por celebrar<br />con nosotros!</h2>
      <p class="texto-pagina">A nuestra Universidad, maestros, bailarines, familias, agrupaciones musicales invitadas, colaboradores y a cada persona que acompaña y apoya este camino.</p>
      <p class="texto-pagina">Gracias al público por mantener viva la cultura y por permitirnos compartir, desde el escenario, el orgullo de nuestras raíces.</p>
      <div class="auspicio-bloque auspicios-dobles">
        <p class="etiqueta">CON EL APOYO DE</p>
        <div class="auspiciadores-logos">
          <div v-for="sponsor in sponsors" :key="sponsor.name" class="auspiciador-logo">
            <img v-if="!missing[sponsor.name]" :src="sponsor.logo" :alt="sponsor.name" @error="missing[sponsor.name] = true" />
            <span v-else>{{ sponsor.name }}</span>
          </div>
        </div>
      </div>
      <h3>40 años danzando por Bolivia</h3>
      <p class="texto-portada-secundario">BALLET FOLCLÓRICO UCB</p>
      <nav class="redes-sociales" aria-label="Redes sociales del Ballet">
        <a v-if="socialLinks.facebook" :href="socialLinks.facebook" target="_blank" rel="noopener noreferrer">Facebook ↗</a>
        <a v-if="socialLinks.instagram" :href="socialLinks.instagram" target="_blank" rel="noopener noreferrer">Instagram ↗</a>
        <span v-if="!socialLinks.facebook && !socialLinks.instagram" class="redes-pendientes">Enlaces oficiales de redes sociales pendientes de incorporar</span>
      </nav>
    </div>
  </article>
</template>
