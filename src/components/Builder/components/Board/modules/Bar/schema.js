export const schema = {
    title: "Bar Module Form",
    description: "A simple form example.",
    type: "object",
    required: ["title"],
    properties: {
        title: {
            type: "string",
            title: "Title",
            default: "Rodrigo"
        },
        subtitle: {
            type: "string",
            title: "Subtitle"
        }
    }
};
