import React from "react";

import {Editor, EditorState} from "draft-js";

import "modules/draft-js/dist/Draft.css";
import styles from "styles/editor.module.css";

// TODO: make a PROPER auth flow from Login to Editor
// This may involve creating a new component for login
// see react-router/examples/auth-* for ideas

// TODO: for now, I only use the local state of the Editor component
// for auth. Its really bad...

// TODO: single user auth using an email check, how laughable....
// need to find a better solution

export default React.createClass({
    onChange: function(editorState) {
        this.setState({editorState});
    },

    getInitialState: function() {
        return {
            editorState: EditorState.createEmpty()
        };
    },
    render: function() {
        const {editorState} = this.state;
        return (
            <div>
                <Editor editorState={editorState} onChange={this.onChange} />
            </div>
        );
    }
});
