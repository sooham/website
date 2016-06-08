// @flow
const data = [
    {
        name: "blog",
        items: [
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
            { title: "What is the Fourier Transform",
              date: "2015-06-07",
              categories: ["Math"],
              tags: ["Fourier Transform"],
             content: "Lorem ipsum Consequat amet culpa laboris ut et nostrud deserunt ex non laborum quis exercitation consectetur dolor esse sunt adipisicing deserunt qui sunt sed Duis exercitation dolore incididunt cupidatat laboris dolore deserunt consectetur qui do." },
        ]
    },
    {
        name: "projects",
        items: [
            { title: "Graphflow",
              technologies: ["Unity", "Javascript"],
              from: "2015-04-13",
              to: "2015-08-19",
              content: "Lorem ipsum Nisi tempor ullamco enim dolore incididunt aliquip sunt proident proident Duis veniam voluptate cupidatat sed pariatur fugiat tempor do veniam in voluptate nulla et ad dolore." },
            { title: "Inpainting",
              technologies: ["C++", "OpenCV"],
              from: "2016-04-19",
              to: "2015-08-19",
              content: "Lorem ipsum Nisi tempor ullamco enim dolore incididunt aliquip sunt proident proident Duis veniam voluptate cupidatat sed pariatur fugiat tempor do veniam in voluptate nulla et ad dolore." },
            { title: "This webpage",
              technologies: ["Node.js", "Express.js", "Webpack", "React.js", "Redux.js", "ReThinkDB"],
              from: "2015-04-19",
              to: "2015-06-07",
              content: "Lorem ipsum Nisi tempor ullamco enim dolore incididunt aliquip sunt proident proident Duis veniam voluptate cupidatat sed pariatur fugiat tempor do veniam in voluptate nulla et ad dolore." },
            { title: "Teleport",
              technologies: ["Android", "C++", "Java", "Gradle", "Groovy"],
              from: "2015-04-19",
              to: "2015-06-07",
              content: "Lorem ipsum Consequat amet culpa laboris ut et nostrud deserunt ex non laborum quis exercitation consectetur dolor esse sunt adipisicing deserunt qui sunt sed Duis exercitation dolore incididunt cupidatat laboris dolore deserunt consectetur qui do." },
            { title: "Archimedes",
              technologies: ["Neural Nets", "Tensorflow", "C++"],
              from: "2015-07-21",
              to: "2015-08-19",
              content: "Lorem ipsum Consequat amet culpa laboris ut et nostrud deserunt ex non laborum quis exercitation consectetur dolor esse sunt adipisicing deserunt qui sunt sed Duis exercitation dolore incididunt cupidatat laboris dolore deserunt consectetur qui do." },
            { title: "PongAI",
              technologies: ["Python", "Tkinter", "Neural Nets"],
              from: "2015-02-11",
              to: "2015-03-19",
              content: "Lorem ipsum Consequat amet culpa laboris ut et nostrud deserunt ex non laborum quis exercitation consectetur dolor esse sunt adipisicing deserunt qui sunt sed Duis exercitation dolore incididunt cupidatat laboris dolore deserunt consectetur qui do." },
            { title: "CIFAR10",
              technologies: ["Neural Nets", "CovNet", "Python"],
              from: "2015-04-13",
              to: "2015-08-19",
              content: "Lorem ipsum Consequat amet culpa laboris ut et nostrud deserunt ex non laborum quis exercitation consectetur dolor esse sunt adipisicing deserunt qui sunt sed Duis exercitation dolore incididunt cupidatat laboris dolore deserunt consectetur qui do." },
        ]
    },
    {
        name: "demos",
        items: [
            { title: "Rubber duck debugging", link: "/demos/rubberduck" },
            { title: "Friday Chatbot", link: "/demos/friday" },
            { title: "Neural net pong", link: "/demos/pong" },
            { title: "Task", link: "/demos/task" },
            { title: "React Xray", link: "/demos/xray" },
            { title: "Archimedes", link: "https://www.archimedes.com" },
        ]
    }
];

// Resume is not in the data object because it will have a substantially different view
// i.e link to resume

const dataMap = data.reduce(function (map, category) {
    category.itemsMap = category.items.reduce(function (itemsMap, item) {
        itemsMap[item.title] = item;
        return itemsMap;
    }, {});
    map[category.name] = category;
    return map;
}, {});

exports.getAll = function () {
    return data;
};

exports.lookupCategory = function (category) {
    return dataMap[category];
};

exports.lookupItem = function (category, item) {
    return dataMap[category].itemsMap[item];
};
