const {
    projects,
    clients
} = require('../sampleData.js');

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLList
} = require('graphql');

//project type
const ProjectType = new GraphQLObjectType({
    name: "Project",
    fields: () => ({
        id: {
            type: GraphQLID,
        },
        name: {
            type: GraphQLString,
        },
        description: {
            type: GraphQLString,
        },
        status: {
            type: GraphQLString,
        },
        client: {
            type: ClientType,
            resolve(parent, args) {
                return clients.find(client => client.id === parent.clientId)
            },
        },
    }),
});

//client type

const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        phone: {
            type: GraphQLString
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        clients: {
            type: new GraphQLList(ClientType),
            resolve(parent, args) {
                return clients;
            }
        },
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parent, args) {
                return projects;
            }
        },
        project: {
            type: ProjectType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                return projects.find(project => project.id === args.id);
            }
        },
        client: {
            type: ClientType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                return clients.find(client => client.id === args.id);
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})