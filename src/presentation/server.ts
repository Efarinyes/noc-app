import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImplemetation } from "../infrastructure/repopsitories/log-implementation.repository";
import { CronService } from "./cron/cron-service";

const fileSystemLogREpository = new LogRepositoryImplemetation(
    new FileSystemDatasource()
)

export class Server {
    
    public static start() {
        console.log('Server started...');

        CronService.creteJob(
            '*/5 * * * * *',
            () => {
                 const url = 'http://localhost:3000';
                 new CheckService(
                    fileSystemLogREpository,
                    () => console.log(`${url} is ok`),
                    (error) => console.log(error)
                 ).execute(url);
                // new CheckService().execute('http://localhost:3000');
            }
        );
    }
}