import { Body, Controller, HttpCode, Post } from '@nestjs/common';
    import { ApiTags } from '@nestjs/swagger';
    import {
      IFheAgent_Request,
       IFheAgent_Response,
    } from 'generated/dto/IFheAgent.dto';
    import { BaseVerifierController } from 'src/controllers/base/verifier-base.controller';
    import { AttestationResponse } from 'src/dtos/generic/generic.dto';
    import { IFheAgentVerifierService } from './IFheAgent.service';
    
    @ApiTags('IFheAgent')
    @Controller('IFheAgent')
    export class IFheAgentVerifierController extends BaseVerifierController<
       IFheAgent_Request,
       IFheAgent_Response
    > {
      constructor(protected readonly verifierService: IFheAgentVerifierService) {
        super();
      }

    /**
    * Tries to verify attestation request (given in JSON) without checking message integrity code, and if successful it returns response.
    * @param prepareResponseBody
    * @returns
    */
    @HttpCode(200)
    @Post('prepareResponse') 
    async prepareResponse(@Body() body: IFheAgent_Request): Promise<AttestationResponse<IFheAgent_Response>> {
      return this.verifierService.prepareResponse(body);
    }
}
