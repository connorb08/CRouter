export class CResponse {

    private BodyInit : BodyInit | null | undefined;
    private ResponseInit : ResponseInit;

    constructor() {
        this.BodyInit = "";
        this.ResponseInit = {};
    }

    public status(status: number) {
        this.ResponseInit.status = status;
        return this;
    }

    public body(body?: BodyInit) {
        this.BodyInit = body;
        return this;
    }

    public send(body?: BodyInit, response?: ResponseInit) {
        if (body) {
            this.BodyInit = body;
        }
        if (response) {
            this.ResponseInit = response;
        }
        return new Response(this.BodyInit, this.ResponseInit)
    }

}