<script setup>
import { computed } from 'vue'
import { firstPart, secondPart } from '../../data/program'
const props = defineProps({ part: { type: String, default: 'first' }, segment: { type: Number, default: 0 } })
const isFirst = computed(() => props.part === 'first')
const allSections = computed(() => isFirst.value ? firstPart : secondPart)
const sections = computed(() => {
  if (isFirst.value) return allSections.value
  return allSections.value
})
const offset = computed(() => {
  if (isFirst.value) return 0
  return 0
})
function danceNumber(sectionIndex, index) {
  const previous = sections.value.slice(0,sectionIndex).reduce((sum,s) => sum+s.dances.length,0)
  return String(offset.value+previous+index+1).padStart(2,'0')
}
</script>
<template>
  <article class="pagina">
    <div class="contenido-pagina programa-pagina programa-definitivo">
      <p class="numero-pagina">{{ isFirst ? (segment === 0 ? '04' : '04') : (segment === 0 ? '06' : '07') }}</p>
      <p class="etiqueta">PROGRAMA</p>
      <h2>{{ isFirst ? 'Primera parte' : 'Segunda parte' }}</h2>

      <section v-for="(section, sectionIndex) in sections" :key="section.group" class="grupo-programa">
        <h3 class="grupo-titulo">Acompañamiento musical: {{ section.group }}</h3>
        <div v-for="(dance, index) in section.dances" :key="dance.name" class="danza-fila">
          <span class="danza-numero">{{ danceNumber(sectionIndex,index) }}</span>
          <span class="danza-info"><span class="danza-nombre danza-texto">{{ dance.name }}</span></span>
        </div>
      </section>
    </div>
  </article>
</template>
