import User from "../model/User.js";

const handleDashBoardData = async (req, res) =>{
    // console.log("Here", req.user);
    try
    {
        const username = req.user;
        const foundUser = await User.findOne({username})
         .populate("currentlyPlaying.game")
        .populate("completedGames.game")
        .populate("wishList.game")
        .exec();

        if (!foundUser) return res.status(404).json({ error: "User not found" });

        res.status(200).json({
            currentlyPlaying: foundUser.currentlyPlaying,
            completedGames : foundUser.completedGames,
            wishList: foundUser.wishList
        })
    }catch(err){
        console.error("Error handling game data:", err);
        res.status(500).json({ error: "Server error" });
    }
}

export default handleDashBoardData;