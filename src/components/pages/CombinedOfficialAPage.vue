<script setup>
defineProps({ official: { type: Object, required: true }, groupA: { type: Object, required: true } })
</script>

<template>
  <article class="pagina">
    <div class="contenido-pagina cuerpos-combinados">
      <p class="numero-pagina">11</p>
      <p class="etiqueta">NUESTROS CUERPOS DE BAILE</p>
      <section v-for="(corps, idx) in [official, groupA]" :key="corps.name" class="cuerpo-resumen">
        <h2>{{ idx === 0 ? 'Cuerpo de Baile Oficial' : 'Cuerpo de Baile &quot;A&quot;' }}</h2>
        <div class="resumen-columnas">
          <div><h3>MUJERES</h3><ul><li v-for="name in corps.members.women" :key="name">{{ name }}</li></ul></div>
          <div><h3>VARONES</h3><ul><li v-for="name in corps.members.men" :key="name">{{ name }}</li></ul></div>
        </div>
      </section>
      <p class="pie-pagina">Ballet Folclórico Universidad Católica Boliviana</p>
    </div>
  </article>
</template>
