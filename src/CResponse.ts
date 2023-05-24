export class CResponse {

    private Body : BodyInit;
    private Response : ResponseInit;
    private alreadySent : boolean = false;

    constructor() {
        this.Body = "";
        this.Response = {};
    }

    public status(status: number) {
        this.Response.status = status;
        return this;
    }

    public body(body?: BodyInit) {
        if (body) {
            this.Body = body;
        }
        return this;
    }

    public isSent() {
        return this.alreadySent;
    }

    public send(body?: BodyInit, response?: ResponseInit) {
        if (body) {
            this.Body = body;
        }
        if (response) {
            this.Response = response;
        }
        this.alreadySent = true;
        return this;
    }

    public getResponseObject(): Response {
        return new Response(this.Body, this.Response);
    }

}