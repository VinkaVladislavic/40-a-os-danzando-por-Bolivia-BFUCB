<script setup>
import { computed } from 'vue'
import { firstPart, secondPart } from '../../data/program'
const props = defineProps({ part: { type: String, default: 'first' }, segment: { type: Number, default: 0 } })
const isFirst = computed(() => props.part === 'first')
const allSections = computed(() => isFirst.value ? firstPart : secondPart)
const sections = computed(() => {
  if (isFirst.value) return props.segment === 0 ? allSections.value.slice(0,1) : allSections.value.slice(1)
  return props.segment === 0 ? allSections.value.slice(0,2) : allSections.value.slice(2)
})
const offset = computed(() => {
  if (isFirst.value) return props.segment === 0 ? 0 : 6
  return props.segment === 0 ? 0 : 5
})
function danceNumber(sectionIndex, index) {
  const previous = sections.value.slice(0,sectionIndex).reduce((sum,s) => sum+s.dances.length,0)
  return String(offset.value+previous+index+1).padStart(2,'0')
}
</script>
<template>
  <article class="pagina">
    <div class="contenido-pagina programa-pagina programa-definitivo">
      <p class="numero-pagina">{{ isFirst ? (segment === 0 ? '03' : '04') : (segment === 0 ? '06' : '07') }}</p>
      <p class="etiqueta">PROGRAMA ARTÍSTICO</p>
      <h2>{{ isFirst ? 'Primera parte' : 'Segunda parte' }}</h2>
      <p class="programa-continuacion" v-if="segment">Continuación</p>
      <div class="separador">✦</div>
      <section v-for="(section, sectionIndex) in sections" :key="section.group" class="grupo-programa">
        <h3 class="grupo-titulo">{{ section.group }}</h3>
        <div v-for="(dance, index) in section.dances" :key="dance.name" class="danza-fila">
          <span class="danza-numero">{{ danceNumber(sectionIndex,index) }}</span>
          <span class="danza-info"><span class="danza-nombre danza-texto">{{ dance.name }}</span></span>
        </div>
      </section>
      <div class="programa-sello" aria-hidden="true"><span class="sello-ornamento">✦</span><span>40 AÑOS DANZANDO POR BOLIVIA</span><span class="sello-bandera"></span></div>
    </div>
  </article>
</template>
