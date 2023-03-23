const API_KEY = process.env.API_KEY

export default{

    fetchTrending:{
        url:`/trending/all/week?api_key=${API_KEY}&language=en-US`
    } 
}