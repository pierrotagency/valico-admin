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
        },
        "tasks": {
            "type": "array",
            "title": "Tasks",
            "items": {
                "type": "object",
                "required": [
                    "title"
                ],
                "properties": {
                    "title": {
                    "type": "string",
                    "title": "Title",                    
                    },
                    "details": {
                    "type": "string",
                    "title": "Task details",
                    "description": "Enter the task details"
                    },
                    "done": {
                    "type": "boolean",
                    "title": " Done?",
                    "default": false
                    }
                }
            }
        }
    }
};
