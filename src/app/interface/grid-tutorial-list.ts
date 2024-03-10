export interface GridTutorialList {
    code: string;
    slug: string;
    heading: string;
    content: Content[];
}

export interface Content {
    code: string;
    heading?: string;
    description?: string;
}