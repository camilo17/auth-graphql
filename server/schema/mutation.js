const graphql = require('graphql');


const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt
} = graphql;

const UserType = require('./types/user_type');
const AuthService = require('../services/auth');

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        signup: {
            type: UserType,
            args: {
                email: {type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve(parentValue, args, request) {
                return AuthService.signup({email:args.email, password: args.password, req: request});
            }

        },
        logout: {
            type: UserType,
            resolve(parentValue, args, req){
                console.log(req);
                const { user } = req;
                req.logout();
                return user;
            }
        }

    }
});


module.exports = mutation;

