// Fox requirements
import { FoxComponent, HeaderNavComponent,
    FooterComponent } from '../../components';

// Page class
class BadResponseErrorPage extends FoxComponent {
    
    // Component strings
    static strings = {
        en: {
            title: 'We have had communication problems',
            description: 'Unfortunately we have not been able to communicate correctly and seamlessly with the server. Try clearing your browser cache and try again.',
            back: 'Back to home',
        },
        es: {
            title: 'Hemos tenido problemas con la comunicación',
            description: 'Lamentablemente no hemos podido comunicarnos de manera correcta e íntegra con el servidor. Intente eliminar el caché de su navegador e inténtelo nuevamente.',
            back: 'Volver al inicio',
        },
    };

    render() {
        return (
            <div className="d-flex flex-column min-vh-100">
                
                <HeaderNavComponent
                    selected=""
                    events={this.props.events}
                    params={this.props.params}
                    language={this.props.language}
                    theme={this.props.theme} />

                <div className="flex-fill container mt-5 mb-4">
                    <div className="row justify-content-md-center">
                        <div className="col-md-10 px-4 p-md-2 text-center mb-4">
                            <i className="bi bi-plugin d-block mb-3 py-4 opacity-75" style={{ fontSize: '100px' }}></i>
                            <h2 className="mb-4">
                                {this.state.strings.title}
                            </h2>
                            <p className="lead mb-4 pb-4">
                                {this.state.strings.description}
                            </p>
                            <p>
                                <a className="btn btn-secondary px-4" href="#/">
                                    <i className="bi bi-chevron-left me-3"></i>
                                    {this.state.strings.back}
                                </a>
                            </p>
                        </div>
                    </div>
                </div>

                <FooterComponent
                    events={this.props.events}
                    params={this.props.params}
                    language={this.props.language}
                    theme={this.props.theme} />
            </div>
        );
    }
};

export default BadResponseErrorPage;
