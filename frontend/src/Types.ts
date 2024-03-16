
// Survey Data Types
export interface Answer {
    text: string;
    index: number;
}

export interface Question {
    question: string;
    img?: {
        src: string;
        alt: string;
    };
    answers: Answer[];
}

export interface Level {
    level: string;
    questions: Array<Question>;
}


// Global State Types

export interface User {
    uid: string;
    name: string;
    email: string;
    manager: boolean;
}

export interface Organization {
    oid: string;
    name: string;
    ownerId: string;
    users: Array<User>;
}