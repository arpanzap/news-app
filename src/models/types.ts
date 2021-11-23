export interface ICategory {
    name: string,
    isSelected: boolean
}
export interface IArticle {
    "author": string,
    "title": string,
    "description": string,
    "url": string,
    "urlToImage": string,
    "publishedAt": string,
    "content": string,
}

export interface INewsResponse {
    articles: IArticle[];
}