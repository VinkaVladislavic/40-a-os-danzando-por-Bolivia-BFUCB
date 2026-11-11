<script setup>
import { ref, nextTick, watch, onBeforeUnmount, computed } from 'vue'
import { PageFlip } from 'page-flip'
import BookCoverPage from './components/pages/BookCoverPage.vue'
import HistoryPage from './components/pages/HistoryPage.vue'
import IdentityPage from './components/pages/IdentityPage.vue'
import ProgramPage from './components/pages/ProgramPage.vue'
import IntermissionPage from './components/pages/IntermissionPage.vue'
import TeamPage from './components/pages/TeamPage.vue'
import ThanksPage from './components/pages/ThanksPage.vue'
import GuestGroupsPage from './components/pages/GuestGroupsPage.vue'
import TeamCorpsPage from './components/pages/TeamCorpsPage.vue'
import { danceCorps } from './data/team'
import DanceModal from './components/common/DanceModal.vue'

const programaAbierto = ref(false)
const libro = ref(null)
const danceSelected = ref(null)
const modalOriginPage = ref(null)
const modalActive = ref(false)
const currentPage = ref(0)
const totalPages = 15
const themeMode = ref('light')
function toggleTheme() { themeMode.value = themeMode.value === 'dark' ? 'light' : 'dark' }
let pageFlip = null
let resizeObserver = null
const progress = computed(() => Math.min(100, Math.round(((currentPage.value + 1) / totalPages) * 100)))

function updatePage(event) {
  // Never allow an asynchronous flip to change the page while a dialog is open.
  if (modalActive.value) {
    if (modalOriginPage.value !== null && event.data !== modalOriginPage.value) {
      requestAnimationFrame(() => pageFlip?.turnToPage(modalOriginPage.value))
    }
    return
  }
  currentPage.value = event.data ?? 0
}
function goNext() { if (!modalActive.value) pageFlip?.flipNext('top') }
function goPrev() { if (!modalActive.value) pageFlip?.flipPrev('top') }
function openDance(dance) {
  // Record the actual physical book page before opening the dialog.
  modalOriginPage.value = pageFlip?.getCurrentPageIndex() ?? currentPage.value
  currentPage.value = modalOriginPage.value
  modalActive.value = true
  danceSelected.value = dance
}
function closeDance() {
  danceSelected.value = null
  // A pending touch/flip animation can finish after the dialog closes.
  // Restore the exact page immediately and after the animation settles.
  const origin = modalOriginPage.value
  if (origin !== null) {
    pageFlip?.turnToPage(origin)
    currentPage.value = origin
    window.setTimeout(() => {
      pageFlip?.turnToPage(origin)
      currentPage.value = origin
      modalActive.value = false
      modalOriginPage.value = null
    }, 760)
  } else {
    modalActive.value = false
  }
}
function handleBookClick(event) {
  if (modalActive.value || event.target.closest('button, a, [role=button]')) return
  const rect = libro.value?.getBoundingClientRect()
  if (!rect) return
  const x = event.clientX - rect.left
  const edge = Math.max(42, rect.width * 0.12)
  if (x > rect.width - edge) goNext()
  else if (x < edge) goPrev()
}
function onKeydown(event) {
  if (!programaAbierto.value || modalActive.value) return
  if (event.key === 'ArrowRight') goNext()
  if (event.key === 'ArrowLeft') goPrev()
}

watch(programaAbierto, async opened => {
  if (opened) {
    await nextTick()
    if (!libro.value) return
    const compact = window.matchMedia('(max-width: 767px)').matches
    pageFlip = new PageFlip(libro.value, {
      width: compact ? 360 : 420, height: compact ? 548 : 640, size: 'stretch',
      minWidth: 250, maxWidth: 840, minHeight: 380, maxHeight: 1280,
      showCover: true, usePortrait: true, mobileScrollSupport: false,
      flippingTime: 720, maxShadowOpacity: 0.24, autoSize: true,
      drawShadow: true, clickEventForward: false, useMouseEvents: true, swipeDistance: 24,
    })
    pageFlip.loadFromHTML(libro.value.querySelectorAll('.pagina'))
    pageFlip.on('flip', updatePage)
    resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(() => pageFlip?.update())
    })
    resizeObserver.observe(libro.value.parentElement)
    window.addEventListener('keydown', onKeydown)
  } else {
    resizeObserver?.disconnect(); resizeObserver = null
    window.removeEventListener('keydown', onKeydown)
    if (pageFlip) { pageFlip.destroy(); pageFlip = null }
    currentPage.value = 0
    modalActive.value = false
    danceSelected.value = null
    modalOriginPage.value = null
  }
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  resizeObserver?.disconnect()
  pageFlip?.destroy()
})
</script>

