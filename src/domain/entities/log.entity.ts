
export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high'
}

export class LogEntity {
    public level: LogSeverityLevel //enum
    public message: string;
    public createdAt: Date;

    constructor( level: LogSeverityLevel, message: string ) {
        this.message = message;
        this.level = level
        this.createdAt = new Date()

    }

    static fromJson = (json: string): LogEntity => {
        const { message, level, createdAt} = JSON.parse(json);

        const log = new LogEntity( message, level);
        log.createdAt = new Date(createdAt);

        return log;
    }
}