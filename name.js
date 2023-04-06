const gfname = "Sheelu";
export const gfname1 = "Himanshu";
const gfname2 = "Kuldeep";
const gfname3 = "Dalla";

export const age = () => {
  //   return `${~~(Math.random() * 100)}%`; or
  return `${Math.floor(Math.random() * 100)}%`;
};

function marks() {
  return Math.random();
}
export default gfname;
export { gfname2, gfname3, marks };
