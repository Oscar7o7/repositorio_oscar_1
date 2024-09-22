import AddressFixtures from "./AddressFixturs";
import SocialMediaFixtures from "./SocialMediaFixtures";
import SpecialityFixtures from "./SpecialityFixture";
import UserFixtures from "./UserFixtures";

const userInstance = new UserFixtures();
const socialInstance = new SocialMediaFixtures();
const addressInstance = new AddressFixtures();
const specialityInstance =  new SpecialityFixtures();

(async () => {
   await addressInstance.push();
   await specialityInstance.push();
   await socialInstance.push();
   await userInstance.push();
})()
