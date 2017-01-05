// @flow
const blogPostData = [
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
            ];

exports.blogPostList = blogPostData;

const blogPostMap = blogPostData.reduce(function (map, post) {
    map[post.title] = post;
    return map;
}, {});


exports.lookupBlogPost = function (post) {
    return blogPostMap[post];
};

