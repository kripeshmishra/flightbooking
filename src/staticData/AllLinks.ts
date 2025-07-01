class links {
    name?: string;
    link?: string;
}
export class allLinks {

    private linkArrar = [
        { name: 'Vacations', link: 'vacations' },
        { name: 'Flights', link: 'flights' },
        { name: 'Hotels', link: 'hotels' },
        { name: 'Cruise', link: 'cruise' },
    ];

    Links: Array<links> = []

    public GetAllLinks(): Array<links> {
        return this.linkArrar;
    }

    public GetFilterLinks(params: Array<any>): Array<links> {
        if (params && params.length > 0) {
        }
        let retVal = new Array<links>();
        try {
            for (let index = 0; index < params.length; index++) {
                for (let i = 0; i < this.linkArrar.length; i++) {
                    if (this.linkArrar[i].link === params[index]) {
                        retVal.push(this.linkArrar[i]);
                        break;
                    }
                }
            }
            return retVal;
        } catch (error) {
            return new Array();
        }
    }
}
