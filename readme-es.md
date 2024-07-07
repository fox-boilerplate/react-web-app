# Fox Boilerplate - Web App

Proyecto WEB personalizable sobre ReactJS que cuenta con una base preconstruida
para fabricar aplicaciones WEB con el menor esfuerzo posible utilizando las
mejores prácticas en temas de arquitectura, codificación y seguridad.

Este proyecto no esta destinado a crear un marco de trabajo extendido al largo
plazo, sino mas bien una base inicial para que tu puedas modificar a tu gusto y
ahorrar tiempo.

Happy hacking! 🎉

## Tecnologías utilizadas

Sabemos que cada persona es libre de utilizar la tecnología que desee, por ello
invitamos a eliminar o modificar cualquier aspecto incluido por defecto. De
todas maneras, incluimos algunas tecnologías base a modo de recomendación que
pueden servir de apoyo a los desarrolladores.

### NodeJS

Elegimos [NodeJS](https://nodejs.org/en) para FrontEnd debido a su gran
compatibilidad y flexibilidad con las tecnologías ya existentes de Javascript
en el lado del navegador junto a paquetes de [npmjs.com](https://npmjs.com),
además por el agnosticismo con las tecnologías del lado del servidor.

### React Framework

Elegimos [ReactJS Framework](https://react.dev/) porque consideramos que es una
excelente base con un muy buen soporte y vida a largo plazo. Además, cuenta
con capacidades excepcionales como la facilidad de la integración con GraphQL
y similares. Además, acorta el tiempo de desarrollo considerablemente al ser
un framework totalmente reactivo basado en eventos. Esto evita bloqueos y uso
de altas cargas de CPU. Además, consideramos que es un framework altamente
seguro, no hay necesidad de estar aplicando secuencias de escapes ni de
manipular el DOM de forma tan manual.

### Bootstrap 5.3 Framework para el estilo

Elegimos [Bootstrap 5.3 Framework](https://getbootstrap.com/docs/5.3/getting-started/introduction/)
para el diseño gráfico por múltiples razones:

- Responsivo con muy poco código y esfuerzo.
- Habilidad para adaptarse a diseños claros y oscuros.
- Tamaños muy estudiados con soporte para monitores 4K y zoom, haciendo uso de puntos por pulgada y centímetros en vez de píxeles.
- Tamaños de fuentes con psicología muy estudiada, adaptada para mejorar la visibilidad de forma dinámica entre diferentes tamaños de ventana y dispositivos por densidades.
- Colores inteligentes los cuales han sido elegidos a través de la psicología de colores.

### Bootstrap Icons

Elegimos [Bootstrap Icons](https://icons.getbootstrap.com/) debido a su gran
disponibilidad de iconos de uso libre, es full compatible con Bootstrap y
mantiene una alineaicon perfecta con el resto de componentes. Habiamos elegido
Fonts Awesome en primera instancia pero su licencia de pago podria provocar
diversos problemas de copyright en los distintos proyectos creados y la version
4 la cual es libre no se ajusta correctamente a la alineacion de componentes de
Bootstrap. De todas formas, recuerda que puedes hacer uso de la librería de
iconos que quieras, ¡el proyecto es tuyo! y lo puedes modificar como quieras.

### Fontsource

Elegimos [Fontsource](https://fontsource.org/) en vez del CDN de Google Fonts
para mantener todas las dependencias sin requerir de una conexión a internet.
Esto permite la correcta ejecución dentro de ambientes corporativos los cuales
cuentan con una salida a internet restringida. Esto aumenta el peso del proyecto
pero no impacta al total de bytes a descargar por parte del usuario final, ya que
las fuentes y hojas de estilo, si no se descargan de este proyecto, se
descargarán de todas maneras desde el repositorio de Google. Además, Fontsource
entrega una amplia gama de fuentes de texto sin la necesidad de recurrir a otros
servicios.

## Cambiar y/ reemplazar del proyecto generado

Recuerda que debes cambiar/reemplazar:

- El favicon y todos los íconos png ubicados en `public/`.
- Manifiesto WEB ubicado en `public/manifest.json` y `public/site.webmanifest`.
- Título y meta-etiquetas de la aplicación web ubicada en `public/index.html`.
- Páginas ubicadas en `src/pages`.
- Rutas ubicadas en `src/index.js`.


# Architecture and structure

El arbol de directorios y archivos es el siguiente:

```
src/
├── assets/
├── components/
│   └── component.js
├── errors/
├── helpers/
└── pages/
    └── error/
```

El proyecto de ReactJS se encuentra dentro del directorio `src/`. Dentro de este
se encuentra la siguiente estructura de contenido:

- `assets/`: Destinado a almacenar todos los assets estáticos.
- `components/`: Destinado a almacenar todos los componentes personalizados que no sean páginas.
- `components/component.js`: Archivo que contiene la clase `FoxComponent` detallada más adelante. Esta es la base para la fabricación de todos los demás componentes.
- `errors/`: En este lugar se almacenan todas las clases de error.
- `helpers/`: En este lugar se almacenan todas las librerías de apoyo que no son componentes.
- `pages/`: En este lugar se almacenan todos los componentes de tipo página, los cuales servirán para la navegación.
- `pages/error`: En este lugar se almacenan todas las páginas de error.

Para más información sobre el proyecto de ReactJS puede leer
[react.md](./react.md).

Recuerda que este proyecto es tuyo, si deseas modificar la estructura o
arquitectura lo puedes hacer con total libertad. Este proyecto no busca crear un
marco de trabajo persistente con el tiempo, sino una base para tu desarrollo
inicial.


## El cargador principal llamado App

Este cargador se encuentra en el archivo índice del proyecto localizado en
`src/index.js` y se encarga de:

- Orquestar componentes.
- Orquestar lenguaje y textos de traducción.
- Orquestar diseño claro y oscuro.
- Orquestar navegación.
- Cualquier otro tipo de funcionalidad que requiera centralizar para todos los demás componentes.

### ¿Cómo agregar rutas y componentes al orquestador?

Al final del archivo `src/index.js` existe un codigo similar a este:

```JSX
// Get React root DOM
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render main App
root.render(
    <React.StrictMode>
        <App routes={[
            { component: BadEntityErrorPage, path: /^\/error\/bad-entity$/ },
            { component: BadResponseErrorPage, path: /^\/error\/bad-response$/ },
            { component: ForbidenErrorPage, path: /^\/error\/forbiden$/ },
            { component: NotFoundErrorPage, path: /^\/error\/not-found$/ },
            { component: MainPage, path: /^\/$/ },
            { component: AboutPage, path: /^\/about$/ },
            { component: ContactPage, path: /^\/contact$/ },
        ]} />
    </React.StrictMode>
);
```

Donde, a `App` se le entrega una propiedad llamada `routes` la cual contiene el
listado de rutas y componentes de tipo página a utilizar. Las rutas son
capturadas a modo de expresión regular, por ejemplo,
`http://127.0.0.1:3000/#/error/not-found` capturará el componente llamado
`NotFoundErrorPage`. Las rutas funcionan únicamente con expresiones regulares
para maximizar su flexibilidad y el uso de argumentos por ruta, por ejemplo:
`http://127.0.0.1:3000/#/foo/0ba3fffb-2051-4128-80a0-efe788412db8` puede ser
capturado junto con el valor que le sigue de `foo` de la siguiente manera:

```JSX
{ component: FooPage, path: /^\/foo\/([a-f0-9]{24})$/ },
```

Esto enviará al componente de tipo página un listado de parámetros capturados de
la expresión regular de forma automática en la propiedad llamada `params`, del
componente de tipo página, por ejemplo `this.props.params[0]`.


## ¿Cómo crear un componente de tipo página?

Todo componente de React debe extender a la clase `FoxComponent`, este a su ves
ya extiende a la clase `Component` de react. Esta clase permite el manejo de
traducciones en textos y mantiene la integridad de las propiedades establecidas
desde otros origenes que lo deseen llamar.

Por defecto, los componentes estan orientados al uso de clases en ves de
funciones, esto permite mejorar la incorporacion de funciones adicionales por
cada componente y mantener en un mismo archivo todo lo relacionado con el mismo,
similar a una [arquitectura hexagonal](https://medium.com/@yecaicedo/structuring-a-node-js-project-with-hexagonal-architecture-7be2ef1364e2).

Una pagina de ejemplo localizada en
`src/pages/foo.js` se estructuraria de la siguiente manera:

```JSX
// Requirements
import { FoxComponent } from '../components';

// Page class
class FooPage extends FoxComponent {

    // Component strings
    static strings = {
        en: {
            myText: 'Hello World page!',
        },
        es: {
            myText: 'Página ¡Hola Mundo!',
        },
    };

    constructor(props) {

        // Create a custom initial state for react
        super(props, {
            myState: true
        })
    }

    render() {
        return (
            <div>
                <h1>{this.state.strings.myText}</h1>
                <code>{this.state.myState}</code>
            </div>
        );
    }
};

// Export component
export default FooPage;
```

El componente de tipo página extiende `FoxComponent`, el cual es un componente
de React. Este contiene una propiedad estática llamada `strings`, la cual
contiene un diccionario con todos los textos a utilizar únicamente dentro del
mismo componente. Cada clave raíz corresponde al lenguaje que será cargado de
forma automática al estado de React `this.state.strings`. Cuando un usuario
desee cambiar el lenguaje, este diccionario se actualizará de forma automática y
en tiempo real de manera reactiva. Por defecto, el sistema utilizará la clave
`en`, a menos que desees cambiarlo desde el archivo
`src/components/component.js`.

No debes declarar el estado de React directamente en el constructor, ya que
esto eliminará los estados por defecto del componente, incluyendo los strings.
Para solventar este problema, se ha creado un segundo argumento en el
constructor de `FoxComponent`, el cual recibe el estado inicial.

Por ejemplo, en vez de:

```JSX
constructor(props) {

    // Default state
    this.state = {
        myState: true
    };
}
```

Debería ser:

```JSX
constructor(props) {

    // Default state
    super(props, {
        myState: true
    })
}
```

Te invitamos a leer y modificar a tu gusto el archivo
`src/components/component.js`, que declara la base `FoxComponent` para los demás
componentes.


## ¿Cómo crear un nuevo componente personalizado?

La fabricación de componentes personalizados sigue la misma regla que la
creación de componentes de tipo página, excepto por la ruta donde se deben
almacenar. Esto quiere decir que deben ser creados en el directorio
`src/components` y deben extender a la clase `FoxComponent`, junto con su
respectiva propiedad estática `strings` y demás.