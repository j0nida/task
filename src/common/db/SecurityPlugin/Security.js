
export default class Security {

    constructor(db) {
        this.db = db;
    }

    fetch() {
        return this.db.request({
                    method: "GET",
                    url: "_security"
                }).then((security) => {
                    if (!security.members)
                        security.members = { names: [] };
                    if (!security.admins)
                        security.admins = { names: [] };

                    this.members = security.members;
                    this.admins = security.admins;
                    return Promise.resolve(security);
                }).catch((e) => {
                    console.log("_security fetch exception: ", e);
                });
    }

    save(security) {
        return this.db.request({
            method: "PUT",
            url: "_security",
            body: security || { members: this.members, admins: this.admins }
        });
    }

    addUser(username, type = 'members') {
        return this.fetch().then(security => {
            const adminsIndex = security['admins']['names'].indexOf(username);
            if (adminsIndex !== -1) 
                security['admins']['names'].splice(adminsIndex, 1);

            const membersIndex = security['members']['names'].indexOf(username);
            if (membersIndex !== -1) 
                security['members']['names'].splice(membersIndex, 1);

            security[type]['names'].push(username);
            return this.save(security);
        });
    }

    removeUser(username, type = 'members') {
        this.fetch().then( security => {
            let index = security[type]['names'].indexOf(username);
            if (index !== -1) {
                security[type]['names'].splice(index, 1);
                return this.save(security);
            }
            else 
                return Promise.resolve(security);
        });
    }
}