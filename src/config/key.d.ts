
type IConfigKeys = {
    DB: I_DB
    TOKEN: I_TOKEN,
    AWS: I_AWS,
    FCM: I_FCM,
}

interface I_FCM {
    type: string;
    auth_uri: string;
    token_uri: string;
    client_id: string;
    project_id: string;
    private_key: string;
    client_email: string;
    private_key_id: string;
    client_x509_cert_url: string;
    auth_provider_x509_cert_url: string;
}

interface I_AWS {
    AWS_FROM_EMAIL: string;
    AWS_ACCESS_KEY: string;
    AWS_SECRET_KEY: string;
    AWS_SES_REGION: string;
}
interface I_TOKEN {
    TOKEN_TYPE: string
    ACCESS_EXP: string
    REFRESH_EXP: string
    ACCESS_TOKEN: string
    REFRESH_TOKEN: string
    ADMIN_ACCESS_TOKEN: string
    ADMIN_REFRESH_TOKEN: string
}

interface I_DB {
    DB_PORT: string;
    DB_NAME: string;
    TIME_ZONE: string;
    DB_PASSWORD: string;
    DB_USER_NAME: string;
    DB_HOST_NAME: string;
}