import UserFixtures from "./UserFixtures";

const userInstance = new UserFixtures();

(async () => {
   await userInstance.push();
})()
