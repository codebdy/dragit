import { sleep } from "mock/utils/sleep";

export const subtract = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(500);
  const params = args.params;  
  const minute = params?.minute;
  const minus = params?.minus;
  console.log('算减法', {minute:minute, minus:minus, result:minute - minus});
  return {minute:minute, minus:minus, result:minute - minus}
}

export const compound = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(500);
  const params = args.params;  
  const cardinal = params.cardinal
  const rate = params.rate
  const periods = params.periods
  console.log('算复利', {cardinal, rate, periods}, args);
  const result = cardinal * Math.pow((rate + 1), periods)
  return {cardinal, rate, periods, result}
}

export const splitDemoMutationResolvers = {
  subtract,
  compound
}