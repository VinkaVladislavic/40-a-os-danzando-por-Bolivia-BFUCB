<script setup>
import { onBeforeUnmount, watch } from 'vue'

const props = defineProps({ dance: { type: Object, default: null }, theme: { type: String, default: 'light' } })
const emit = defineEmits(['close'])
let previousOverflow = ''
let startY = 0
let lastFocusedElement = null

function close() { emit('close') }
function onKeydown(event) { if (event.key === 'Escape' && props.dance) close() }
function onHandleTouchStart(event) { startY = event.touches?.[0]?.clientY ?? 0 }
function onHandleTouchEnd(event) {
  const endY = event.changedTouches?.[0]?.clientY ?? startY
  if (endY - startY > 65) close()
}
watch(() => props.dance, value => {
  if (value) {
    lastFocusedElement = document.activeElement
    previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.documentElement.classList.add('dialog-open')
  } else {
    document.body.style.overflow = previousOverflow
    document.documentElement.classList.remove('dialog-open')
    requestAnimationFrame(() => lastFocusedElement?.focus?.({ preventScroll: true }))
  }
}, { immediate: true })
window.addEventListener('keydown', onKeydown)
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = previousOverflow
  document.documentElement.classList.remove('dialog-open')
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="dance" class="modal-backdrop dance-modal-backdrop" @click.self.stop="close" @pointerdown.stop @pointerup.stop @pointercancel.stop @touchstart.stop @touchmove.stop @touchend.stop>
        <section class="dance-modal" :class="{ 'modal-dark': theme === 'dark' }" role="dialog" aria-modal="true" :aria-label="dance.name" @click.stop @pointerdown.stop @pointerup.stop @touchstart.stop @touchend.stop>
          <div class="modal-handle" aria-hidden="true" @touchstart="onHandleTouchStart" @touchend="onHandleTouchEnd"></div>
          <button class="modal-close" type="button" aria-label="Cerrar" @pointerdown.stop @touchstart.stop @click.stop.prevent="close">×</button>
          <div class="modal-scroll">
            <div class="modal-photo" :class="{ 'modal-photo-con-imagen': dance.image }">
              <img v-if="dance.image" :src="dance.image" :alt="`Ballet Folclórico UCB interpretando ${dance.name}`" />
              <span v-else>Fotografía del Ballet<br />{{ dance.name }}<small>Espacio reservado para una fotografía de esta danza</small></span>
            </div>
            <div class="modal-content">
              <p class="etiqueta">{{ dance.part || 'PROGRAMA ARTÍSTICO' }} <span v-if="dance.tentative">· TENTATIVO</span></p>
              <h2>{{ dance.name }}</h2>
              <p class="modal-region">{{ dance.region }}</p>
              <div class="separador">✦</div>
              <p class="modal-description">{{ dance.description }}</p>
              <div class="modal-meta"><span>AGRUPACIÓN / INTÉRPRETES</span><strong>{{ dance.group || 'Ballet Folclórico UCB' }}</strong></div>
              <div class="modal-meta"><span>CANCIÓN</span><strong>{{ dance.song || 'Por confirmar' }}</strong></div>
              <div class="modal-meta"><span>COMPOSITOR ORIGINAL</span><strong>{{ dance.composer || 'Por confirmar' }}</strong></div>
              <p class="modal-note">La reseña es introductoria. Los datos musicales se completarán cuando se confirme la pieza interpretada y su autoría.</p>
            </div>
          </div>
          <button class="modal-bottom-close" type="button" @pointerdown.stop @touchstart.stop @click.stop.prevent="close">← Continuar explorando el programa</button>
        </section>
      </div>
    </Transition>
  </Teleport>
</template>
