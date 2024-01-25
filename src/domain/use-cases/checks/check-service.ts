
import axios from 'axios';
import { LogRepository } from '../../repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';


interface CheckServiceUseCase {
    execute( url: string): Promise<boolean>
}

type SuccessCallback = (() => void ) | undefined ;
type ErrorCallback = ((error: string) => void) | undefined;

export class CheckService implements CheckServiceUseCase {

    constructor(
        private readonly logRepository: LogRepository,
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback
        
    ) {}

   public async execute( url: string): Promise<boolean> {

    try {
        const req = await axios.get(url);
        if ( !req ) {
            throw new Error( `Error on check service ${ url }` );
        }
        
        const log = new LogEntity( LogSeverityLevel.low,`Service ${ url } working`  )

        this.logRepository.saveLog( log )
       this.successCallback && this.successCallback();
        
        return true;
    } catch (error) {
        const errorMessage = `${ url } is not OK. ${ error } `;
        const log = new LogEntity( LogSeverityLevel.high, errorMessage  )
        this.logRepository.saveLog(log)
        this.errorCallback && this.errorCallback( errorMessage );
        
        
        return false;
    }
   }
}