<template>
  <main class="gala" :class="`theme-${themeMode}`">
    <section v-if="!programaAbierto" class="portada">
      <div class="portada-fondo"></div><div class="portada-overlay"></div>
      <img src="/images/bandera.png" alt="" class="bandera" />
      <div class="contenido-portada">
        <img src="/images/LogoBallet.png" alt="Ballet Folclórico UCB" class="logo" />
        <p class="subtitulo">BALLET FOLCLÓRICO <span>UNIVERSIDAD CATÓLICA BOLIVIANA</span></p>
        <img src="/images/Titulo.png" alt="40 años Danzando por Bolivia" class="titulo-imagen" />
        <div class="ornamento"><span></span><span class="estrella">✦</span><span></span></div>
        <p class="fecha">SÁBADO 14 Y DOMINGO 15<br />DE NOVIEMBRE DE 2026</p>
        <p class="lugar">Teatro Municipal <strong>“Alberto Saavedra Pérez”</strong></p>
        <p class="hora">19:00</p>
        <button class="theme-toggle portada-theme-toggle" @click="toggleTheme" :aria-label="themeMode === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'">{{ themeMode === 'dark' ? '☼ Modo claro' : '☾ Modo oscuro' }}</button>
        <button class="boton-abrir" @click="programaAbierto = true"><span>Abrir programa</span><span class="flecha">→</span></button>
        <p class="indicacion">Una celebración de nuestras raíces</p>
      </div>
    </section>

    <section v-else class="seccion-libro">
      <div class="barra-libro">
        <button class="boton-cerrar" @click="programaAbierto = false">← <span>Portada</span></button>
        <div class="progreso-wrap"><span>{{ String(currentPage + 1).padStart(2, '0') }} / {{ totalPages }}</span><div class="progreso"><i :style="{ width: progress + '%' }"></i></div></div>
        <div class="controles-libro"><button class="theme-toggle" @click="toggleTheme" :aria-label="themeMode === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'">{{ themeMode === 'dark' ? '☼' : '☾' }}</button><button aria-label="Página anterior" @click="goPrev">‹</button><button aria-label="Página siguiente" @click="goNext">›</button></div>
      </div>
      <div class="libro-contenedor">
        <button class="flecha-lateral flecha-izquierda" aria-label="Página anterior" @click="goPrev">‹</button>
        <div ref="libro" class="libro" :class="{ 'libro-modal-abierto': modalActive }" @click="handleBookClick">
          <BookCoverPage />
          <HistoryPage />
          <IdentityPage />
          <ProgramPage part="first" @select-dance="openDance" />
          <IntermissionPage />
          <ProgramPage part="second" @select-dance="openDance" />
          <GuestGroupsPage />
          <TeamPage />
          <TeamCorpsPage v-for="(corps, index) in danceCorps" :key="corps.name" :corps="corps" :page-number="9 + index" :theme="themeMode" />
          <ThanksPage />
        </div>
        <button class="flecha-lateral flecha-derecha" aria-label="Página siguiente" @click="goNext">›</button>
      </div>
      <p class="instruccion-libro"><span class="desktop-hint">Haz clic en los bordes o arrastra las páginas</span><span class="mobile-hint">Desliza o toca los bordes para pasar de página</span></p>
      <DanceModal :dance="danceSelected" :theme="themeMode" @close="closeDance" />
    </section>
  </main>
</template>
