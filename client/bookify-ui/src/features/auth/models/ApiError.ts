export interface ApiError {
    type: string;
    title: string;
    status: number;
    detail: string;
    errors: { propertyName: string; errorMessage: string; }[];
}
