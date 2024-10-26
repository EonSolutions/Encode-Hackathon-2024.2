import { prepareAttestationRequest } from "@/app/lib/flare/attestation";

export async function POST(req: Request) {
  const body = await req.json();
  const res = await prepareAttestationRequest("IFheAgent", "WEB2", body);
  return Response.json(res);
}
