import axios from "axios";

const RAWG_BASE_URL = "https://api.rawg.io/api";

const handleDetails = async (req, res) =>{
    try{
        const {id} = req.query;
        if(!id) res.sendStatus(400);

        const response = await axios.get(`${RAWG_BASE_URL}/games/${id}`,{
            params:{
                key: process.env.RAWG_API_KEY,
            }
        })

        res.json(response.data);
    }catch(err){
        console.error("RAWG API error in details:", err.message);
        res.status(500).json({ error: "Failed to fetch games from RAWG" });
    }
}

export default handleDetails;