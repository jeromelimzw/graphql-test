const { GraphQLServer } = require("graphql-yoga");
const PeopleDB = require("../people");

let links = [
  {
    id: 0,
    title: "GraphQL Tutorial",
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL"
  },
  {
    id: 1,
    title: "React Tutorial",
    url: "www.howtoreact.com",
    description: "Fullstack tutorial for React"
  },
  {
    id: 2,
    title: "JS Tutorial",
    url: "www.howtoJS.com",
    description: "Fullstack tutorial for JavaScript"
  }
];

let idCount = links.length;
const resolvers = {
  //GET or READ
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    link: (parent, args) => {
      if (args.id)
        return links.find(a => a.id.toString() === args.id.toString());
    }
  },
  Mutation: {
    addLink: (parent, args) => {
      const link = {
        id: idCount++,
        description: args.description,
        url: args.url,
        title: args.title
      };
      links.push(link);
      return link;
    },
    deleteLink: (parent, args) => {
      const toDelete = links.find(a => a.id.toString() === args.id);
      const index = toDelete && toDelete.id;
      links.splice(index, 1);
      return toDelete;
    },
    updateLink: (parent, args) => {
      const toUpdate = links.find(a => a.id.toString() === args.id);
      const index = toUpdate && toUpdate.id;
      const updatedLink = {
        id: index,
        description: args.description,
        url: args.url,
        title: args.title
      };
      links.splice(index, 1, updatedLink);
      return updatedLink;
    }
  }
};

// 3
const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
