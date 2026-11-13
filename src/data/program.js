export const firstPart = [
  { group: 'Orquesta Típica Nacional de Bolivia «Teófilo Vargas»', dances: [
    { name: 'Llamerada', region: 'Altiplano', song: 'Por confirmar', composer: 'Por confirmar', image: '', description: 'Danza inspirada en la actividad de los antiguos arrieros y cuidadores de llamas. Sus pasos y vestimenta evocan la relación histórica entre las comunidades andinas y los camélidos.' },
    { name: 'Cueca cochabambina', region: 'Cochabamba', song: 'Por confirmar', composer: 'Por confirmar', image: '', description: 'Versión regional de la cueca boliviana, reconocida por su carácter festivo y por el diálogo coreográfico entre las parejas.' },
    { name: 'Cueca potosina', region: 'Bolivia', song: 'Por confirmar', composer: 'Por confirmar', image: '', description: 'Número artístico de la gala del Ballet Folclórico UCB.' },
    { name: 'Cueca chuquisaqueña', region: 'Chuquisaca', song: 'Por confirmar', composer: 'Por confirmar', image: '', description: 'Una expresión de la cueca chuquisaqueña, con elegancia en el pañuelo, juego de cortejo y carácter propio de la tradición musical de Sucre.' },
    { name: 'Huayño', region: 'Bolivia', song: 'Por confirmar', composer: 'Por confirmar', image: '', description: 'Número artístico de la gala del Ballet Folclórico UCB.' },
    { name: 'Cueca orureña', region: 'Oruro', song: 'Por confirmar', composer: 'Por confirmar', image: '', description: 'Expresión de la cueca en la tradición orureña, que combina elegancia, ritmo y el carácter festivo de la región.' }
  ] },
  { group: 'Agrupación «Cuñataí»', dances: [
    { name: 'Vals oriental', region: 'Oriente boliviano', song: 'Por confirmar', composer: 'Por confirmar', image: '', description: 'Expresión musical y coreográfica de carácter elegante, vinculada a las tradiciones sociales del oriente boliviano.' },
    { name: 'Taquirari', region: 'Oriente boliviano', song: 'Por confirmar', composer: 'Por confirmar', image: '', description: 'Uno de los ritmos más representativos del oriente de Bolivia. Se caracteriza por su energía, sus melodías vivaces y su presencia en celebraciones populares.' },
    { name: 'Macheteros', region: 'Moxos · Beni', song: 'Por confirmar', composer: 'Por confirmar', image: '', description: 'Danza emblemática de la tradición mojeña. Sus bailarines portan machetes de madera y plumas, en una expresión ceremonial de gran fuerza visual y simbólica.' },
    { name: 'Caporales', region: 'Danza urbana boliviana', song: 'Por confirmar', composer: 'Por confirmar', image: '', description: 'Danza de gran fuerza y energía, reconocida por sus saltos, zapateos y vestuarios vistosos. Se consolidó como una expresión contemporánea de identidad boliviana.' }
  ] }
]

export const secondPart = [
  { group: '«Canarios del Chaco»', dances: [
    { name: 'Cueca tarijeña', region: 'Tarija', song: 'Por confirmar', composer: 'Por confirmar', image: '', description: 'Cueca del sur boliviano que expresa galantería y alegría. El pañuelo y el zapateo acompañan el diálogo entre los bailarines.' },
    { name: 'Chacarera', region: 'Región chaqueña', song: 'Por confirmar', composer: 'Por confirmar', image: '', description: 'Danza de pareja de raíz folclórica, de ritmo vivaz y espíritu festivo, compartida por la cultura musical del Gran Chaco.' },
    { name: 'Cueca chaqueña', region: 'Chaco boliviano', song: 'Por confirmar', composer: 'Por confirmar', image: '', description: 'Una expresión regional de la cueca, con la energía y el carácter festivo propios de las tradiciones chaqueñas.' },
    { name: 'Interpretación especial de «Canarios del Chaco»', region: 'Bolivia', song: 'Por confirmar', composer: 'Por confirmar', image: '', description: 'Número artístico de la gala del Ballet Folclórico UCB.' }
  ] },
  { group: 'Centro Cultural «3 de Mayo»', dances: [
    { name: 'Tarqueada', region: 'Altiplano', song: 'Por confirmar', composer: 'Por confirmar', image: '', description: 'Expresión musical y coreográfica asociada al ciclo agrícola y a las celebraciones comunitarias del altiplano, con el sonido característico de la tarka.' }
  ] },
  { group: 'Agrupación «Cuñataí»', dances: [
    { name: 'Carnaval cruceño', region: 'Santa Cruz', song: 'Por confirmar', composer: 'Por confirmar', image: '', description: 'Celebración de la identidad cruceña, marcada por la música, el color, la alegría y las tradiciones del carnaval.' },
    { name: 'Pujllay', region: 'Tarabuco · Chuquisaca', song: 'Por confirmar', composer: 'Por confirmar', image: '', description: 'Manifestación festiva de la cultura yampara, relacionada con la memoria comunitaria, la celebración y el agradecimiento por la producción agrícola.' },
    { name: 'Chovena', region: 'Oriente boliviano', song: 'Por confirmar', composer: 'Por confirmar', image: '', description: 'Danza tradicional del oriente boliviano, vinculada a las expresiones festivas y musicales de la región. Su ritmo alegre invita al movimiento colectivo y celebra la identidad oriental.' },
    { name: 'Kullawada', region: 'Bolivia', song: 'Por confirmar', composer: 'Por confirmar', image: '', description: 'Número artístico de la gala del Ballet Folclórico UCB.' }
  ] },
  { group: 'Gran ensamble musical · Todas las agrupaciones invitadas', dances: [
    { name: 'Cueca «Viva mi Patria Bolivia»', region: 'Bolivia', song: 'Por confirmar', composer: 'Por confirmar', image: '', description: 'Número artístico de la gala del Ballet Folclórico UCB.' },
    { name: 'Morenada', region: 'Altiplano boliviano', song: 'Por confirmar', composer: 'Por confirmar', image: '', description: 'Una de las danzas más representativas de las festividades andinas, con pasos pausados, matracas y una rica tradición musical y coreográfica.' }
  ] }
]

export const allDances = [
  ...firstPart.flatMap(s => s.dances.map(d => ({...d,group:s.group,part:"Primera parte"}))),
  ...secondPart.flatMap(s => s.dances.map(d => ({...d,group:s.group,part:"Segunda parte"}))),
]
