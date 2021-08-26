import { Global, Module } from "@nestjs/common";
import { KeysService } from "./key.service";

@Global()
@Module({
    providers: [KeysService],
    exports: [KeysService],
})
export class KeysConfigModule { }