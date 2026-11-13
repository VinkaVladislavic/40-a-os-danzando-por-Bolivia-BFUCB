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
const totalPages = 17
const themeMode = ref('dark')
const showGuide = ref(false)
function dismissGuide() { showGuide.value = false; try { localStorage.setItem('gala-navigation-guide-v1', 'seen') } catch {} }
function toggleTheme() { themeMode.value = themeMode.value === 'dark' ? 'light' : 'dark' }
let pageFlip = null
let navigationLocked = false
let navigationUnlockTimer = null
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
  if (!pageFlip || modalActive.value) return
  // No dependemos de un bloqueo que pueda quedar activo si la librería
  // no emite el evento de finalización en ciertos navegadores móviles.
  const from = pageFlip.getCurrentPageIndex()
  const target = Math.max(0, Math.min(pageFlip.getPageCount() - 1, from + (direction === 'next' ? 1 : -1)))
  if (target === from || navigationLocked) return
  navigationLocked = true
  clearTimeout(navigationUnlockTimer)
  try {
    if (direction === 'next') pageFlip.flipNext('top')
    else pageFlip.flipPrev('top')
  } catch (error) {
    console.warn('Se usará navegación directa:', error)
    pageFlip.turnToPage(target)
  }
  navigationUnlockTimer = window.setTimeout(() => {
    if (pageFlip) {
      // Fallback: garantiza avanzar incluso cuando la animación se interrumpe.
      if (pageFlip.getCurrentPageIndex() === from) pageFlip.turnToPage(target)
      currentPage.value = pageFlip.getCurrentPageIndex()
    }
    navigationLocked = false
  }, 1100)
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
function onKeydown(event) {
  if (!programaAbierto.value || modalActive.value) return
  if (event.key === 'ArrowRight') goNext()
  if (event.key === 'ArrowLeft') goPrev()
}

watch(programaAbierto, async opened => {
  if (opened) {
    await nextTick()
    showGuide.value = false
    if (!libro.value) return
    const compact = window.matchMedia('(max-width: 767px)').matches
    pageFlip = new PageFlip(libro.value, {
      width: compact ? 360 : 420, height: compact ? 548 : 640, size: 'stretch',
      minWidth: 250, maxWidth: 840, minHeight: 380, maxHeight: 1280,
      showCover: true, usePortrait: true, mobileScrollSupport: true,
      flippingTime: 920, maxShadowOpacity: 0.32, autoSize: true,
      drawShadow: true, clickEventForward: false, disableFlipByClick: true, useMouseEvents: false, swipeDistance: 9999,
    })
    pageFlip.loadFromHTML(libro.value.querySelectorAll('.pagina'))
    pageFlip.on('flip', updatePage)
    currentPage.value = pageFlip.getCurrentPageIndex()
    resizeObserver = new ResizeObserver(() => {
      if (!navigationLocked) requestAnimationFrame(() => { if (!navigationLocked) pageFlip?.update() })
    })
    resizeObserver.observe(libro.value.parentElement)
    window.addEventListener('keydown', onKeydown)
  } else {
    clearTimeout(navigationUnlockTimer); navigationLocked = false
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
  clearTimeout(navigationUnlockTimer)
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
        <button class="boton-abrir" @click="programaAbierto = true"><span>Descubrir el programa</span><span class="flecha">→</span></button>
      </div>
    </section>

    <section v-else class="seccion-libro">
      <div class="barra-libro">
        <button class="boton-cerrar" @click="programaAbierto = false">← <span>Portada</span></button>
        <div class="progreso-wrap"><span>{{ String(currentPage + 1).padStart(2, '0') }} / {{ totalPages }}</span><div class="progreso"><i :style="{ width: progress + '%' }"></i></div></div>
        <div class="controles-libro"><button class="nav-top" type="button" @click="goPrev" :disabled="currentPage === 0 || modalActive" aria-label="Página anterior">‹</button><button class="nav-top" type="button" @click="goNext" :disabled="currentPage >= totalPages - 1 || modalActive" aria-label="Página siguiente">›</button><button class="theme-toggle" @click="toggleTheme" :aria-label="themeMode === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'">{{ themeMode === 'dark' ? '☼' : '☾' }}</button></div>
      </div>
      <div class="libro-contenedor">

        <div ref="libro" class="libro" :class="{ 'libro-modal-abierto': modalActive }">
          <BookCoverPage />
          <HistoryPage />
          <IdentityPage />
          <ProgramPage part="first" :segment="0" />
          <ProgramPage part="first" :segment="1" />
          <IntermissionPage />
          <ProgramPage part="second" :segment="0" />
          <ProgramPage part="second" :segment="1" />
          <GuestGroupsPage />
          <TeamPage />
          <TeamCorpsPage v-for="(corps, index) in danceCorps" :key="corps.name" :corps="corps" :page-number="11 + index" :theme="themeMode" />
          <ThanksPage />
        </div>

        <nav class="navegacion-lateral" aria-label="Pasar páginas">
          <button type="button" class="nav-lateral nav-lateral-prev" @click.stop="goPrev" :disabled="currentPage === 0 || modalActive" aria-label="Página anterior"><span aria-hidden="true">‹</span></button>
          <button type="button" class="nav-lateral nav-lateral-next" @click.stop="goNext" :disabled="currentPage >= totalPages - 1 || modalActive" aria-label="Página siguiente"><span aria-hidden="true">›</span></button>
        </nav>
      </div>
      <p class="instruccion-libro">Usa las flechas laterales o superiores · Amplía con dos dedos</p>


    </section>
  </main>
</template>
