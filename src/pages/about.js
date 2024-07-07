// Application requirements
import Markdown from 'react-markdown';

// Fox requirements
import { FoxComponent, HeaderNavComponent,
    FooterComponent } from '../components';

// Page class
class AboutPage extends FoxComponent {

    static route = /^\/about$/;
    static installed = true;
    static authenticated = null;
    static strings = {
        en: {
            header: {
                title: 'About us',
                subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod.',
            },
            body: `
### Lorem ipsum dolor

Lorem ipsum dolor sit amet, **consectetur adipiscing elit**. In euismod leo eget
nunc fringilla, nec mattis ex interdum. Donec purus nisl, tincidunt vitae lacus
ac, blandit lacinia risus. *In placerat, dui non iaculis pharetra*, enim risus
gravida neque, a faucibus odio dolor a tortor. Fusce lacinia nulla vel ligula
fringilla, vel maximus dui fermentum.
            `,
        },
        es: {
            header: {
                title: 'Acerca de nosotros',
                subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod.',
            },
            body: `
### Lorem ipsum dolor

Lorem ipsum dolor sit amet, **consectetur adipiscing elit**. In euismod leo eget
nunc fringilla, nec mattis ex interdum. Donec purus nisl, tincidunt vitae lacus
ac, blandit lacinia risus. *In placerat, dui non iaculis pharetra*, enim risus
gravida neque, a faucibus odio dolor a tortor. Fusce lacinia nulla vel ligula
fringilla, vel maximus dui fermentum.
            `
        },
    };

    render() {
        return (
            <div className="d-flex flex-column min-vh-100">
                
                <HeaderNavComponent
                    selected="about"
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
                        </div>
                    
                        <Markdown>{this.state.strings.body}</Markdown>
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

export default AboutPage;
