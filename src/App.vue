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
const showGuide = ref(false)
function dismissGuide() { showGuide.value = false; try { localStorage.setItem('gala-navigation-guide-v1', 'seen') } catch {} }
function toggleTheme() { themeMode.value = themeMode.value === 'dark' ? 'light' : 'dark' }
let pageFlip = null
let lastNavigationAt = 0
let lastPointerStart = null
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
function navigate(direction) {
  if (modalActive.value || !pageFlip || showGuide.value) return
  const now = performance.now()
  // Prevent a single touch/click from starting a second page turn.
  if (now - lastNavigationAt < 850) return
  lastNavigationAt = now
  if (direction === 'next') pageFlip.flipNext('top')
  else pageFlip.flipPrev('top')
}
function goNext() { navigate('next') }
function goPrev() { navigate('prev') }
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
function handleBookPointerDown(event) {
  if (event.target.closest('button, a, [role="button"]')) { lastPointerStart = null; return }
  lastPointerStart = { x: event.clientX, y: event.clientY, time: performance.now() }
}
function handleBookClick(event) {
  if (modalActive.value || showGuide.value || event.target.closest('button, a, [role="button"]')) return
  if (lastPointerStart) {
    const moved = Math.hypot(event.clientX - lastPointerStart.x, event.clientY - lastPointerStart.y)
    if (moved > 12) return // Leave swipes to page-flip, not the tap handler.
  }
  const rect = libro.value?.getBoundingClientRect()
  if (!rect) return
  const x = event.clientX - rect.left
  // A tap anywhere in either half of the visible book works.
  if (x >= rect.width / 2) goNext()
  else goPrev()
}
function onKeydown(event) {
  if (!programaAbierto.value || modalActive.value) return
  if (event.key === 'ArrowRight') goNext()
  if (event.key === 'ArrowLeft') goPrev()
}

watch(programaAbierto, async opened => {
  if (opened) {
    await nextTick()
    try { showGuide.value = localStorage.getItem('gala-navigation-guide-v1') !== 'seen' } catch { showGuide.value = true }
    if (!libro.value) return
    const compact = window.matchMedia('(max-width: 767px)').matches
    pageFlip = new PageFlip(libro.value, {
      width: compact ? 360 : 420, height: compact ? 548 : 640, size: 'stretch',
      minWidth: 250, maxWidth: 840, minHeight: 380, maxHeight: 1280,
      showCover: true, usePortrait: true, mobileScrollSupport: false,
      flippingTime: 720, maxShadowOpacity: 0.24, autoSize: true,
      drawShadow: true, clickEventForward: false, disableFlipByClick: true, useMouseEvents: true, swipeDistance: 24,
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
    showGuide.value = false
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
        <button class="boton-abrir" @click="programaAbierto = true"><span>Descubrir el programa</span><span class="flecha">→</span></button>
        <p class="indicacion">Una celebración de nuestras raíces</p>
      </div>
    </section>

    <section v-else class="seccion-libro">
      <div class="barra-libro">
        <button class="boton-cerrar" @click="programaAbierto = false">← <span>Portada</span></button>
        <div class="progreso-wrap"><span>{{ String(currentPage + 1).padStart(2, '0') }} / {{ totalPages }}</span><div class="progreso"><i :style="{ width: progress + '%' }"></i></div></div>
        <div class="controles-libro"><button class="theme-toggle" @click="toggleTheme" :aria-label="themeMode === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'">{{ themeMode === 'dark' ? '☼' : '☾' }}</button></div>
      </div>
      <div class="libro-contenedor">

        <div ref="libro" class="libro" :class="{ 'libro-modal-abierto': modalActive }" @pointerdown.capture="handleBookPointerDown" @click="handleBookClick">
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

      </div>
      <p class="instruccion-libro">Toca la mitad izquierda o derecha, o desliza para pasar de página · Pellizca para ampliar</p>
      <Teleport to="body"><Transition name="guide"><div v-if="showGuide" class="guide-overlay" role="dialog" aria-modal="true" aria-label="Cómo utilizar el programa"><div class="guide-card"><img src="/images/LogoBallet.png" alt="Ballet Folclórico UCB" class="guide-logo"/><p class="guide-kicker">TU PROGRAMA DIGITAL</p><h2>Una historia en cada página</h2><div class="guide-gesture" aria-hidden="true">☝ <span>↔</span></div><p><strong>Toca cualquier mitad de la página</strong> o <strong>desliza</strong> para pasar las páginas.</p><p>Toca una danza para descubrir su historia. Puedes <strong>ampliar con dos dedos</strong> como en cualquier página web.</p><button class="guide-cta" @click="dismissGuide">Comenzar a explorar <span>→</span></button></div></div></Transition></Teleport>
      <DanceModal :dance="danceSelected" :theme="themeMode" @close="closeDance" />
    </section>
  </main>
</template>
