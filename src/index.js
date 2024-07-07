// Application requirements
import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import jsonschema from 'jsonschema';

// Local errors
import { BadRequestEntityError, BadResponseTypeError, BadResponseStatusError,
    FatalError, NotFoundError, UnauthorizedError } from './errors';

// Local pages
import { AboutPage, ContactPage, MainPage, NotFoundErrorPage,
    BadEntityErrorPage, BadResponseErrorPage, ForbidenErrorPage } from './pages';

// Assets requirements: Bootstrap 5
// https://getbootstrap.com/docs/5.3/getting-started/introduction/
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Assets requirements: Bootstrap Icons
// https://icons.getbootstrap.com/
import 'bootstrap-icons/font/bootstrap-icons.css';

// Assets requirements: Default fonts
// https://fontsource.org/
// Bootstrap 5 uses the system typography, this can cause some texts to not have
// the correct size or spacing, to avoid this problem the text font is
// standardized.
// See ./assets/css/app.css
import '@fontsource/lato/300.css'; // For titles
import '@fontsource/ubuntu-sans'; // For body

// Assets requirements: App base style
import './assets/css/app.css';

// Main component
class App extends Component {

    constructor(props) {

        // Input validation from properties
        const validation = (new jsonschema.Validator()).validate(props, {
            type: Object,
            properties: {
                routes: { type: Array, items: {
                    type: Object,
                    properties: {
                        component: { type: Object },
                        path: { type: Object },
                    },
                    required: [ 'component', 'path' ]
                } },
            },
            required: [ 'routes' ],
        }, { required: true, allowUnknownAttributes: false });

        if(validation.errors.length)
            throw new Error([
                `Integrity error on App.props validation:`,
                JSON.stringify(validation.errors, null, 2),
            ].join(' '));

        // Propagate options
        super(props);

        // Routes
        this.routes = props.routes;

        // State
        this.state = {
            params: [ ],
            component: null,
            language: localStorage.getItem('language') ?? 'en',
            theme: localStorage.getItem('theme') ?? 'dark',
            fatalError: null
        }

        // Set default bootstrap template
        document.body.setAttribute('data-bs-theme', this.state.theme);

        // Binds
        this.setView = this.setView.bind(this);
        this.setError = this.setError.bind(this);
        this.setLanguage = this.setLanguage.bind(this);
        this.setTheme = this.setTheme.bind(this);
    }

    componentDidMount() {
        // Hook navigation event
        window.addEventListener('hashchange',
            event => this.setView(), false);

        // Set view on first load
        this.setView();
    }

    componentWillUnmount() {
        // Unhook navigation event
        window.removeEventListener('hashchange',
            event => this.setView(), false);
    }

    async setLanguage(language) {
        // Persist on local storage
        localStorage.setItem('language', language);

        // Change state
        return this.setState({ language: language });
    }

    async setTheme(theme) {
        // Persist on local storage
        localStorage.setItem('theme', theme);

        // Set bootstrap template
        document.body.setAttribute('data-bs-theme', theme);

        // Change state
        return this.setState({ theme: theme });
    }
    
    async setView() {
        // Deny external origins (clickjacking prevention - CWE-1021)
        // https://cwe.mitre.org/data/definitions/1021.html
        if(window.self !== window.top)
            return this.setError(new FatalError(`Same origin problem.`));

        // Get current path
        const uri = (document.location.hash.slice(1) || '/');

        // Find route by current path
        const route = this.routes.find(route => uri.match(route.path));
        if(!route) {

            // Error component is defined?
            if(uri.startsWith('/error/'))
                return this.setError(new FatalError(`Unable find error component for ${uri}`));

            // Set general error for NotFoundErrorPage
            return this.setError(new NotFoundError(`Component is not found for: ${uri}`));
        }

        // Get route params
        let params = [ ];
        if(document.location.hash.slice(1).match(route))
            params = document.location.hash.slice(1).match(route).slice(1)

        // Scroll to top
        window.scroll({ top: 0, left: 0, behavior: 'instant' })

        // Set state
        return this.setState({
            component: route.component,
            params: params
        })
    }

    async setError(e) {
        if(e instanceof BadRequestEntityError)
            document.location = '#/error/bad-entity';

        else if((e instanceof BadResponseTypeError) || e instanceof BadResponseStatusError)
            document.location = '#/error/bad-response';

        else if(e instanceof NotFoundError)
            document.location = '#/error/not-found';

        else if(e instanceof UnauthorizedError)
            document.location = '#/error/forbiden';

        else {
            console.error(e.stack);
            this.setState({ fatalError: e });
        }
    }

    render() {
        if(this.state.fatalError)
            return (
                <div className="d-flex align-items-center my-5 py-5">
                    <div className="my-0 mx-auto text-center text-muted">
                        <i className="bi bi-x-circle-fill text-danger" style={{ fontSize: '24pt' }}></i>
                        <pre className="d-block mb-0 mt-4">{this.state.fatalError.toString()}</pre>
                    </div>
                </div>
            );

        else if(this.state.component === null)
            return (
                <div className="d-flex flex-column min-vh-100">
                    <div className="flex-fill align-self-center d-flex flex-row">
                        <div className="align-self-center spinner-border opacity-50"></div>
                    </div>
                </div>
            );

        else
            return ( <this.state.component
                events={{
                    setLanguage: language => this.setLanguage(language),
                    setTheme: theme => this.setTheme(theme),
                    setError: e => this.setError(e),
                }}
                params={this.state.params}
                language={this.state.language}
                theme={this.state.theme} /> );
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
