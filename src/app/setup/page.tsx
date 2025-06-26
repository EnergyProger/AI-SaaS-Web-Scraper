import { setupUser } from "@/actions/billing";

const SetupPage = async () => {
  return await setupUser();
};

export default SetupPage;
