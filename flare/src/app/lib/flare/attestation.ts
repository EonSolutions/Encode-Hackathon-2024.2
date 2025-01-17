const ATTESTATION_URL = "http://localhost:8000"

function toHex(data: string): string {
  var result = "";
  for (var i = 0; i < data.length; i++) {
    result += data.charCodeAt(i).toString(16);
  }
  return "0x" + result.padEnd(64, "0");
}

interface AttestationRequest {
  abiEncodedRequest: string;
  status: string;
}

async function prepareAttestationRequest(
  attestationType: string,
  sourceId: string,
  requestBody: any,
): Promise<AttestationRequest> {
  const response = await fetch(
    `${ATTESTATION_URL}/${attestationType}/prepareResponse`,
    {
      method: "POST",
      headers: {
        "X-API-KEY": process.env.ATTESTATION_API_KEY!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        attestationType: toHex(attestationType),
        sourceId: toHex(sourceId),
        messageIntegrityCode: "0x0000000000000000000000000000000000000000000000000000000000000000",
        requestBody: requestBody,
      }),
    },
  );
  const data = await response.json();
  return data;
}

export { prepareAttestationRequest };