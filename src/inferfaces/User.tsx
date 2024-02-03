export interface LoginData {
    email: string;
    password: string;
}

export interface SectionProps {
    message: string;
    link: string;
    url: string;
}

export interface SigUpData {
    name: string
    email: string;
    password: string;
    phone: string;
    birthday: Date;
    address: {
        zipcode: number;
        detail: string
    },
}
