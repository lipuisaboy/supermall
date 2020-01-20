import {request} from './request';

export function getCategoryData(){
  return request({
    url:'/category'
  })
}

export  function getSubcategoryData(maitKey){
  return request({
    url:'/subcategory',
    params:{
      maitKey:maitKey
    }
  })
}
