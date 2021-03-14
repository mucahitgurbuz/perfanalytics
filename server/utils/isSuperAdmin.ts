import SuperAdmin from "./../models/superadmin";

export default async (userCode: string) => {
  try {

    const user = await SuperAdmin.findOne({ where: { userCode } });
    if (user === null)
      return false;

    return true
  } catch (e) {
    return false
  }
};
