import { Global, Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import dbConfig from "./db-config";
import { ConfigType } from "@nestjs/config";

@Global()
@Module({
    imports: [
        MongooseModule.forRootAsync({
            useFactory: (configService: ConfigType<typeof dbConfig>) => {
                const { db, env } = configService;
                const uriDb =
                    env === 'local'
                        ? `${db.connection}${db.host}/${db.name}`
                        : `mongodb+srv://${db.user}:${db.password}@clases.xi4viq3.mongodb.net/${db.name}?retryWrites=true&w=majority`;
                return {
                    uri: uriDb
                };
            },
            inject: [dbConfig.KEY]
        }),
    ]
})
export class PersistanceModule {}
