import React from "react";

import GoogleLogin from "react-google-login";

import Editor from "components/Editor";
import styles from "styles/loginPane.module.css";

// TODO: make a PROPER auth flow from Login to Editor
// This may involve creating a new component for login
// see react-router/examples/auth-* for ideas

// TODO: for now, I only use the local state of the login component
// for auth. Its really bad...

// TODO: single user auth using an email check, how laughable....
// need to find a better solution

// TODO: I should redirect people who are not me to root

// TODO: test if malicious logger gets the "naughy message"

export default React.createClass({
    onSuccessfulLogin: function(googleUser) {
        // set the state for the email and other stuff
        var profile = googleUser.getBasicProfile();

        this.setState({
            isLoggedIn: true,
            isSoohamRafiz: (profile.getEmail() === "rafizsooham@gmail.com"),
            userProfile: profile,
            name: profile.getName(),
            imageUrl: profile.getImageUrl()
        });
    },

    renderLoginPane: function() {
        const {isSoohamRafiz, isLoggedIn} = this.state;
        if (!isSoohamRafiz) {
            return (
                <div className={styles.loginPane}>
                    <GoogleLogin
                        clientId="12583689071-krpmfbg2ct8og2v82jrecd169t8jcu16.apps.googleusercontent.com"
                        callback={this.onSuccessfulLogin}
                        cssClass={styles.googleLoginBtn}
                    >
                        <i className="fa fa-google fa-5x" aria-hidden="true"></i>
                    </GoogleLogin>
                    <h3>{
                            isLoggedIn ? "You're being naughty." : "Hi Sooham, Login Please."
                        }
                    </h3>
                </div>
            );
        } else {
            return null;
        }
    },

    getInitialState: function() {
        return {
            isLoggedIn: false,
            isSoohamRafiz: false,
            userProfile: undefined,
            name: undefined,
            imageUrl: undefined
        };
    },

    render: function() {
        const {isLoggedIn, name, email, imageUrl} = this.state;
        console.log("in render of loginPane");

        return (
            <div>
                { this.renderLoginPane() || <Editor /> }
            </div>
        );
    }
});
