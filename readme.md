# Fox Boilerplate - Web App

Customizable WEB project based on ReactJS that features a pre-built foundation
for developing WEB applications with minimal effort, utilizing
best practices in architecture, coding, and security.

This project is not intended to create an extended framework in the long term,
but rather an initial base for you to modify as you wish and save time.

Happy hacking! 🎉


## Used Technologies

We understand that everyone is free to use the technology they prefer, so
we invite you to remove or modify any default aspect. However, we include
some foundational technologies as recommendations that can support developers.

### NodeJS

We chose [NodeJS](https://nodejs.org/en) for the FrontEnd due to its high
compatibility and flexibility with existing JavaScript technologies
on the client side, along with packages from [npmjs.com](https://npmjs.com).
Additionally, NodeJS is agnostic to server-side technologies.

### React Framework

We chose [ReactJS Framework](https://react.dev/) because we consider it an
excellent foundation with strong long-term support. It offers exceptional
capabilities such as easy integration with GraphQL and similar technologies.
Moreover, it significantly reduces development time by being a fully reactive
framework based on events, thus avoiding blocking and high CPU usage.
Additionally, we find it to be a highly secure framework, eliminating the need
for manual DOM manipulation or escape sequences.

### Bootstrap 5.3 Framework for Styling

We chose [Bootstrap 5.3 Framework](https://getbootstrap.com/docs/5.3/getting-started/introduction/)
for graphic design due to several reasons:

- Responsiveness with minimal code and effort.
- Ability to adapt to both light and dark designs.
- Well-studied sizes with support for 4K monitors and zoom, using inches and centimeters instead of pixels.
- Font sizes designed with psychology in mind, enhancing visibility dynamically across different window sizes and device densities.
- Intelligent color choices based on color psychology.

### Bootstrap Icons

We chose [Bootstrap Icons](https://icons.getbootstrap.com/) due to its extensive
collection of freely available icons. It is fully compatible with Bootstrap and
seamlessly integrates with other components. Initially, we considered Font
Awesome, but its paid license could pose copyright issues across various
projects. The free version (version 4) also does not align perfectly with
Bootstrap component alignment. Nonetheless, remember that you can use any icon
library you prefer since the project is yours and you can modify it as you wish.

### Fontsource

We chose [Fontsource](https://fontsource.org/) instead of Google Fonts CDN to
maintain all dependencies without requiring an internet connection. This ensures
proper execution within corporate environments with restricted internet access.
While this increases the project's size, it does not impact the total bytes
downloaded by end users. If fonts and stylesheets are not downloaded from this
project, they will still be fetched from Google's repository. Additionally,
Fontsource offers a wide range of text fonts without needing to rely on other
services.

## Changing and replacing in the generated project

Remember to change/replace:

- The favicon and all PNG icons located in `public/`.
- WEB manifest located in `public/manifest.json` and `public/site.webmanifest`.
- Title and meta tags of the web application located in `public/index.html`.
- Pages located in `src/pages`.
- Routes located in `src/index.js`.

# Architecture and structure

The directory tree and file structure are as follows:

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

The ReactJS project is located within the `src/` directory. Inside this
directory, you'll find the following structure of content:

- `assets/`: Intended for storing all static assets.
- `components/`: Intended for storing all custom components that are not pages.
- `components/component.js`: File containing the `FoxComponent` class detailed further below. This serves as the foundation for creating all other components.
- `errors/`: This directory stores all error classes.
- `helpers/`: This directory stores all support libraries that are not components.
- `pages/`: This directory stores all page-type components, which are used for navigation.
- `pages/error`: This directory stores all error pages.

For more information about the ReactJS project, you can refer to
[react.md](./react.md).

Remember, this project is yours; you're free to modify the structure or
architecture as you see fit. The goal of this project is not to create a
persistent framework over time but to provide a foundation for your initial
development.

## The main loader called App

This loader is located in the project's index file at `src/index.js` and is responsible for:

- Orchestrating components.
- Orchestrating language and translation texts.
- Orchestrating light and dark themes.
- Orchestrating navigation.
- Any other functionality that needs to be centralized for all other components.

### How to add routes and components to the orchestrator?

At the end of the `src/index.js` file, you'll find code similar to this:

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

Where, `App` is provided with a property called `routes` which contains a list
of routes and page-type components to use. Routes are captured as regular
expressions, for example, `http://127.0.0.1:3000/#/error/not-found` will
capture the `NotFoundErrorPage` component. Routes exclusively work with regular
expressions to maximize flexibility and usage of route arguments. For instance,
`http://127.0.0.1:3000/#/foo/0ba3fffb-2051-4128-80a0-efe788412db8`
can be captured along with the value following `foo` as follows:


```JSX
{ component: FooPage, path: /^\/foo\/([a-f0-9]{24})$/ },
```

This will automatically send a list of captured parameters from the regular
expression to the page-type component in the `params` property. For example,
`this.props.params[0]`.

## How to create a page-type component?

Every React component must extend the `FoxComponent` class, which in turn
extends React's `Component` class. This class facilitates text translation
management and maintains the integrity of properties set from other sources that
wish to call it.

By default, components are oriented towards using classes instead of functions.
This allows for easier incorporation of additional functions for each component
and keeps everything related to the component in the same file, akin to a
[hexagonal architecture](https://medium.com/@yecaicedo/structuring-a-node-js-project-with-hexagonal-architecture-7be2ef1364e2).

An example page located in `src/pages/foo.js` would be structured as follows:

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

The page-type component extends `FoxComponent`, which is a React component. It
contains a static property called `strings`, which holds a dictionary with all
the texts to be used exclusively within the component itself. Each root key
corresponds to a language that will be automatically loaded into the React state
`this.state.strings`. When a user wants to change the language, this dictionary
will be updated automatically and in real-time reactively. By default, the
system uses the key `en`, unless you choose to change it from the
`src/components/component.js` file.

You should not declare the React state directly in the constructor, as this will
override the default states of the component, including the strings. To address
this issue, a second argument has been added to the `FoxComponent` constructor,
which receives the initial state.

For example, instead of:

```JSX
constructor(props) {

    // Default state
    this.state = {
        myState: true
    };
}
```

It should be:

```JSX
constructor(props) {

    // Default state
    super(props, {
        myState: true
    })
}
```

Feel free to read and modify to your liking the `src/components/component.js`
file, which declares the base `FoxComponent` for other components.

## How to create a new custom component?

Creating custom components follows the same rule as creating page-type
components, except for the storage directory. This means they should be created
in the `src/components` directory and must extend the `FoxComponent` class,
along with its respective static property `strings` and others.
