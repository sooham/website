import React from "react";

import GoogleLogin from "react-google-login";

export default React.createClass({
    onSuccessfulLogin: function(googleUser) {
        // set the state for the email and other stuff
        var profile = googleUser.getBasicProfile();

        this.setState({
            isLoggedIn: true,
            userProfile: profile,
            name: profile.getName(),
            email: profile.getEmail(),
            imageUrl: profile.getImageUrl()
        });
    },

    getInitialState: function() {
        return {
            isLoggedIn: false,
            userProfile: undefined,
            name: undefined,
            email: undefined,
            imageUrl: undefined
        };
    },

    render: function() {
        const {isLoggedIn, name, email, imageUrl} = this.state;

        return (
            <div>
                <GoogleLogin
                    clientId="12583689071-krpmfbg2ct8og2v82jrecd169t8jcu16.apps.googleusercontent.com"
                    callback={this.onSuccessfulLogin}
                >
                    <i className="fa fa-google fa-5x" aria-hidden="true"></i>
                </GoogleLogin>
                {isLoggedIn && (
                    <div>
                        <p>Hi {name}</p>
                        <p>Your email is: {email}</p>
                        <img src={imageUrl}/>
                    </div>
                )}
            </div>
        );
    }
});
