export class CResponse {

    private Body : BodyInit;
    private Response : ResponseInit;

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

    public send(body?: BodyInit, response?: ResponseInit) {
        if (body) {
            this.Body = body;
        }
        if (response) {
            this.Response = response;
        }
        return new Response(this.Body, this.Response);
    }

}