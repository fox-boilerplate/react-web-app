import FoxComponent from './component';
import Markdown from 'react-markdown';

class FooterComponent extends FoxComponent {

    static strings = {
        en: {
            information: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. **Mauris nec enim ut magna pellentesque dictum**. Sed bibendum sapien risus, non luctus est commodo sed. Vivamus condimentum venenatis nibh iaculis porttitor. Nam non urna quis erat viverra cursus.',
            copyright: 'Copyright © {year} App Boilerplate. All rights reserved.',
            links: {
                dashboard: 'Dashboard',
                linkedin: 'Linkedin',
            },
            theme: {
                light: 'Light',
                dark: 'Dark',
            }
        },
        es: {
            information: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. **Mauris nec enim ut magna pellentesque dictum**. Sed bibendum sapien risus, non luctus est commodo sed. Vivamus condimentum venenatis nibh iaculis porttitor. Nam non urna quis erat viverra cursus.',
            copyright: 'Copyright © {year} App Boilerplate. Todos los derechos reservados.',
            links: {
                dashboard: 'Administración',
                linkedin: 'Linkedin',
            },
            theme: {
                light: 'Claro',
                dark: 'Oscuro',
            }
        },
    };

    render() {
        return (
            <div className="mt-3">
                <div className="container border-top py-4">
                    <h2 className="mb-4">
                        App Boilerplate
                    </h2>
                    <Markdown>{this.state.strings.information}</Markdown>
                    <div className="row">
                        <div className="col-md-6">
                            <Markdown>
                                {this.state.strings.copyright.replace('{year}', (new Date()).getFullYear())}
                            </Markdown>
                        </div>
                        <div className="col-md-6 text-start text-md-end pt-3 pt-md-0">
                            <a className="btn btn-sm btn-outline-secondary px-3 me-2"
                                rel="noreferrer"
                                target="_blank"
                                href="https://www.linkedin.com/company/.../">
                                <i className="bi bi-linkedin me-2"></i>
                                {this.state.strings.links.linkedin}
                            </a>
                            <div className="dropdown d-inline">
                                <button
                                    className="btn btn-sm btn-outline-secondary dropdown-toggle px-3"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false">
                                    <span className="me-1">
                                        {this.props.theme === 'light' ? (
                                            <span>
                                                <i className="bi bi-brightness-high-fill me-2"></i>
                                                {this.state.strings.theme.light}
                                            </span>
                                        ) : (
                                            <span>
                                                <i className="bi bi-moon-stars-fill me-2"></i>
                                                {this.state.strings.theme.dark}
                                            </span>
                                        )}
                                    </span>
                                </button>
                                <ul className="dropdown-menu">
                                    <li>
                                        <button className="dropdown-item"
                                            onMouseDown={event => this.props.events.setTheme('light')}>
                                            <i className="bi bi-brightness-high-fill me-2 opacity-50"></i>
                                            {this.state.strings.theme.light}
                                        </button>
                                    </li>
                                    <li>
                                        <button className="dropdown-item"
                                            onMouseDown={event => this.props.events.setTheme('dark')}>
                                            <i className="bi bi-moon-stars-fill me-2 opacity-50"></i>
                                            {this.state.strings.theme.dark}
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default FooterComponent;