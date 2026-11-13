// Integrantes de los seis cuerpos de baile. Fotografías pendientes de incorporar.
export const danceCorps = [
  { name: 'O', members: { women: ['Daphne Mostajo','Nataly Ledezma','Paola Gutiérrez','Wanda Yapu','Melisa Lugones','Claudia Almeida'], men: ['Christian Cuevas','Fabián Romero','Fernando Zubieta','Abad Chuquimia','Adrián Calderón','Sebastián Villena'] } },
  { name: 'A', members: { women: ['Vinka Vladislavic','Micaela Chávez','Lucia Dávila','Renata Calderón','Priscila Saavedra','Fabiana Silva','Natalia Cuellar','Camila Claure'], men: ['Leandro Azuga','Gabriel Montero','Jheremy Atahuichi','Octavio Villlanueva','Pedro Condorena','Benjamin Baltazar','Fernando Quispe','Gabriel Vaca'] } },
  { name: 'B', members: { women: ['Maura Reynolds','Montserrat Borth','Valentina Vidal','Valeria Zubieta','Aylin Flores','Luciana Saavedra'], men: ['Luis Quispe','Denzel Chura','Adrian Cacharani','Yamil Camacho','Amilcar Illanes'] } },
  { name: 'C', members: { women: ['Natalia Ramos','Valeria Navia','Zuri Herrera','Luciana Castro','Zoe Diez de Medina','Luciana Osinaga'], men: ['Marcelo Vilca','Kevin Matienzo','Brandon Gutierrez','Cristhian Bara','Andre Pozo'] } },
  { name: 'D', members: { women: ['Valeria Echeverria','Isabel Rocha','Sophia Clavijo','Camila Miranda','Daniela Caceres','Tatiana Vargas'], men: [] } },
  { name: 'Aspirantes', members: { women: ['Mariana Guerrero','Valentina Revilla','Adriana Rocha','Maria de los Angeles Fernandez','Clarise Toro','Luz Teran'], men: [] } },
].map(corps => ({ ...corps, photos: { mixed: '', boys: '', girls: '' } }))
