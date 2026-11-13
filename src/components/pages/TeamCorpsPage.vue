<script setup>
import { ref, onBeforeUnmount, watch, computed } from 'vue'
const props = defineProps({ corps: { type: Object, required: true }, pageNumber: { type: Number, required: true }, theme: { type: String, default: 'light' } })
const photoModal = ref(null)
const brokenPhotos = ref({})
const fullName = computed(() => props.corps.name === 'O' ? 'Cuerpo de Baile Oficial' : `Cuerpo de Baile "${props.corps.name}"`)
const prefix = computed(() => props.corps.name === 'O' ? 'Oficial' : props.corps.name)
const photo = computed(() => `/images/Cuerpo${prefix.value}Grupal.jpg`)
let previousOverflow = ''
watch(photoModal, value => {
  if (value) { previousOverflow = document.body.style.overflow; document.body.style.overflow = 'hidden' }
  else document.body.style.overflow = previousOverflow
})
function onKeydown(event) { if (event.key === 'Escape') photoModal.value = null }
window.addEventListener('keydown', onKeydown)
onBeforeUnmount(() => { window.removeEventListener('keydown', onKeydown); document.body.style.overflow = previousOverflow })
function openPhoto(kind) {
  const isBoys = kind === 'boys'
  photoModal.value = {
    title: `${isBoys ? 'Bailarines' : 'Bailarinas'} · ${fullName.value}`,
    image: `/images/Cuerpo${prefix.value}${isBoys ? 'Varones' : 'Mujeres'}.jpg`,
    fallback: isBoys ? 'Fotografía de los bailarines' : 'Fotografía de las bailarinas',
    broken: false,
  }
}
</script>
<template>
  <article class="pagina">
    <div class="contenido-pagina cuerpo-pagina" :class="{ 'solo-mujeres': !corps.members.men.length }">
      <p class="numero-pagina">{{ String(pageNumber).padStart(2, '0') }}</p>
      <p class="etiqueta">NUESTROS CUERPOS DE BAILE</p>
      <h2>{{ fullName }}</h2>
      <figure class="foto-cuerpo foto-mixta foto-grupal-cuerpo">
        <img v-if="!brokenPhotos.grupal" :src="photo" :alt="`${fullName}, fotografía grupal`" @error="brokenPhotos.grupal = true" />
        <figcaption v-else>Fotografía grupal · {{ fullName }}</figcaption>
      </figure>
      <div class="integrantes-cuerpo">
        <div class="integrantes-titulo"><h3>Integrantes</h3><span>{{ corps.members.men.length + corps.members.women.length }} integrantes</span></div>
        <div class="integrantes-dos-columnas" :class="{ 'una-columna': !corps.members.men.length }">
          <section class="integrantes-columna">
            <h4>MUJERES</h4>
            <ol class="lista-integrantes"><li v-for="(member, index) in corps.members.women" :key="`m-${index}`">{{ member }}</li></ol>
            <button v-if="corps.members.men.length" type="button" class="foto-integrantes-btn" @pointerdown.stop @touchstart.stop @click.stop="openPhoto('girls')">Ver foto de las bailarinas</button>
          </section>
          <section v-if="corps.members.men.length" class="integrantes-columna">
            <h4>VARONES</h4>
            <ol class="lista-integrantes"><li v-for="(member, index) in corps.members.men" :key="`h-${index}`">{{ member }}</li></ol>
            <button type="button" class="foto-integrantes-btn" @pointerdown.stop @touchstart.stop @click.stop="openPhoto('boys')">Ver foto de los bailarines</button>
          </section>
        </div>
      </div>
      <p class="pie-pagina">Ballet Folclórico Universidad Católica Boliviana</p>
    </div>
    <Teleport to="body"><Transition name="modal">
      <div v-if="photoModal" class="modal-backdrop photo-modal-backdrop" @click.self="photoModal = null">
        <section class="photo-viewer" :class="{ 'modal-dark': theme === 'dark' }" role="dialog" @click.stop @pointerdown.stop aria-modal="true" :aria-label="photoModal.title">
          <button type="button" class="modal-close" aria-label="Cerrar" @click.stop="photoModal = null">×</button>
          <h3>{{ photoModal.title }}</h3>
          <img v-if="!photoModal.broken" :src="photoModal.image" :alt="photoModal.title" @error="photoModal.broken = true" />
          <div v-else class="photo-viewer-placeholder">{{ photoModal.fallback }}<small>Espacio reservado para incorporar la fotografía</small></div>
          <button type="button" class="modal-bottom-close" @click.stop="photoModal = null">Cerrar</button>
        </section>
      </div>
    </Transition></Teleport>
  </article>
</template>
