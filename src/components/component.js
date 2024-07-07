import jsonschema from 'jsonschema';
import { Component } from 'react';

class FoxComponent extends Component {

    constructor(props, state) {

        // Input validation from properties
        const validation = (new jsonschema.Validator()).validate(props, {
            type: Object,
            properties: {
                events: { type: Array, items: { type: Object } },
                params: { type: Array, items: { type: String } },
                language: { type: String, pattern: /^[a-z]{2,3}$/ },
                theme: { type: String, enum: [ 'dark', 'light' ] },
            },
            required: [ 'events', 'params', 'language', 'theme' ],
        }, { required: true, allowUnknownAttributes: false });

        if(validation.errors.length)
            throw new Error(`Integrity error on Page.props validation: ${JSON.stringify(validation.errors, null, 2)}`);

        // Propagate options
        super(props);

        // Set default state
        this.state = {

            // Child state
            ...state,

            // Parent state
            language: props.language,
            strings: this.constructor.strings.hasOwnProperty(props.language) ?
                this.constructor.strings[this.props.language] :
                (this.constructor.strings.en ?? { })
        }

        // Bind context
        this.setStrings = this.setStrings.bind(this);
    }

    componentDidMount() {
        this.setStrings();
    }

    componentDidUpdate() {
        this.setStrings();
    }

    async setStrings() {
        
        // Does not have strings
        if(!this.constructor.hasOwnProperty('strings'))
            return;

        // Update language if is required
        if(this.state.language !== this.props.language)
            this.setState({
                language: this.props.language,
                strings: this.constructor.strings.hasOwnProperty(this.props.language) ?
                    this.constructor.strings[this.props.language] :
                    (this.constructor.strings.en ?? { })
            });
    }
}

export default FoxComponent;