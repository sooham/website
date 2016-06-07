const data = [
    {
        name: "Blog",
        description: "Hi, welcome to my blog",
        items: [
            { name: "Reflection on CIFAR10", content: "Lorem ipsum In Duis ut veniam voluptate nisi anim dolore minim incididunt officia velit veniam pariatur velit nostrud magna pariatur in fugiat." },
            { name: "What is backpropagation", content: "Lorem ipsum Reprehenderit quis in cillum aliquip nisi consequat nisi non esse enim non velit commodo aliqua est pariatur fugiat et in do amet elit Ut minim cupidatat ut mollit Duis ad incididunt in incididunt magna cupidatat esse aute tempor adipisicing ex." },
            { name: "How neural nets differ from neurons", content: "Lorem ipsum Consequat amet culpa laboris ut et nostrud deserunt ex non laborum quis exercitation consectetur dolor esse sunt adipisicing deserunt qui sunt sed Duis exercitation dolore incididunt cupidatat laboris dolore deserunt consectetur qui do." },
            { name: "SIFT and feature descriptors", content: "Lorem ipsum Consequat amet culpa laboris ut et nostrud deserunt ex non laborum quis exercitation consectetur dolor esse sunt adipisicing deserunt qui sunt sed Duis exercitation dolore incididunt cupidatat laboris dolore deserunt consectetur qui do." },
            { name: "Subgradients", content: "Lorem ipsum Consequat amet culpa laboris ut et nostrud deserunt ex non laborum quis exercitation consectetur dolor esse sunt adipisicing deserunt qui sunt sed Duis exercitation dolore incididunt cupidatat laboris dolore deserunt consectetur qui do." },
            { name: "OpenAI gym examples", content: "Lorem ipsum Consequat amet culpa laboris ut et nostrud deserunt ex non laborum quis exercitation consectetur dolor esse sunt adipisicing deserunt qui sunt sed Duis exercitation dolore incididunt cupidatat laboris dolore deserunt consectetur qui do." },
            { name: "What is the Fourier Transform", content: "Lorem ipsum Consequat amet culpa laboris ut et nostrud deserunt ex non laborum quis exercitation consectetur dolor esse sunt adipisicing deserunt qui sunt sed Duis exercitation dolore incididunt cupidatat laboris dolore deserunt consectetur qui do." },
        ]
    },
    {
        name: "Projects",
        description: "Hi, welcome to my projects",
        items: [
            { name: "Graphflow", content: "Lorem ipsum Nisi tempor ullamco enim dolore incididunt aliquip sunt proident proident Duis veniam voluptate cupidatat sed pariatur fugiat tempor do veniam in voluptate nulla et ad dolore." },
            { name: "Inpainting", content: "Lorem ipsum Nisi tempor ullamco enim dolore incididunt aliquip sunt proident proident Duis veniam voluptate cupidatat sed pariatur fugiat tempor do veniam in voluptate nulla et ad dolore." },
            { name: "This webpage", content: "Lorem ipsum Nisi tempor ullamco enim dolore incididunt aliquip sunt proident proident Duis veniam voluptate cupidatat sed pariatur fugiat tempor do veniam in voluptate nulla et ad dolore." },
            { name: "Teleport", content: "Lorem ipsum Consequat amet culpa laboris ut et nostrud deserunt ex non laborum quis exercitation consectetur dolor esse sunt adipisicing deserunt qui sunt sed Duis exercitation dolore incididunt cupidatat laboris dolore deserunt consectetur qui do." },
            { name: "Archimedes", content: "Lorem ipsum Consequat amet culpa laboris ut et nostrud deserunt ex non laborum quis exercitation consectetur dolor esse sunt adipisicing deserunt qui sunt sed Duis exercitation dolore incididunt cupidatat laboris dolore deserunt consectetur qui do." },
            { name: "PongAI", content: "Lorem ipsum Consequat amet culpa laboris ut et nostrud deserunt ex non laborum quis exercitation consectetur dolor esse sunt adipisicing deserunt qui sunt sed Duis exercitation dolore incididunt cupidatat laboris dolore deserunt consectetur qui do." },
            { name: "CIFAR10", content: "Lorem ipsum Consequat amet culpa laboris ut et nostrud deserunt ex non laborum quis exercitation consectetur dolor esse sunt adipisicing deserunt qui sunt sed Duis exercitation dolore incididunt cupidatat laboris dolore deserunt consectetur qui do." },
        ]
    },
    {
        name: "Demos",
        description: "Hi, welcome to my demos",
        items: [
            { name: "Rubber duck debugging", content: "Lorem ipsum Nisi tempor ullamco enim dolore incididunt aliquip sunt proident proident Duis veniam voluptate cupidatat sed pariatur fugiat tempor do veniam in voluptate nulla et ad dolore." },
            { name: "Friday Chatbot", content: "Lorem ipsum Nisi tempor ullamco enim dolore incididunt aliquip sunt proident proident Duis veniam voluptate cupidatat sed pariatur fugiat tempor do veniam in voluptate nulla et ad dolore." },
            { name: "Neural net pong", content: "Lorem ipsum Nisi tempor ullamco enim dolore incididunt aliquip sunt proident proident Duis veniam voluptate cupidatat sed pariatur fugiat tempor do veniam in voluptate nulla et ad dolore." },
            { name: "Task", content: "Lorem ipsum Consequat amet culpa laboris ut et nostrud deserunt ex non laborum quis exercitation consectetur dolor esse sunt adipisicing deserunt qui sunt sed Duis exercitation dolore incididunt cupidatat laboris dolore deserunt consectetur qui do." },
            { name: "React Xray", content: "Lorem ipsum Consequat amet culpa laboris ut et nostrud deserunt ex non laborum quis exercitation consectetur dolor esse sunt adipisicing deserunt qui sunt sed Duis exercitation dolore incididunt cupidatat laboris dolore deserunt consectetur qui do." },
            { name: "Archimedes", content: "Lorem ipsum Consequat amet culpa laboris ut et nostrud deserunt ex non laborum quis exercitation consectetur dolor esse sunt adipisicing deserunt qui sunt sed Duis exercitation dolore incididunt cupidatat laboris dolore deserunt consectetur qui do." },
        ]
    },
    {
        name: "Resume",
        description: "Hi, welcome to my resume",
        items: []
    }
];

const dataMap = data.reduce(function (map, category) {
    category.itemsMap = category.items.reduce(function (itemsMap, item) {
        itemsMap[item.name] = item;
        return itemsMap;
    }, {});
    map[category.name] = category;
    return map;
}, {});

exports.getAll = function () {
    return data;
};

exports.lookupCategory = function (name) {
    return dataMap[name];
};

exports.lookupItem = function (category, item) {
    return dataMap[category].itemsMap[item];
};
