<script setup>
const groups = [
  { name: 'Agrupación Cuñataí', note: 'Acompañamiento musical en ambas partes del programa.' },
  { name: 'Orquesta Típica Nacional de Bolivia · Teófilo Vargas', note: 'Tradición e interpretación de piezas del repertorio nacional.' },
  { name: 'Canarios del Chaco', note: 'Música y expresiones tradicionales de la región chaqueña.' },
  { name: 'Centro Cultural 3 de Mayo', note: 'Acompañamiento musical de la tarqueada.' },
]
</script>
<template>
  <article class="pagina">
    <div class="contenido-pagina grupos-invitados-pagina">
      <p class="numero-pagina">07</p>
      <p class="etiqueta">INVITADOS ESPECIALES</p>
      <h2>La música que<br />nos acompaña</h2>
      <div class="separador">✦</div>
      <p class="texto-pagina texto-izquierda">Las agrupaciones invitadas acompañan esta gala y se unen en un gran ensamble musical para el cierre.</p>
      <div class="grupos-invitados-lista">
        <section v-for="(group, index) in groups" :key="group.name" class="grupo-invitado">
          <span class="grupo-invitado-numero">0{{ index + 1 }}</span>
          <div><h3>{{ group.name }}</h3><p>{{ group.note }}</p></div>
        </section>
      </div>
      <div class="grupo-foto-placeholder">Espacio para fotografías de las agrupaciones invitadas</div>
      <p class="pie-pagina">Nuestro agradecimiento por ser parte de esta gala</p>
    </div>
  </article>
</template>
