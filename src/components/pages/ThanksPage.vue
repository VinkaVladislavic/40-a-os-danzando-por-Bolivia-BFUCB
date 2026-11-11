<script setup>
import { socialLinks } from '../../data/social'
</script>
<template>
  <article class="pagina pagina-final">
    <div class="contenido-pagina agradecimiento-pagina">
      <img src="/images/LogoBallet.png" alt="" class="logo-agradecimientos" />
      <p class="etiqueta">GRACIAS</p>
      <h2>Por celebrar<br />con nosotros</h2>
      <div class="separador">✦</div>
      <p class="texto-pagina">A nuestra Universidad, maestros, bailarines, familias, agrupaciones musicales invitadas, colaboradores y a cada persona que acompaña y apoya este camino.</p>
      <p class="texto-pagina">Gracias al público por mantener viva la cultura y por permitirnos compartir, desde el escenario, el orgullo de nuestras raíces.</p>
      <div class="auspicio-bloque"><p class="etiqueta">AGRADECIMIENTO ESPECIAL</p><h3 class="auspiciador">LA CASCADA</h3><p class="auspicio-texto">Gracias por acompañar y apoyar esta celebración.</p></div>
      <h3>40 años<br />danzando por Bolivia</h3>
      <p class="texto-portada-secundario">BALLET FOLCLÓRICO UCB</p>
      <nav class="redes-sociales" aria-label="Redes sociales del Ballet">
        <a v-if="socialLinks.facebook" :href="socialLinks.facebook" target="_blank" rel="noopener noreferrer">Facebook ↗</a>
        <a v-if="socialLinks.instagram" :href="socialLinks.instagram" target="_blank" rel="noopener noreferrer">Instagram ↗</a>
        <span v-if="!socialLinks.facebook || !socialLinks.instagram" class="redes-pendientes">Enlaces oficiales de redes sociales pendientes de incorporar</span>
      </nav>
    </div>
  </article>
</template>
