import AbstractFixture from "./AbstractFixture";
import UserModel from "../model/user/UserModel";

export default class UserFixtures extends AbstractFixture {

    constructor() {
        super();
    }

    public async push() {
        const instance = new UserModel();
        const names = this.Name({});
        const lastnames = this.Lastnames({});
        const phoneCode = this.CodePhone({});
        const phoneNumber = this.GenerateNumber(7);
        const host = this.HostEmail({});

        console.log(`CREANDO USUARIOS....`);

        const user = await instance.createUser({
            data: {
                ci: `00000000`,
                name: `Oscar`,
                email: `okita.admin@example.com`,
                lastname: `Admin`,
                password: `1234567890`,
                role: `ROOT`,
            }
        });

        console.log(`USUARIOS CREADOS....`);
    }

}
