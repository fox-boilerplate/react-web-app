import jsonschema from 'jsonschema';
import FoxComponent from './component';

class HeaderNavComponent extends FoxComponent {

    static strings = {
        en: {
            title: 'Fox Boilerplate',
            about: 'About us',
            contact: 'Contact',
            currentLanguage: 'EN',
            language: {
                spanish: 'Español',
                english: 'English',
            }
        },
        es: {
            title: 'Fox Boilerplate',
            about: 'Acerca de',
            contact: 'Contacto',
            currentLanguage: 'ES',
            language: {
                spanish: 'Español',
                english: 'English',
            }
        },
    };

    constructor(props) {

        // Input validation from properties
        const validation = (new jsonschema.Validator()).validate(props, {
            type: Object,
            properties: {
                events: { type: Array, items: { type: Object } },
                params: { type: Array, items: { type: String } },
                language: { type: String, pattern: /^[a-z]{2,3}$/ },
                theme: { type: String, enum: [ 'dark', 'light' ] },
                selected: { type: String }
            },
            required: [ 'events', 'params', 'language', 'theme', 'selected' ],
        }, { required: true, allowUnknownAttributes: false });

        if(validation.errors.length)
            throw new Error(`Integrity error on Page.props validation: ${JSON.stringify(validation.errors, null, 2)}`);

        // Propagate options
        super(props);
    }

    render() {
        return (
            <div className="container border-bottom">
                <nav className="navbar navbar-expand-lg">
                    <div className="container-fluid">
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-top">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <a className="navbar-brand" href="#/">
                            <i className="bi bi-grid-fill opacity-50 me-3"></i>
                            {this.state.strings.title}
                        </a>
                        <div className="collapse navbar-collapse" id="navbar-top">
                            <div className="me-auto"></div>
                            <div className="d-flex">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                                    {/* About */}
                                    <li className="nav-item">
                                        <a className={`nav-link px-3 ${(this.props.selected === 'about') ? 'active' : ''}`}
                                            href="#/about">
                                            {this.state.strings.about}
                                        </a>
                                    </li>

                                    {/* Contact */}
                                    <li className="nav-item">
                                        <a className={`nav-link px-3 ${(this.props.selected === 'contact') ? 'active' : ''}`}
                                            href="#/contact">
                                            {this.state.strings.contact}
                                        </a>
                                    </li>

                                    {/* Language */}
                                    <li className="nav-item dropdown">
                                        <button className="nav-link px-3 dropdown-toggle" data-bs-toggle="dropdown">
                                            <i className="bi bi-globe-americas me-2"></i>
                                            <span className="me-1">{this.state.strings.currentLanguage}</span>
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li>
                                                <button
                                                    onMouseDown={() => this.props.events.setLanguage('es')}
                                                    className="dropdown-item">
                                                    {this.state.strings.language.spanish}
                                                </button>
                                            </li>
                                            <li>
                                                <button
                                                    onMouseDown={() => this.props.events.setLanguage('en')}
                                                    className="dropdown-item">
                                                    {this.state.strings.language.english}
                                                </button>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default HeaderNavComponent;
