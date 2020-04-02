import * as http from 'http'

export default class SendReqSdra {

    sendReq(date: string): RequestResult {
        let requestResult = new RequestResult();

        const data = JSON.stringify({
            Date: date,
            type: 1
        });

        const options = {
            hostname: "aqms.sdra.co.ir",
            //   port: 443,
            path: "/Home/GetAQIDataByRegion",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Content-Length": data.length
            }
        };

        const req = http.request(options, res => {
            console.log(`statusCode: ${res.statusCode}`);

            res.on("data", d => {
                requestResult.Data = d;
            });
        });

        req.on("error", error => {
            requestResult.Error = error;
        });

        req.write(data);
        req.end();

        return requestResult;
    }
}

class RequestResult {
    Data: any;
    Error: Error | undefined;
}