import {useQuery} from "@tanstack/react-query";

const querydata = async (url) =>{
    return await fetch(url)
    .then((rsp) => {
        if(!rsp.ok){
            throw new Error("network response not ok");
        }
        return rsp.json();

    })

}

export const Doquery = (url) => {
    const {isLoading,isError,data,error} = useQuery(["courses"],()=> querydata(url));
    return {data,isLoading,error};
}