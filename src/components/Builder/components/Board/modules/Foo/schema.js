export const schema = {
    title: "Foo Module Form",
    description: "A simple form example.",
    type: "object",
    required: ["title", "subtitle"],
    properties: {
        title: {
            type: "string",
            title: "Title"            
        },
        subtitle: {
            type: "string",
            title: "Subtitle"
        },
        age: {
            type: "integer",
            title: "Age"
        },
        bio: {
            type: "string",
            title: "Bio"
        },       
        telephone: {
            type: "string",
            title: "Telephone",
            minLength: 10
        }
    }
};
