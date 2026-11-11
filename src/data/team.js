// Completa `men` y `women` con nombres completos. Las fotografías se guardan en /public/images/equipo/.
export const danceCorps = ['O', 'A', 'B', 'C', 'D', 'Aspirantes'].map(name => ({
  name,
  members: { men: [], women: [] },
  photos: { mixed: '', boys: '', girls: '' },
}))
