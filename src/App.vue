
<script setup>
import { ref, nextTick, watch, onBeforeUnmount } from 'vue'
import { PageFlip } from 'page-flip'

const programaAbierto = ref(false)
const libro = ref(null)

let pageFlip = null

watch(programaAbierto, async (abierto) => {
  if (abierto) {
    await nextTick()

    if (libro.value && !pageFlip) {
      pageFlip = new PageFlip(libro.value, {
        width: 400,
        height: 600,
        size: 'stretch',
        minWidth: 280,
        maxWidth: 1000,
        minHeight: 420,
        maxHeight: 1400,
        showCover: true,
        usePortrait: true,
        mobileScrollSupport: false,
        flippingTime: 900,
        maxShadowOpacity: 0.35,
        autoSize: true,
      })

      pageFlip.loadFromHTML(
        libro.value.querySelectorAll('.pagina')
      )
    }
  } else {
    if (pageFlip) {
      pageFlip.destroy()
      pageFlip = null
    }
  }
})

onBeforeUnmount(() => {
  if (pageFlip) {
    pageFlip.destroy()
  }
})
</script>

<template>
  <main class="gala">

    <!-- PORTADA INICIAL -->
    <section v-if="!programaAbierto" class="portada">
      <div class="portada-fondo"></div>
      <div class="portada-overlay"></div>

      <img
        src="/images/bandera.png"
        alt=""
        class="bandera"
      />

      <div class="contenido-portada">
        <img
          src="/images/LogoBallet.png"
          alt="Ballet Folklórico UCB"
          class="logo"
        />

        <p class="subtitulo">
          BALLET FOLKLÓRICO
          <span>UNIVERSIDAD CATÓLICA BOLIVIANA</span>
        </p>

        <img
          src="/images/Titulo.png"
          alt="40 años Danzando por Bolivia"
          class="titulo-imagen"
        />

        <div class="ornamento">
          <span></span>
          <span class="estrella">✦</span>
          <span></span>
        </div>

        <p class="fecha">SÁBADO · DOMINGO</p>

        <p class="lugar">
          Teatro Municipal
          <strong>“Alberto Saavedra Pérez”</strong>
        </p>

        <p class="hora">19:00</p>

        <button
          class="boton-abrir"
          @click="programaAbierto = true"
        >
          <span>Abrir programa</span>
          <span class="flecha">→</span>
        </button>

        <p class="indicacion">
          Una celebración de nuestras raíces
        </p>
      </div>
    </section>

    <!-- LIBRO DIGITAL -->
    <section v-else class="seccion-libro">
      <button
        class="boton-cerrar"
        @click="programaAbierto = false"
      >
        ← Volver a la portada
      </button>

      <div class="libro-contenedor">
        <div ref="libro" class="libro">

          <!-- PORTADA DEL LIBRO -->
          <article class="pagina portada-libro">
            <div class="marco">
              <img
                src="/images/LogoBallet.png"
                alt="Logo del ballet"
                class="logo-libro"
              />

              <p class="etiqueta">
                BALLET FOLKLÓRICO UCB
              </p>

              <img
                src="/images/Titulo.png"
                alt="40 años Danzando por Bolivia"
                class="titulo-libro"
              />

              <div class="separador">
                ✦
              </div>

              <p class="texto-portada">
                PROGRAMA ARTÍSTICO
              </p>

              <p class="texto-portada-secundario">
                SÁBADO · DOMINGO
              </p>
            </div>
          </article>

          <!-- PÁGINA DE BIENVENIDA -->
          <article class="pagina">
            <div class="contenido-pagina">
              <p class="numero-pagina">01</p>

              <p class="etiqueta">
                UNA CELEBRACIÓN
              </p>

              <h2>
                40 años<br />
                Danzando por Bolivia
              </h2>

              <div class="separador">✦</div>

              <p class="texto-pagina">
                Cuatro décadas de historia, identidad y
                pasión por nuestras raíces.
              </p>

              <p class="texto-pagina">
                El Ballet Folklórico de la Universidad
                Católica Boliviana celebra su trayectoria
                a través de la danza y la cultura.
              </p>

              <p class="pie-pagina">
                La danza nos une
              </p>
            </div>
          </article>

          <!-- PÁGINA DEL PROGRAMA -->
          <article class="pagina">
            <div class="contenido-pagina">
              <p class="numero-pagina">02</p>

              <p class="etiqueta">
                PROGRAMA ARTÍSTICO
              </p>

              <h2>
                Primera parte
              </h2>

              <div class="separador">✦</div>

              <div class="danza-placeholder">
                <span>01</span>
                <div>
                  <h3>Nombre de la danza</h3>
                  <p>Región · Descripción breve</p>
                </div>
              </div>

              <div class="danza-placeholder">
                <span>02</span>
                <div>
                  <h3>Nombre de la danza</h3>
                  <p>Región · Descripción breve</p>
                </div>
              </div>

              <div class="danza-placeholder">
                <span>03</span>
                <div>
                  <h3>Nombre de la danza</h3>
                  <p>Región · Descripción breve</p>
                </div>
              </div>

              <p class="pie-pagina">
                Programa de gala
              </p>
            </div>
          </article>

          <!-- PÁGINA FINAL -->
          <article class="pagina pagina-final">
            <div class="contenido-pagina">
              <p class="etiqueta">
                GRACIAS
              </p>

              <h2>
                Por celebrar<br />
                con nosotros
              </h2>

              <div class="separador">✦</div>

              <p class="texto-pagina">
                Que nuestras tradiciones sigan viviendo
                en cada paso, en cada generación.
              </p>

              <p class="texto-portada-secundario">
                BALLET FOLKLÓRICO UCB
              </p>
            </div>
          </article>

        </div>
      </div>

      <p class="instruccion-libro">
        Desliza las páginas para descubrir el programa
      </p>
    </section>

  </main>
</template>
