export interface ContactDetails {
    linkedin:
    ContactDetail;
    email: ContactDetail;
    phone: ContactDetail;
    whatsapp: ContactDetail;
    github: ContactDetail;
}

export interface ContactDetail {
    label: string;
    value: string;
    url: string;
    order: number;
};