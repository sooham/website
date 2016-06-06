import React from "react";
import { Link } from "react-router";

export default React.createClass({
    render() {
        return (
            <div>
                <Link to="/show/blog/p/1">Back</Link>
                <article>
                    <header>
                        <h2>Blog Post 1</h2>
                    </header>
                    <section>
                        <p>Lorem ipsum Amet irure non cillum ullamco commodo ad cillum eu in dolor est dolor laboris dolor cupidatat ea ut ea sit in sit aliquip veniam dolor sunt nostrud ullamco exercitation minim cupidatat amet</p>
                        <p>proident aliqua consequat sed aliqua magna eiusmod eiusmod.</p>
                        <p>Lorem ipsum Amet irure non cillum ullamco commodo ad cillum eu in dolor est dolor laboris dolor cupidatat ea ut ea sit in sit aliquip veniam dolor sunt nostrud ullamco exercitation minim cupidatat amet</p>
                        <p>proident aliqua consequat sed aliqua magna eiusmod eiusmod.</p>
                        <p>Lorem ipsum Amet irure non cillum ullamco commodo ad cillum eu in dolor est dolor laboris dolor cupidatat ea ut ea sit in sit aliquip veniam dolor sunt nostrud ullamco exercitation minim cupidatat amet</p>
                        <p>proident aliqua consequat sed aliqua magna eiusmod eiusmod.</p>
                        <p>Lorem ipsum Amet irure non cillum ullamco commodo ad cillum eu in dolor est dolor laboris dolor cupidatat ea ut ea sit in sit aliquip veniam dolor sunt nostrud ullamco exercitation minim cupidatat amet</p>
                        <p>proident aliqua consequat sed aliqua magna eiusmod eiusmod.</p>
                    </section>
                </article>
            </div>
        );
    }
});
