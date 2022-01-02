export interface Message {
    id: string;
    timestamp: Date;
    returnPath: string;
    subject: string;
    metadata: Metadata;
    sourceName: string;
    securityAnalysis: SecurityAnalysis;
    source: string;
    headers: Header[];
    _raw: string;
    messageId: string;
    destinationName: string;
    destination: string;
    sent: Date;
}

export interface Header {
    name: string;
    value: string;
}

export interface SecurityAnalysis {
    SPF: SecurityAnalysisResult;
    Virus: SecurityAnalysisResult;
    DKIM: SecurityAnalysisResult;
    Spam: SecurityAnalysisResult;
}

export interface Metadata {
    ObjectKey: string;
    ObjectKeyPrefix: string;
    Type: string;
    BucketName: string;
    TopicArn: string;
}

export type SecurityAnalysisResult = "FAIL" | "PASS" | "GRAY";