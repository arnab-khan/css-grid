export interface GridTutorialList {
    code: string;
    slug: string;
    heading: string;
    description?: string,
    content: Content[];
}

export interface Content {
    code?: string;
    heading?: string;
    description?: string;
    explain?: string;
    editorHeight?: number;
    outputHeight?: number;
    outputMinWidth: number;
}