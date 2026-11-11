<script setup>
import { ref, onBeforeUnmount, watch } from 'vue'
const props = defineProps({ corps: { type: Object, required: true }, pageNumber: { type: Number, required: true }, theme: { type: String, default: 'light' } })
const photoModal = ref(null)
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
    title: isBoys ? `Chicos · Cuerpo ${props.corps.name}` : `Chicas · Cuerpo ${props.corps.name}`,
    image: isBoys ? props.corps.photos.boys : props.corps.photos.girls,
    fallback: isBoys ? 'Fotografía de los bailarines' : 'Fotografía de las bailarinas',
  }
}
</script>

<template>
  <article class="pagina">
    <div class="contenido-pagina cuerpo-pagina">
      <p class="numero-pagina">{{ String(pageNumber).padStart(2, '0') }}</p>
      <p class="etiqueta">NUESTROS CUERPOS DE BAILE</p>
      <h2>Cuerpo {{ corps.name }}</h2>
      <div class="separador">✦</div>

      <figure class="foto-cuerpo foto-mixta foto-grupal-cuerpo">
        <img v-if="corps.photos.mixed" :src="corps.photos.mixed" :alt="`Cuerpo ${corps.name}, fotografía grupal`" />
        <figcaption v-else>Fotografía grupal de chicos y chicas</figcaption>
      </figure>

      <div class="integrantes-cuerpo">
        <div class="integrantes-titulo">
          <h3>Integrantes</h3>
          <span>{{ corps.members.men.length + corps.members.women.length }} bailarines</span>
        </div>
        <div class="integrantes-dos-columnas">
          <section class="integrantes-columna">
            <h4>Hombres</h4>
            <ol v-if="corps.members.men.length" class="lista-integrantes">
              <li v-for="(member, index) in corps.members.men" :key="`h-${index}`">{{ member }}</li>
            </ol>
            <p v-else class="integrantes-pendientes">Nombres por incorporar</p>
            <button type="button" class="foto-integrantes-btn" @pointerdown.stop @touchstart.stop @click.stop="openPhoto('boys')">Ver foto de chicos <span>↗</span></button>
          </section>
          <section class="integrantes-columna">
            <h4>Mujeres</h4>
            <ol v-if="corps.members.women.length" class="lista-integrantes">
              <li v-for="(member, index) in corps.members.women" :key="`m-${index}`">{{ member }}</li>
            </ol>
            <p v-else class="integrantes-pendientes">Nombres por incorporar</p>
            <button type="button" class="foto-integrantes-btn" @pointerdown.stop @touchstart.stop @click.stop="openPhoto('girls')">Ver foto de chicas <span>↗</span></button>
          </section>
        </div>
      </div>
      <p class="pie-pagina">Ballet Folclórico Universidad Católica Boliviana</p>
    </div>

    <Teleport to="body">
      <Transition name="modal">
        <div v-if="photoModal" class="modal-backdrop photo-modal-backdrop" @click.self="photoModal = null">
          <section class="photo-viewer" :class="{ 'modal-dark': theme === 'dark' }" role="dialog" @click.stop @pointerdown.stop aria-modal="true" :aria-label="photoModal.title">
            <button type="button" class="modal-close" aria-label="Cerrar" @click.stop="photoModal = null">×</button>
            <h3>{{ photoModal.title }}</h3>
            <img v-if="photoModal.image" :src="photoModal.image" :alt="photoModal.title" />
            <div v-else class="photo-viewer-placeholder">{{ photoModal.fallback }}<small>Espacio reservado para incorporar la fotografía</small></div>
            <button type="button" class="modal-bottom-close" @click.stop="photoModal = null">Cerrar</button>
          </section>
        </div>
      </Transition>
    </Teleport>
  </article>
</template>
