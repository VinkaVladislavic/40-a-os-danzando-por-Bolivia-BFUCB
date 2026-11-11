<script setup>
import { firstPart, secondPart } from '../../data/program'
const emit = defineEmits(['select-dance'])
defineProps({ part: { type: String, default: 'first' } })
const sections = firstPart
const second = secondPart
function danceNumber(sectionIndex, index) {
  return String(sections.slice(0, sectionIndex).reduce((n, section) => n + section.dances.length, 0) + index + 1).padStart(2, '0')
}
</script>
<template>
  <article class="pagina">
    <div class="contenido-pagina programa-pagina">
      <p class="numero-pagina">{{ part === 'first' ? '03' : '05' }}</p>
      <p class="etiqueta">PROGRAMA ARTÍSTICO</p>
      <h2>{{ part === 'first' ? 'Primera parte' : 'Segunda parte' }}</h2>
      <p v-if="part === 'second'" class="aviso-provisional">Repertorio tentativo · orden sujeto a confirmación</p>
      <div class="separador">✦</div>
      <template v-if="part === 'first'">
        <section v-for="(section, sectionIndex) in sections" :key="section.group" class="grupo-programa">
          <h3 class="grupo-titulo">{{ section.group }}</h3>
          <button v-for="(dance, index) in section.dances" :key="dance.name" class="danza-fila" type="button" @pointerdown.stop @touchstart.stop @click.stop="emit('select-dance', { ...dance, group: section.group, part: 'Primera parte' })">
            <span class="danza-numero">{{ danceNumber(sectionIndex, index) }}</span>
            <span class="danza-info"><strong>{{ dance.name }}</strong><small>Canción: {{ dance.song }} · Compositor: {{ dance.composer }}</small></span>
            <span class="danza-ver" aria-hidden="true">＋</span>
          </button>
        </section>
      </template>
      <template v-else>
        <section class="grupo-programa">
          <h3 class="grupo-titulo">Repertorio por confirmar</h3>
          <button v-for="(dance, index) in second" :key="dance.name" class="danza-fila" type="button" @pointerdown.stop @touchstart.stop @click.stop="emit('select-dance', { ...dance, group: 'Elenco del Ballet Folclórico UCB', part: 'Segunda parte', tentative: true })">
            <span class="danza-numero">{{ String(index + 12).padStart(2, '0') }}</span>
            <span class="danza-info"><strong>{{ dance.name }}</strong><small>Canción y compositor por confirmar</small></span>
            <span class="danza-ver" aria-hidden="true">＋</span>
          </button>
        </section>
      </template>
      <p class="nota-interaccion">Toca una danza para conocer más</p>
      <p class="pie-pagina">{{ part === 'first' ? 'Primera parte · 11 números' : 'Segunda parte · repertorio tentativo' }}</p>
    </div>
  </article>
</template>
