import { sleep } from "mock/utils/sleep";
import { enquiresData } from "./data";

export const readEnquiry = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(500);
  console.log('mock read Enquiry', args)
  for(var i = 0; i < enquiresData.length; i++){
    //ID会被转成String
    // eslint-disable-next-line eqeqeq
    if(enquiresData[i].id == args.id){
      enquiresData[i].already_read = true;
      return enquiresData[i];
    }
  }

  return 
}

export const enquiries = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(500);
  console.log('mock return enquiries',{data:enquiresData, paginatorInfo:{currentPage:1, count:8, perPage:10, lastPage:11, total:123}})
  return {data:enquiresData, paginatorInfo:{currentPage:1, count:8, perPage:10, lastPage:11, total:123}}
}


export const removeEnquiries = async (parent:any, args:any, context:any, info:any)=>{
  await sleep(200);
  return enquiresData;

}

export const enquiryQueryResolvers = {
  enquiries,
}


export const enquiryMutationResolvers = {
  readEnquiry,
  removeEnquiries
}