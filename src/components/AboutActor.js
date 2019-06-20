import React from 'react';
import Footer from './Footer';

class AboutActor extends React.Component {
    render() {
        return (
            <div className="aboutActor">
                <div className="aboutActor__wrapper">
                    <div className="row row--column-flex">
                        <h1>About Actor</h1>
                        <p>Description</p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    };
};

export default AboutActor;