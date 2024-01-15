// TODO End date and start date difference has to be less then 1 year
import { isColor } from "../util/util";
import { Contribution } from './types';

// TODO
const validateContributions = (contribution: Contribution[]) => {
  return true;
}

export {
  validateContributions,
  isColor as validateColor,
};
