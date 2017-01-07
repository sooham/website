// @flow
const blogPostData = [
                {
                  title: "Why geeks should write",
                  date: "2015-01-26",
                  categories: ["general", "pedagogy"],
                  __html: "<p>To the comp-sci nerds who don’t write:</p><p>[To clarify, this is a a slog post in the form of a letter, the format suits the writer’s tone]</p><p>I heard you don’t like English. Good Grief – let’s talk.</p><p>Like you, dear reader, I also lived my entire high school career believing I was one of the more \“mathy\” kids, lacking any cohesive writing ability. While the mere thought of writing an “essay” made my body convulse and twitch in fear, I was aware that such a phobia was not unique to myself. In reality, it is common for geeks to be confident in advanced science and mathematics yet fear writing. That’s a shame!</p><p>I believe that even geeks should be adept at common literary skills such as writing. In fact, taking computer science courses at U of T has only reinforced my view on this issue. Let me explain my thinking: I shall make my case on why all computer scientists / geeks should know how to write well.</p> <p>First and foremost, my most obvious case is that writing effectively is a skill employed in all fields. Whether you’re working in U of T’s Arabic literature department or studying Zoology elsewhere, you as an individual must write effectively so that you can express ideas in a concise manner, discuss ideas without meeting face-to-face, or just for fun! &nbsp;Writing is an integral part of human culture and communication.</p> <p>Now, a perceptive individual can offer counterexamples, like &nbsp;\“Maths can also be just as a important or prevalent as writing, so why emphasize?\” or \“geeks don’t need no natural language, we got mathematic logic\”. While such counterexamples may be true, I am not suggesting that geeks write 24/7, just that they mature their ability to write through some practice.</p> <p>The following cases for “why geeks should write” hit closer to our playing field for computer scientists and show the ubiquitous demand for good writing.</p> <p>My second case appeals to the fact that majority of Software engineering and programming requires effective communication. This can never be more true – very few large-scale projects in the industry are the result of a single developer (I’m looking at you Linus Torvalds!), for example, Google Maps alone requires 1,100 developers to maintain and update. This trend is poised to continue as companies strive to solve more complex problems. In order to be a truly great developer in the ever connected field of computer science, developer must be able to communicate well in writing, whether it be in writing a code review for a peer or communicating issues in software to your manager.</p> <p>Lastly, I state that both effective writing and effective coding share similar skills and methods. As Shubro Saha identifies the article&nbsp;<a title=\"Shubro Saha\" href=\"http://www.shubhro.com/2014/12/27/software-engineers-should-write/\">Software Engineers should write</a>,&nbsp;writing good code requires one to identify which classes to create and&nbsp;which functions to implement, similarly writing effectively requires that one&nbsp;identify the structure of the essay. Analogously, writing bad code detracts from&nbsp;the program’s efficiency and memory, writing bad prose detracts from the reader’s<br> attention. Finally both end results are intended for consumption for an audience.</p> <p>Hence have to strike a balance between pragmatism and perfectionism.</p> <p>I think the part about writing good documentation is obvious.</p> <p>Get writing!</p>"
                }
                /*
                { title: "Reflection on CIFAR10",
                  date: "2016-08-19",
                  categories: ["Computer Vision","Machine Learning"],
                  tags: ["CIFAR10"],
                  content: "Lorem ipsum In Duis ut veniam voluptate nisi anim dolore minim incididunt officia velit veniam pariatur velit nostrud magna pariatur in fugiat." },
                { title: "What is backpropagation",
                  date: "2011-01-10",
                  categories: ["Machine Learning"],
                  tags: ["Backpropagation"],
                 content: "Lorem ipsum Reprehenderit quis in cillum aliquip nisi consequat nisi non esse enim non velit commodo aliqua est pariatur fugiat et in do amet elit Ut minim cupidatat ut mollit Duis ad incididunt in incididunt magna cupidatat esse aute tempor adipisicing ex." },
                { title: "How neural nets differ from neurons",
                  date: "2015-11-09",
                  categories: ["Machine Learning"],
                  tags: ["Brain Biology"],
                  content: "Lorem ipsum Consequat amet culpa laboris ut et nostrud deserunt ex non laborum quis exercitation consectetur dolor esse sunt adipisicing deserunt qui sunt sed Duis exercitation dolore incididunt cupidatat laboris dolore deserunt consectetur qui do." },
                { title: "SIFT and feature descriptors",
                  date: "2015-03-09",
                  categories: ["Computer Vision", "Machine Learning"],
                  tags: ["SIFT"],
                 content: "Lorem ipsum Consequat amet culpa laboris ut et nostrud deserunt ex non laborum quis exercitation consectetur dolor esse sunt adipisicing deserunt qui sunt sed Duis exercitation dolore incididunt cupidatat laboris dolore deserunt consectetur qui do." },
                { title: "Subgradients",
                  date: "2015-03-09",
                  categories: ["Math"],
                  tags: ["Subgradients"],
                 content: "Lorem ipsum Consequat amet culpa laboris ut et nostrud deserunt ex non laborum quis exercitation consectetur dolor esse sunt adipisicing deserunt qui sunt sed Duis exercitation dolore incididunt cupidatat laboris dolore deserunt consectetur qui do." },
                { title: "OpenAI gym examples",
                  date: "2015-06-07",
                  categories: ["Machine Learning"],
                  tags: ["OpenAI"],
                  content: "Lorem ipsum Consequat amet culpa laboris ut et nostrud deserunt ex non laborum quis exercitation consectetur dolor esse sunt adipisicing deserunt qui sunt sed Duis exercitation dolore incididunt cupidatat laboris dolore deserunt consectetur qui do." },
                { title: "What is the Fourier Transform and how does it relate to quantum physics",
                  date: "2015-06-07",
                  categories: ["Math"],
                  tags: ["Fourier Transform"],
                 content: "Lorem ipsum Consequat amet culpa laboris ut et nostrud deserunt ex non laborum quis exercitation consectetur dolor esse sunt adipisicing deserunt qui sunt sed Duis exercitation dolore incididunt cupidatat laboris dolore deserunt consectetur qui do." },
                 */
            ];

exports.blogPostList = blogPostData;

const blogPostMap = blogPostData.reduce(function (map, post) {
    map[post.title] = post;
    return map;
}, {});


exports.lookupBlogPost = function (post) {
    return blogPostMap[post];
};

