import { LogDatasource } from "../../domain/datasources/log.datasouce";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repository/log.repository";


export class LogRepositoryImplemetation implements LogRepository {
    
    constructor(
        private readonly logDatasorce: LogDatasource
    ) {}
    
    async saveLog(log: LogEntity): Promise<void> {
        return this.logDatasorce.saveLog(log);
    }
    async getLog(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        return this.logDatasorce.getLog(severityLevel);
    }

}