// Fox requirements
import { FoxComponent, HeaderNavComponent,
    FooterComponent } from '../components';

// Page class
class MainPage extends FoxComponent {

    // Component strings
    static strings = {
        en: {
            view: 'View',
            edit: 'Edit',
            minutes: 'mins',
            thumbnail: 'thumbnail',
        },
        es: {
            view: 'Ver',
            edit: 'Editar',
            minutes: 'mins',
            thumbnail: 'miniatura',
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

                <div className="flex-fill py-4 my-3">
                    <div className="text-center container">

                        <div className="row py-5">
                            <div className="col-lg-6 col-md-8 mx-auto">
                                <h1 className="fw-light mb-4">Lorem ipsum</h1>
                                <p className="lead text-muted">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Morbi semper fringilla mattis. Nunc blandit nisl vel
                                    malesuada ornare. Maecenas sit amet condimentum magna.
                                    Curabitur efficitur viverra lobortis.
                                </p>
                                <p>
                                    <a href="#/" className="btn btn-primary m-2">Lorem ipsum dolor</a>
                                    <a href="#/" className="btn btn-secondary m-2">Lorem ipsum dolor</a>
                                </p>
                            </div>
                        </div>
                    
                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                            {(new Array(6)).fill(null).map((i, id) => (
                                <div className="col" key={`main-${id}`}>
                                    <div className="card shadow-sm overflow-hidden">
                                        <div className="text-center bg-secondary text-light d-flex justify-content-center align-items-center" style={{ height: '170pt' }}>
                                            {this.state.strings.thumbnail}
                                        </div>
                                        <div className="card-body">
                                            <p className="card-text">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                                Morbi semper fringilla mattis. Nunc blandit nisl vel
                                                malesuada ornare.
                                            </p>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="btn-group">
                                                    <a href="#/" className="btn btn-sm btn-outline-secondary">
                                                        {this.state.strings.view}
                                                    </a>
                                                    <a href="#/" className="btn btn-sm btn-outline-secondary">
                                                        {this.state.strings.edit}
                                                    </a>
                                                </div>
                                                <small className="text-muted">{id + 1} {this.state.strings.minutes}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
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

export default MainPage;
