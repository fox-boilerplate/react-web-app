// Application requirements
import Markdown from 'react-markdown';

// Fox requirements
import { FoxComponent, HeaderNavComponent,
    FooterComponent } from '../components';

// Page class
class ContactPage extends FoxComponent {

    static route = /^\/contact$/;
    static installed = true;
    static authenticated = null;
    static strings = {
        en: {
            header: {
                title: 'Contact with us',
                subtitle: 'Let us know how we can help you!',
            },
            info: `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod leo eget
nunc fringilla, nec mattis ex interdum. Donec purus nisl, tincidunt vitae lacus
ac, blandit lacinia risus. In placerat, dui non iaculis pharetra, enim risus
gravida neque, a faucibus odio dolor a tortor. Fusce lacinia nulla vel ligula
fringilla, vel maximus dui fermentum.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod leo eget
nunc fringilla, nec mattis ex interdum.

- **General information**: [info@example.com](mailto:info@example.com)
            `
        },
        es: {
            header: {
                title: 'Contacta con nosotros',
                subtitle: '¡Déjanos saber cómo podemos ayudarte!',
            },
            info: `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod leo eget
nunc fringilla, nec mattis ex interdum. Donec purus nisl, tincidunt vitae lacus
ac, blandit lacinia risus. In placerat, dui non iaculis pharetra, enim risus
gravida neque, a faucibus odio dolor a tortor. Fusce lacinia nulla vel ligula
fringilla, vel maximus dui fermentum.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod leo eget
nunc fringilla, nec mattis ex interdum.

- **Informaciones generales**: [info@example.com](mailto:info@example.com)
            `
        },
    };

    constructor(props) {

        super(props, {
            localization: 'Santiago, Chile'
        });
    }

    render() {
        return (
            <div className="d-flex flex-column min-vh-100">
                
                <HeaderNavComponent
                    selected="contact"
                    events={this.props.events}
                    params={this.props.params}
                    language={this.props.language}
                    theme={this.props.theme} />

                <div className="flex-fill py-4 my-3">
                    <div className="container">

                        <div className="mb-5">
                            <h1 className="fw-lighter mb-3">
                                {this.state.strings.header.title}
                            </h1>
                            <p className="lead">
                                {this.state.strings.header.subtitle}
                            </p>
                            <Markdown>
                                {this.state.strings.info}
                            </Markdown>
                        </div>

                        <iframe
                            className="border rounded-1 p-1 w-100"
                            title="Inside Security"
                            style={{ height: '300px' }}
                            src={`https://maps.google.com/maps?q=${encodeURI(this.state.localization)}&width=100%25&height=485&hl=en&t=&z=17&ie=UTF8&iwloc=B&output=embed`}>
                        </iframe>
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

export default ContactPage;
