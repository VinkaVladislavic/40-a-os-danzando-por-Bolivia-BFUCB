export const firstPart = [
  {
    group: 'Agrupación Cuñataí',
    dances: [
      { name: 'Chovena', region: 'Oriente boliviano', song: 'Por confirmar', composer: 'Por confirmar', image: '', description: 'Danza tradicional del oriente boliviano, vinculada a las expresiones festivas y musicales de la región. Su ritmo alegre invita al movimiento colectivo y celebra la identidad oriental.' },
      { name: 'Taquirari', region: 'Oriente boliviano', song: 'Por confirmar', composer: 'Por confirmar', image: '', description: 'Uno de los ritmos más representativos del oriente de Bolivia. Se caracteriza por su energía, sus melodías vivaces y su presencia en celebraciones populares.' },
      { name: 'Macheteros', region: 'Moxos · Beni', song: 'Por confirmar', composer: 'Por confirmar', image: '', description: 'Danza emblemática de la tradición mojeña. Sus bailarines portan machetes de madera y plumas, en una expresión ceremonial de gran fuerza visual y simbólica.' },
      { name: 'Tarqueada', region: 'Altiplano', song: 'Por confirmar', composer: 'Por confirmar', image: '', description: 'Expresión musical y coreográfica asociada al ciclo agrícola y a las celebraciones comunitarias del altiplano, con el sonido característico de la tarka.' },
      { name: 'Pujllay', region: 'Tarabuco · Chuquisaca', song: 'Por confirmar', composer: 'Por confirmar', image: '', description: 'Manifestación festiva de la cultura yampara, relacionada con la memoria comunitaria, la celebración y el agradecimiento por la producción agrícola.' },
    ],
  },
  {
    group: 'Grupo Orquesta Típica Nacional de Bolivia · Teófilo Vargas',
    dances: [
      { name: 'Cueca de Sucre', region: 'Chuquisaca', song: 'Por confirmar', composer: 'Por confirmar', image: '', description: 'Una expresión de la cueca chuquisaqueña, con elegancia en el pañuelo, juego de cortejo y carácter propio de la tradición musical de Sucre.' },
      { name: 'Llamerada', region: 'Altiplano', song: 'Por confirmar', composer: 'Por confirmar', image: '', description: 'Danza inspirada en la actividad de los antiguos arrieros y cuidadores de llamas. Sus pasos y vestimenta evocan la relación histórica entre las comunidades andinas y los camélidos.' },
      { name: 'Cueca cochabambina', region: 'Cochabamba', song: 'Por confirmar', composer: 'Por confirmar', image: '', description: 'Versión regional de la cueca boliviana, reconocida por su carácter festivo y por el diálogo coreográfico entre las parejas.' },
    ],
  },
  {
    group: 'Grupo Canarios del Chaco',
    dances: [
      { name: 'Cueca tarijeña', region: 'Tarija', song: 'Por confirmar', composer: 'Por confirmar', image: '', description: 'Cueca del sur boliviano que expresa galantería y alegría. El pañuelo y el zapateo acompañan el diálogo entre los bailarines.' },
      { name: 'Chacarera', region: 'Región chaqueña', song: 'Por confirmar', composer: 'Por confirmar', image: '', description: 'Danza de pareja de raíz folclórica, de ritmo vivaz y espíritu festivo, compartida por la cultura musical del Gran Chaco.' },
      { name: 'Cueca chaqueña', region: 'Chaco boliviano', song: 'Por confirmar', composer: 'Por confirmar', image: '', description: 'Una expresión regional de la cueca, con la energía y el carácter festivo propios de las tradiciones chaqueñas.' },
    ],
  },
]

export const secondPart = [
  { name: 'Carnaval cruceño', region: 'Santa Cruz', song: 'Por confirmar', composer: 'Por confirmar', image: '', description: 'Celebración de la identidad cruceña, marcada por la música, el color, la alegría y las tradiciones del carnaval.' },
  { name: 'Vals oriental', region: 'Oriente boliviano', song: 'Por confirmar', composer: 'Por confirmar', image: '', description: 'Expresión musical y coreográfica de carácter elegante, vinculada a las tradiciones sociales del oriente boliviano.' },
  { name: 'Cullawada', region: 'Altiplano', song: 'Por confirmar', composer: 'Por confirmar', image: '', description: 'Danza de tradición andina relacionada con los antiguos obrajes textiles y el trabajo de hilanderos y tejedores.' },
  { name: 'Caporales', region: 'Danza urbana boliviana', song: 'Por confirmar', composer: 'Por confirmar', image: '', description: 'Danza de gran fuerza y energía, reconocida por sus saltos, zapateos y vestuarios vistosos. Se consolidó como una expresión contemporánea de identidad boliviana.' },
  { name: 'Palabra de despedida', region: 'Cierre artístico', song: 'Por confirmar', composer: 'Por confirmar', image: '', description: 'Un momento especial para agradecer al público y compartir el mensaje final de esta celebración.' },
  { name: 'Cueca potosina', region: 'Potosí', song: 'Por confirmar', composer: 'Por confirmar', image: '', description: 'Versión regional de la cueca boliviana, con matices musicales y expresivos propios de la tradición potosina.' },
  { name: 'Cueca orureña', region: 'Oruro', song: 'Por confirmar', composer: 'Por confirmar', image: '', description: 'Expresión de la cueca en la tradición orureña, que combina elegancia, ritmo y el carácter festivo de la región.' },
  { name: 'Cueca “Viva mi Patria Bolivia”', region: 'Bolivia', song: 'Por confirmar', composer: 'Por confirmar', image: '', description: 'Una cueca de profundo sentimiento patriótico, que celebra el orgullo, la diversidad y el amor por Bolivia.' },
  { name: 'Morenada', region: 'Altiplano boliviano', song: 'Por confirmar', composer: 'Por confirmar', image: '', description: 'Una de las danzas más representativas de las festividades andinas, con pasos pausados, matracas y una rica tradición musical y coreográfica.' },
]

export const allDances = [
  ...firstPart.flatMap(section => section.dances.map(dance => ({ ...dance, group: section.group, part: 'Primera parte' }))),
  ...secondPart.map(dance => ({ ...dance, group: 'Elenco del Ballet Folclórico UCB', part: 'Segunda parte', tentative: true })),
]
