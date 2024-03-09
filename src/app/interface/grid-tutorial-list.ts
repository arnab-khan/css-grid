export interface GridTutorialList {
    slug: string;
    heading: string;
    content: Content[];
}

export interface Content {
    heading?: string;
    example?: Example;
    description?: string;
}

export interface Example {
    codeComponent: string;
    filePath: string;
}