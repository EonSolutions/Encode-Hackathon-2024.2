import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  AttestationResponseStatus,
  IFheAgent_Request,
  IFheAgent_Response,
  IFheAgent_ResponseBody,
} from 'generated/dto/IFheAgent.dto';
import { IConfig } from 'src/config/configuration';
import {
  BaseVerifierService,
  IVerificationServiceConfig,
} from 'src/services/common/verifier-base.service';
import { AttestationResponse } from '../../src/dtos/generic/generic.dto';
import Web3 from 'web3';
import { createHash } from 'crypto';

type FHEResponse = {
  encrypted_data: string;
  encrypted_result: string;
}

@Injectable()
export class IFheAgentVerifierService extends BaseVerifierService<
  IFheAgent_Request,
  IFheAgent_Response
> {
    constructor(protected configService: ConfigService<IConfig>) {
    const config: IVerificationServiceConfig = {
      source: 'WEB2', //CONFIGURE THIS
      attestationName: "FheAgent",
    };
    super(configService, config);
  }

  protected async verifyRequest(
    fixedRequest: IFheAgent_Request,
  ): Promise<AttestationResponse<IFheAgent_Response>> {
    const axios = require('axios');

    const data_id = fixedRequest.requestBody.data_id;
    const data_hash = fixedRequest.requestBody.data_hash;
    const model = fixedRequest.requestBody.model;
    const abiSign = JSON.parse(fixedRequest.requestBody.abi_signature);

    const url = `https://localhost:7283/fhe?id=${data_id}&hash=${data_hash}&model=${model}`;
    const result = new AttestationResponse<IFheAgent_Response>();

    let responseData: FHEResponse;
    await axios
      .get(url)
      .then((response) => {
        responseData = response['data'] as FHEResponse;
      })
      .catch((error) => {
        console.error(error);
        result.status = AttestationResponseStatus.INVALID;
        return result;
      });

    const new_hash = createHash('sha256').update(responseData.encrypted_data).digest('hex');
    if (new_hash !== data_hash) {
      result.status = AttestationResponseStatus.INVALID;
      return result;
    }

    const web3 = new Web3();
    const responseBody = new IFheAgent_ResponseBody({
      abi_encoded_data: web3.eth.abi.encodeParameter(abiSign, responseData.encrypted_result),
    });
    const attResponse = new IFheAgent_Response({
      attestationType: fixedRequest.attestationType,
      sourceId: fixedRequest.sourceId,
      votingRound: '0',
      lowestUsedTimestamp: '0xffffffffffffffff',
      requestBody: fixedRequest.requestBody,
      responseBody: responseBody,
    });

    result.response = attResponse;
    result.status = AttestationResponseStatus.VALID;
    return result;
  }
}