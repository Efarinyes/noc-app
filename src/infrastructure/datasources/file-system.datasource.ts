import fs from 'fs';

import { LogDatasource } from "../../domain/datasources/log.datasouce";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";



export class FileSystemDatasource implements LogDatasource {

    private readonly logPath = 'logs/';
    private readonly allLogsPath = 'logs/logs-all.log';
    private readonly mediumLogsPath = 'logs/logs-medium.log';
    private readonly hightLogsPath = 'logs/logs-hight.log';


    constructor() {
        this.createLoFiles()
    }

    private createLoFiles = () => {
        if( !fs.existsSync( this.logPath )) {
            fs.mkdirSync( this.logPath )
        }

        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.hightLogsPath
        ].forEach( path => {
            if ( fs.existsSync( path)) return;
            fs.writeFileSync( path, '' );
        })

    }

    async saveLog(newLog: LogEntity): Promise<void> {

        const logJson = `${ JSON.stringify(newLog)}\n`;

        fs.appendFileSync(this.allLogsPath, logJson);
        if( newLog.level === LogSeverityLevel.low ) return;

        if( newLog.level === LogSeverityLevel.medium ) {
            fs.appendFileSync( this.mediumLogsPath, logJson)
        } else {
            fs.appendFileSync( this.hightLogsPath, logJson)
        } 
        
    }

    private getLogsFromFile = (path: string): LogEntity[] => {
        const content = fs.readFileSync( path, 'utf-8');

        const logs = content.split('\n').map(
            log => LogEntity.fromJson(log)
        );

        return logs;
    }

    async getLog(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        switch( severityLevel ) {

            case LogSeverityLevel.low:
                return this.getLogsFromFile(this.allLogsPath);
            
            case LogSeverityLevel.medium:
                return this.getLogsFromFile(this.mediumLogsPath);

            case LogSeverityLevel.high:
                return this.getLogsFromFile(this.hightLogsPath);
            
            default:
                throw new Error(`${ severityLevel } not implemented`)
        }
    }

}