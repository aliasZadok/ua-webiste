export interface User {
    id: string;
    email: string;
    name: string;
  }
  
  export interface Post {
    id: string;
    title: string;
    content: string;
    authorId: string;
    createdAt: string;
  }
  
  export interface PortfolioItem {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    projectUrl: string;
  }